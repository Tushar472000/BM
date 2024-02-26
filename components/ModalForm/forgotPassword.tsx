import useOnClickOutside from '@/hooks/useOnclickOutside';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import IconX from '../icons/IconX';
import FormWrapper from './FormWrapper';
import Input from './Input';
import Image from 'next/image';

export const ForgotPassword = ({ closeModal }: { closeModal: () => void }) => {
  const outsideRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(outsideRef, closeModal);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.removeAttribute('style');
    };
  }, []);
  const [email, setEmail] = useState('');

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return createPortal(
    <div className='fixed inset-0 flex items-center justify-center bg-[rgb(0,0,0,0.5)] backdrop-blur'>
      <div
        className='relative flex h-[25rem] w-full max-w-4xl overflow-hidden rounded-3xl bg-white'
        ref={outsideRef}
      >
        <button
          onClick={closeModal}
          className='absolute top-4 right-4 rounded-md bg-slate-50 p-2 transition-colors hover:bg-slate-100'
        >
          <IconX className='h-6 w-6' />
        </button>
        <div className='h-max w-72 flex-grow-0'>
          <Image
            src='https://res.cloudinary.com/bullionmentor/image/upload/Images/BBD-side-banner_jd0qtr.jpg'
            alt='subscribe-bg'
            height={100}
            width={100}
            loading='lazy'
          />
        </div>
        <div className='w-5/6'>
          <FormWrapper
            title='Reset password'
            description='Lorem Ipsum is a dummy text.Lorem Ipsum is a dummy text.Lorem Ipsum is a dummy text.'
            footer={
              <>
                <button className='flex w-[30rem] items-center justify-center rounded-full bg-primary py-2.5 text-white'>
                  Submit
                </button>
              </>
            }
          >
            <form
              className='mt-6 flex flex-col gap-4'
              autoComplete='off'
              onSubmit={submitHandler}
            >
              <div className='w-[30rem]'>
                <Input
                  required
                  label='Email ID'
                  type='email'
                  id='emailsilver'
                  name='emailId'
                  placeholder='Enter email id'
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </form>
          </FormWrapper>
        </div>
      </div>
    </div>,
    document.body
  );
};
