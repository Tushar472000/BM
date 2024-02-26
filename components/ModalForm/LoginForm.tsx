import FormWrapper from './FormWrapper';
import Input from './Input';
import { login } from 'services/spot-prices';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import { addProduct } from '@/services/observations';
import { validateEmail, validateInput } from '@/hooks/validators';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { signin } from '@/features/userSlice';
import { LoginFormProps } from '@/interfaces/typeinterfaces';

export default function LoginForm({
  getRegisterForm,
  getResetForm,
  productId,
  closeModal
}: LoginFormProps) {
  {
    /* ******************* STATES ******************* */
  }
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [click, setClick] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showError, setShowError] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  {
    /* ******************* SUBMIT HANDLER FUNCTION ******************* */
  }
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      {
        /* ******************* VALID INPUT CHECK ******************* */
      }
      if (
        validateInput(pass) === false ||
        validateEmail(email) === false ||
        validateEmail(email) === 0
      ) {
        setClick(true);
      } else {
        const isGoogleUser = false;
        const response = await login(email, pass, isGoogleUser);
        console.log(JSON.stringify(response), '***********');
        if (response.success === true) {
          if (productId) {
            await addProduct(
              productId,
              response.data.customerId,
              response.data.token
            );
          }
          router.push('/observations').then(() => {
            closeModal();
            dispatch(
              signin({
                name: response.data.name,
                email: response.data.emailId,
                id: response.data.customerId,
                token: response.data.token,
                isGoogleUser: response.data.isGoogleUser
              })
            );
          });
        } else if (response.success === false) {
          setShowError(true);
          setErrorMessage(response.errorMessage);
        }
      }
    } catch {
      (err: { message: any }) => alert(err.message);
    }
  };
  const handleGoogleLogin = () => {
    signIn('google', { callbackUrl: '/observations' });
  };
  return (
    <div className='h-full w-full'>
      <FormWrapper
        title='Login to Bullion Mentor'
        description='Fill the following details to login'
        footer={
          <>
            <hr />
            <div className='flex flex-col gap-2'>
              <span className='flex w-full flex-row items-center justify-center text-sm lg:mt-3 lg:text-base'>
                <p className='text-dark-black'>Don&apos;t have an account?</p>
                &nbsp;
                <span
                  className='cursor-pointer text-primary underline hover:text-dark-black'
                  onClick={getRegisterForm}
                >
                  Register
                </span>
              </span>
              <div
                className='mt-1 flex cursor-pointer flex-row items-center justify-center gap-2 rounded-full border-2  border-gray-500 py-1 text-dark-black hover:border-transparent hover:bg-primary hover:bg-opacity-40 lg:py-2'
                onClick={handleGoogleLogin}
              >
                <Image
                  height={25}
                  width={25}
                  src='https://res.cloudinary.com/bullionmentor/image/upload/Icons/google_ziwlze.png'
                  alt='Google-icon'
                  loading='lazy'
                />
                <p className='text-sm  lg:text-base'>Continue with google</p>
              </div>
            </div>
          </>
        }
      >
        <form
          onSubmit={submitHandler}
          className='-mt-2 mb-2 flex flex-col gap-0.5'
        >
          {/******************** EMAIL INPUT ********************/}
          <div className='flex h-24 flex-col'>
            <Input
              label='Email'
              placeholder='eg: johndoe@gmail.com'
              onChange={(e) => setEmail(e.target.value)}
            />
            <p
              className={`flex justify-end text-xs lg:text-sm ${
                click === true ? 'text-red-600' : 'hidden'
              }`}
            >
              {validateEmail(email) === 0
                ? 'Email is required'
                : validateEmail(email) === false
                ? 'Please enter a valid email'
                : null}
            </p>
          </div>
          {/******************** PASSWORD INPUT ********************/}
          <div className='-mt-4 flex h-24 flex-col'>
            <span className='mt-2 flex flex-row items-center align-middle text-[0.9rem] text-dark-black lg:text-base'>
              <label>Password</label>
              <p className='text-red-600'>*</p>
            </span>
            <div className='flex items-center justify-center rounded-full border border-gray-300 px-4 py-3 align-middle outline-none focus-within:border-primary sm:text-[15px] md:text-[15px]'>
              <input
                className='w-11/12 border-none text-[0.9rem] text-dark-grey outline-none'
                type={showPassword ? 'text' : 'password'}
                onChange={(e) => {
                  setPass(e.target.value);
                }}
                placeholder='Minimum 8 characters'
              />
              {/* ******************* PASSWORD ICON ******************* */}
              <span
                className='cursor-pointer outline-none'
                onClick={() => setShowPassword(!showPassword)}
              >
                <span>
                  {showPassword ? (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='#4D4D4D'
                      className='h-6 w-6'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88'
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='#4D4D4D'
                      className='h-6 w-6'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z'
                      />
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                      />
                    </svg>
                  )}
                </span>
              </span>
            </div>
            <p
              className={`flex justify-end text-xs lg:text-sm ${
                click === true || showError === true ? 'text-red-600' : 'hidden'
              }`}
            >
              {validateInput(pass) === false
                ? 'Password is required'
                : showError === true
                ? `${errorMessage}`
                : null}
            </p>
          </div>
          <span
            className='element -mt-3 cursor-pointer self-start text-sm text-dark-black underline hover:text-primary lg:text-base'
            onClick={getResetForm}
          >
            Forgot password?
          </span>
          <button
            type='submit'
            className='group relative my-1 inline-block  w-full overflow-hidden rounded-full  bg-primary py-2 text-white '
          >
            <span className='absolute top-0 left-0  mb-0 flex h-0 w-full translate-y-0 transform bg-secondary opacity-90 transition-all duration-300 ease-out group-hover:h-full '></span>
            <span className='relative'>Login</span>
          </button>
        </form>
      </FormWrapper>
    </div>
  );
}
