import { useState, useEffect, useRef } from 'react';
import IconX from '@/components/icons/IconX';
import { createPortal } from 'react-dom';
import useEscapeKey from '@/hooks/useEscapeKey';
import useOnClickOutside from '@/hooks/useOnclickOutside';
import Image from 'next/image';
import DealersRatingForm from './DealerRatingForm';
import ReviewSuccess from './Success';
import { useSelector } from 'react-redux';
import { selectUser } from '@/features/userSlice';
type ReviewModalProps = {
  closeModal: () => void;
};
export default function ReviewModal({ closeModal }: ReviewModalProps) {
  const [formType, setFormType] = useState<'ratingForm' | 'success' | 'share'>(
    'ratingForm'
  );
  const getSuccess = () => setFormType('success');
  const setShare = () => setFormType('share');
  useEscapeKey(closeModal);
  const outsideRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(outsideRef, closeModal);
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.removeAttribute('style');
    };
  }, []);
  const user = useSelector(selectUser);
  return createPortal(
    <div className='fixed inset-0 flex items-center justify-center bg-[rgb(0,0,0,0.6)] pt-16 backdrop-blur lg:pt-24'>
      <div
        className={`relative mx-1 flex w-full max-w-3xl justify-center overflow-hidden rounded-3xl bg-white p-4 
      ${formType === 'ratingForm' && user.isLoggedin === false
            ? 'h-[30rem] md:mx-2 md:mt-3 md:h-[29rem] lg:h-[28rem] xl:mt-0 xl:h-[31rem]'
            : formType === 'ratingForm' &&
              user.isLoggedin === true &&
              user.user.name
              ? 'mt-12 h-[25rem] md:mx-2 lg:mt-8 xl:h-[26rem]'
              : formType === 'ratingForm' &&
                user.isLoggedin === true &&
                !user.user.name
                ? 'mt-12 h-[31rem] md:mx-2 lg:mt-8'
                : formType === 'success'
                  ? 'mx-2 my-2 h-60 px-2 md:h-48'
                  : formType === 'share'
                    ? 'h-96 px-4 py-4 sm:h-72'
                    : ''
          }`}
        ref={outsideRef}
      >
        <div
          onClick={closeModal}
          className='absolute top-4 right-4 cursor-pointer bg-slate-50 p-1 hover:bg-slate-100  hover:text-red-600'
        >
          <IconX className='h-5 w-5' />
        </div>
        <div className='-mt-4 -ml-5 hidden w-56 md:flex md:h-[31rem]'>
          <Image
            src='https://res.cloudinary.com/bullionmentor/image/upload/Images-Icons/login-banner.webp'
            alt='Banner'
            height={400}
            width={400}
            loading='lazy'
          />
        </div>
        {formType === 'ratingForm' ? (
          <DealersRatingForm getSuccess={getSuccess} closeModal={closeModal} />
        ) : formType === 'success' ? (
          <ReviewSuccess />
        ) : (
          ''
        )}
      </div>
    </div>,
    document.body
  );
}
