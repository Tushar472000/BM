import { LoginUser } from '@/interfaces/propsinterfaces';
import NextAuth, { Session, TokenSet } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { login } from '@/services/spot-prices';

const authOptions: any = {
  session: {
    strategy: 'jwt'
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID
        ? process.env.GOOGLE_CLIENT_ID
        : '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
        ? process.env.GOOGLE_CLIENT_SECRET
        : '',
      authorization: {
        params: {
          prompt: 'consent'
        }
      }
    }),
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'Enter Email id'
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Enter password'
        }
      },
      authorize: async (credentials) => {
        if (credentials?.email && credentials.password) {
          const user = await login(
            credentials?.email as string,
            credentials?.password as string,
            false
          );
          return {
            ...user?.data,
            id: user?.data.customerId.toString() ?? '',
            email: credentials.email,
            name: user?.data.userName,
            token: user?.token.toString()
          };
        }
        return null;
      }
    })
  ],
  secret: process.env.JWT_SECRET,
  callbacks: {
    async session({
      session,
      token,
      user
    }: {
      session: Session;
      token: TokenSet;
      user: any;
    }) {
      if (token) {
        return {
          ...session,
          user: {
            ...session.user,
            id: token.id,
            token: token.access_token
          }
        };
      }
      return session;
    },
    async jwt({ token, user }: { token: TokenSet; user: LoginUser }) {
      if (user) {
        return {
          ...token,
          name: user.userName,
          id: user.customerId,
          token: user.token
        };
      }
      return token;
    }
  }
};

export default NextAuth(authOptions);
