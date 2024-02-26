import useOnClickOutside from '@/hooks/useOnclickOutside';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import IconX from '../icons/IconX';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import ResetPasswordForm from './ResetPasswordForm';
import ResetSuccess from './resetSuccess';
import useEscapeKey from '@/hooks/useEscapeKey';
import Image from 'next/image';
import { ModalProps } from '@/interfaces/typeinterfaces';

export default function Modal({ closeModal, productId }: ModalProps) {
  const [formType, setFormType] = useState<
    'register' | 'login' | 'reset' | 'resetSuccess' | 'resend' | 'error'
  >('login');
  const outsideRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(outsideRef, closeModal);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.removeAttribute('style');
    };
  }, []);

  const getLoginForm = () => setFormType('login');
  const getRegisterForm = () => setFormType('register');
  const getResetForm = () => setFormType('reset');
  const setReset = () => setFormType('resetSuccess');
  const setError = () => setFormType('error');
  useEscapeKey(closeModal);
  return createPortal(
    <div className='fixed inset-0 z-10 flex items-center justify-center bg-[rgb(0,0,0,0.6)] pt-16 backdrop-blur lg:pt-24'>
      <div
        ref={outsideRef}
        className={`relative flex max-w-3xl justify-center bg-white px-4 py-4 ${
          formType === 'register'
            ? 'h-[30rem] lg:h-[33rem]'
            : formType === 'resetSuccess'
            ? 'h-[22rem] md:h-[22rem]'
            : formType === 'reset'
            ? 'h-[20rem] md:h-80'
            : 'h-[26rem] md:h-[27rem] lg:h-[29rem]'
        } mx-2 w-full overflow-hidden rounded-3xl`}
      >
        <div
          className='absolute top-4 right-2 cursor-pointer bg-slate-50 p-1 hover:bg-slate-100 hover:text-red-600'
          onClick={closeModal}
        >
          <IconX className='h-5 w-5 ' />
        </div>
        <div className='-mt-4 -ml-5 hidden h-[35rem] w-56 md:flex'>
          <Image
            height={400}
            width={400}
            src='https://res.cloudinary.com/bullionmentor/image/upload/Images-Icons/login-banner.webp'
            alt='Banner'
          />
        </div>
        {formType === 'login' ? (
          <LoginForm
            closeModal={closeModal}
            getResetForm={getResetForm}
            getRegisterForm={getRegisterForm}
          />
        ) : formType === 'register' ? (
          <RegisterForm closeModal={closeModal} getLoginForm={getLoginForm} />
        ) : formType === 'reset' ? (
          <ResetPasswordForm
            closeModal={closeModal}
            getLoginForm={getLoginForm}
            setError={setError}
            setReset={setReset}
          />
        ) : formType === 'resetSuccess' ? (
          <ResetSuccess
            getLoginForm={getLoginForm}
            setReset={setReset}
            closeModal={closeModal}
          />
        ) : (
          ''
        )}
      </div>
    </div>,
    document.body
  );
}
