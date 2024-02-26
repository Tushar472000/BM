import IconX from '@/components/icons/IconX';
import useEscapeKey from '@/hooks/useEscapeKey';
import { useState, useRef, useEffect } from 'react';
import IconsGrid from './iconsGrid';
import useOnClickOutside from '@/hooks/useOnclickOutside';
import Image from 'next/image';
import FormWrapper from '../FormWrapper';
import { ShareModalProps } from '@/interfaces/typeinterfaces';

export default function ShareModal({
  shareUrl,
  closeModal,
  productName,
  p1,
  p2
}: ShareModalProps) {
  useEscapeKey(closeModal);
  const outsideRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(outsideRef, closeModal);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.removeAttribute('style');
    };
  }, []);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');
  const copyText = async () => {
    setShowMessage(true);
    if (productName) {
      setMessage('Product link copied to clipboard');
    } else {
      setMessage('Website link copied to clipboard');
    }
    setTimeout(() => setShowMessage(false), 8000);
    return await navigator.clipboard.writeText(shareUrl);
  };

  const wordCount = (str: string) => {
    return str.split(' ').length;
  };
  return (
    <div className='fixed inset-0 z-10 flex items-center justify-center bg-[rgb(0,0,0,0.6)] pt-16 backdrop-blur lg:pt-24'>
      <div
        className='relative mx-3 flex h-auto w-max max-w-2xl justify-center rounded-3xl bg-white px-4 py-4 md:h-72'
        ref={outsideRef}
      >
        <div
          className='absolute top-4 right-2 cursor-pointer bg-slate-50 p-1 hover:bg-slate-100 hover:text-red-600'
          onClick={closeModal}
        >
          <IconX className='h-5 w-5' />
        </div>
        <div className='-mt-4 -ml-4 hidden h-72 w-52 overflow-hidden rounded-tl-3xl rounded-bl-3xl md:flex'>
          <Image
            height={500}
            width={400}
            src='https://res.cloudinary.com/bullionmentor/image/upload/Images-Icons/login-banner.webp'
            alt='Banner'
          />
        </div>
        <div className='h-full w-full'>
          <FormWrapper
            title={productName ? 'Share this product' : 'Share Bullion Mentor'}
            description='Let your friends & relatives stay updated with the best prices online'
            footer=''
          >
            <div className='flex h-full w-full flex-col gap-1 sm:gap-2'>
              <div className='mt-2 h-1/2 w-full'>
                <IconsGrid shareUrl={shareUrl} product={productName} />
              </div>
              <div className='mt-3 flex flex-col gap-1 md:mt-1 lg:mt-3 xl:mt-2'>
                <span className='flex flex-col items-center justify-between gap-2 text-dark-black sm:flex-row md:gap-3'>
                  <div className='flex flex-col justify-start gap-2 pt-0 text-xs md:pt-4 md:text-[13px] lg:pt-2'>
                    <p>
                      {p1}
                      <br></br>
                      {wordCount(p2 ? p2 : '') <= 20
                        ? p2
                        : p2?.slice(0, 120) + '...'}
                      <br></br>
                      <p className='font-semibold text-primary'>{shareUrl}</p>
                    </p>
                  </div>
                  <span
                    className='cursor-pointer rounded-full bg-primary px-3 py-2 text-white hover:border-transparent hover:bg-opacity-80'
                    onClick={copyText}
                  >
                    Copy
                  </span>
                </span>
              </div>
              <span className='mt-2 -mb-4 text-center text-[0.9rem] text-green-500 sm:mt-2 sm:-mb-8 md:-mb-2 md:-mt-3 lg:-mt-1 xl:-mt-2'>
                {showMessage === true ? message : null}
              </span>
            </div>
          </FormWrapper>
        </div>
      </div>
    </div>
  );
}
