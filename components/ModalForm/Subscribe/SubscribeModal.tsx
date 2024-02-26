import useEscapeKey from '@/hooks/useEscapeKey';
import useOnClickOutside from '@/hooks/useOnclickOutside';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import IconX from '../../icons/IconX';
import ErrorModal from './error';
import SubscribeForm from './SubscribeForm';
import SubscribeSuccess from './success';
import Image from 'next/image';

export default function SubscribeModal({
  closeModal
}: {
  closeModal: () => void;
}) {
  const [formType, setFormType] = useState<
    'subscribeform' | 'subscribesuccess' | 'error'
  >('subscribeform');
  const outsideRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(outsideRef, closeModal);
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.removeAttribute('style');
    };
  }, []);
  useEscapeKey(closeModal);
  const getSubscribeForm = () => setFormType('subscribeform');
  const getSubscribeSuccess = () => setFormType('subscribesuccess');
  const getError = () => setFormType('error');
  return createPortal(
    <div className='fixed inset-0 z-10 flex items-center justify-center bg-[rgb(0,0,0,0.6)] pt-14 backdrop-blur lg:pt-24'>
      <div
        ref={outsideRef}
        className={`relative mt-4 flex max-w-3xl justify-center bg-white px-4 py-4 ${
          formType === 'subscribeform'
            ? 'h-[33rem] sm:h-[32rem] lg:mt-3'
            : formType === 'subscribesuccess'
            ? 'h-80 sm:h-[16rem]'
            : formType === 'error'
            ? 'h-72'
            : ''
        } mx-2 w-full overflow-hidden rounded-3xl`}
      >
        <div
          className='absolute top-4 right-4 cursor-pointer bg-slate-50 p-1 transition-colors hover:bg-slate-100  hover:text-red-600'
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
        {formType === 'subscribeform' ? (
          <SubscribeForm getSuccess={getSubscribeSuccess} getError={getError} />
        ) : formType === 'subscribesuccess' ? (
          <SubscribeSuccess />
        ) : formType === 'error' ? (
          <ErrorModal getSubscribeForm={getSubscribeForm} />
        ) : (
          ''
        )}
      </div>
    </div>,
    document.body
  );
}
