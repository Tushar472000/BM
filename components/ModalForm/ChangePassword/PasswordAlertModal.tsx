import useOnClickOutside from '@/hooks/useOnclickOutside';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import IconX from '../../icons/IconX';
import Image from 'next/image';
import ErrorModal from './passwordError';
import SuccessModal from './passwordSuccess';
import { AlertModalProps } from '@/interfaces/typeinterfaces';

export default function AlertModal({ closeModal, alertType }: AlertModalProps) {
  const outsideRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(outsideRef, closeModal);
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.removeAttribute('style');
    };
  }, []);
  return createPortal(
    <div className='fixed inset-0 flex items-center justify-center bg-[rgb(0,0,0,0.6)] pt-14 backdrop-blur'>
      <div
        ref={outsideRef}
        className={`h-84 relative mx-2 flex w-full max-w-3xl justify-center overflow-hidden rounded-3xl bg-white px-4 py-4 md:h-80`}
      >
        <div
          className='absolute top-4 right-2 cursor-pointer bg-slate-50 p-1 hover:bg-slate-100 md:p-1'
          onClick={closeModal}
        >
          <IconX className='h-5 w-5' />
        </div>
        <div className='-mt-4 -ml-5 hidden h-[35rem] w-56 md:flex'>
          <Image
            height={400}
            width={400}
            src='https://res.cloudinary.com/bullionmentor/image/upload/Images-Icons/login-banner.webp'
            alt='Banner'
          />
        </div>
        {alertType === 'error' ? (
          <ErrorModal />
        ) : alertType === 'success' ? (
          <SuccessModal />
        ) : (
          ''
        )}
      </div>
    </div>,
    document.body
  );
}
