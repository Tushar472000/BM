import RequestProductModal from '@/components/ModalForm/RequestProduct/RequestProductModal';
import useToggle from '@/hooks/useToggle';
import { contact } from '@/services/spot-prices';
import { FormEvent, useState } from 'react';
import FormWrapper from '@/components/ModalForm/FormWrapper';
import Input from '@/components/ModalForm/Input';
import AlertModal from '@/components/ModalForm/Alerts/AlertModal';
import { validateEmail, validateInput, validateName } from '@/hooks/validators';
import data from '@/data';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { selectUser } from '@/features/userSlice';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

const contactData = data.site.contact;
const ogTag = data.OGTags.home;
const canonicalUrl = data.WEBSITEUrl + '/contactus';

export default function Contact({title , description ,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [name, setName] = useState(``);
  const [nameError, setNameError] = useState(false);
  const [email, setEmail] = useState(``);
  const [emailError, setEmailError] = useState(false);
  const [message, setMessage] = useState('');
  const [messageError, setMessageError] = useState(false);
  const [isOpenModalRequest, toggleModalRequest] = useToggle();
  const [isOpenAlertModal, toggleAlertModal] = useToggle();
  const [alertState, setAlertState] = useState<'error' | 'success'>('success');
  const user = useSelector(selectUser);
  {
    /***************** SUBMIT HANDLER ***************/
  }
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      validateName(name) === 0 ||
      validateName(name) === false ||
      validateEmail(email) === 0 ||
      validateEmail(email) === false ||
      validateInput(message) === false ||
      message.length > 500
    ) {
      setNameError(true);
      setEmailError(true);
      setMessageError(true);
    } else {
      const response = await contact(name, email, message);
      if (response === true) {
        setAlertState('success');
        toggleAlertModal();
        setNameError(false);
        setEmailError(false);
        setMessageError(false);
        setName('');
        setEmail('');
        setMessage('');
      } else if (response === false) {
        setAlertState('error');
        toggleAlertModal();
        setNameError(false);
        setEmailError(false);
        setMessageError(false);
        setName('');
        setEmail('');
        setMessage('');
      }
    }
  };
  {
    /***************** FORCE CLOSE ***************/
  }
  return (
    <>
      <Head>
        <title>{title}</title>   
        <meta property='og:type' content={ogTag.type} />
        <meta property='og:url' content={canonicalUrl} key={canonicalUrl} />
        <link rel='canonical' href={canonicalUrl} />
      </Head>
      <div className='z-0 w-full text-dark-black'>
        <div className='h-48 w-full bg-gradient-to-b from-secondary to-white pt-2'>
          <header className='container mx-auto pt-10 text-[1.35rem] font-semibold text-white'>
            Contact us
          </header>
        </div>
        <div className='container mx-auto'>
          <div className='-mt-28 flex h-[30rem] w-full flex-row gap-3 rounded-3xl bg-white shadow-xl'>
            {/***************** LEFT SIDE HELPER TEXT ***************/}
            <div className='mx-2 hidden w-full flex-col justify-center lg:flex'>
              <div className='flex justify-center'>
                <Image
                  src='https://res.cloudinary.com/bullionmentor/image/upload/Icons/product-icon_ngdo9t.png'
                  alt='Product'
                  height={100}
                  width={100}
                  loading='lazy'
                />
              </div>
              <section className='text-center'>
                <header className='text-[1.35rem] font-semibold'>
                  Are you looking for some other product?
                </header>
                <article className='px-5 text-[0.9rem] font-normal'>
                  We are here to make experience better. You can suggest a
                  product and we will work on it to get that displayed. Once the
                  product is displayed you can add it to the &nbsp;
                  <Link
                    href='/observations'
                    target='_blank'
                    className='font-semibold text-blue-500'
                    prefetch={false}
                  >
                    observation list &nbsp;
                  </Link>
                  & keep a track on prices of different dealers.
                </article>
              </section>
              <button
                onClick={toggleModalRequest}
                className='group relative my-2 inline-block overflow-hidden rounded-full bg-primary py-2  text-white lg:mx-24 xl:mx-36'
              >
                <span className='absolute top-0 left-0  mb-0 flex h-0 w-full translate-y-0 transform bg-secondary opacity-90 transition-all duration-300 ease-out group-hover:h-full '></span>
                <span className='relative '>Request a product</span>
              </button>
            </div>
            {/***************** DIVIDER ***************/}
            <span className='mx-5 my-5 hidden h-[28rem] w-[0.05rem] bg-gray-400 lg:block'></span>
            {/***************** CONTACT US FORM ***************/}
            <div className='mx-5 my-3 h-full w-full'>
              <FormWrapper
                title='Leave us a message'
                description={
                  user.isLoggedin === true
                    ? user.user.email
                    : 'eg: johndoe@gmail.com'
                }
                footer=''
              >
                <form
                  onSubmit={handleSubmit}
                  className='mb-2 flex flex-col gap-0.5'
                >
                  {/* **************** NAME INPUT ************** */}
                  <div className='flex h-20 w-11/12 flex-col gap-0.5  sm:w-full'>
                    <Input
                      label='Name'
                      placeholder='eg: John Doe'
                      onChange={(e) => {
                        setName(e.target.value);
                        setNameError(false);
                      }}
                      value={name}
                    />
                    <p
                      className={`flex justify-end text-xs text-red-600 lg:text-sm ${nameError === true ? 'flex' : 'hidden'
                        }`}
                    >
                      {validateName(name) === 0
                        ? 'Name is required'
                        : validateName(name) === false
                          ? 'Please enter a valid name'
                          : ''}
                    </p>
                  </div>
                  {/* **************** EMAIL INPUT ************** */}
                  <div className='flex h-24 w-11/12 flex-col gap-0.5  sm:w-full'>
                    <Input
                      label='Email'
                      placeholder='eg: johndoe@gmail.com'
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setEmailError(false);
                      }}
                      value={email}
                    />
                    <p
                      className={`flex justify-end text-xs text-red-600 lg:text-sm ${emailError === true ? 'flex' : 'hidden'
                        }`}
                    >
                      {validateEmail(email) === 0
                        ? 'Email is required'
                        : validateEmail(email) === false
                          ? 'Please enter a valid email'
                          : ''}
                    </p>
                  </div>
                  {/***************** MESSAGE INPUT ***************/}
                  <div className='-mt-5 flex h-40 w-11/12 flex-col sm:-mt-3 sm:w-full'>
                    {/***************** LABEL ***************/}
                    <span className='mt-2 flex flex-row items-center align-middle text-[0.9rem] text-dark-black lg:text-base'>
                      <label htmlFor='message'>Message</label>
                      <p className='text-red-600'>*</p>
                    </span>
                    {/***************** INPUT FIELD ***************/}
                    <textarea
                      id='message'
                      placeholder='Leave a comment...'
                      cols={25}
                      rows={4}
                      value={message}
                      className='rounded-xl border border-gray-300 px-4 py-3 text-[0.9rem] text-dark-grey outline-none focus:border-primary'
                      onChange={(e) => {
                        setMessage(e.target.value);
                        setMessageError(false);
                      }}
                    />
                    <p
                      className={`flex justify-end text-xs lg:text-sm ${messageError === true ? 'text-red-600' : 'hidden'
                        }`}
                    >
                      {validateInput(message) === false
                        ? 'A message is required'
                        : message.length > 500 ? "Message length cannot exceed 500 characters" : null}
                    </p>
                  </div>
                  <button
                    type='submit'
                    className='group relative my-1 inline-block w-11/12 overflow-hidden rounded-full bg-primary py-2  text-white sm:w-full'
                  >
                    <span className='absolute top-0 left-0  mb-0 flex h-0 w-full translate-y-0 transform bg-secondary opacity-90 transition-all duration-300 ease-out group-hover:h-full '></span>
                    <span className='relative '>Submit</span>
                  </button>
                </form>
              </FormWrapper>
            </div>
          </div>
        </div>
      </div>
      {isOpenModalRequest && (
        <RequestProductModal closeModal={toggleModalRequest} />
      )}
      {isOpenAlertModal && (
        <AlertModal closeModal={toggleAlertModal} alertType={alertState} />
      )}
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{
  title: any;
  description: any;
}> = async () => {
  const title = data.site.contact.page;
  const description = data.site.contact.description;
  return {
    props: {
      title,
      description,
    }
  };
};