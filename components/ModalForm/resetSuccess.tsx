import { useState } from 'react';
import FormWrapper from './FormWrapper';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { forgotpassword } from '@/services/spot-prices';
import { ResetSuccessProps } from '@/interfaces/typeinterfaces';


export default function ResetSuccess({
  getLoginForm,
  closeModal,
  setReset
}: ResetSuccessProps) {
  const router = useRouter();
  const { data } = router.query;
  const [click, setClick] = useState(false);
  const [error, setError] = useState(false);
  const resendemail = async () => {
    try {
      const res = await forgotpassword(data as string)
      if (res.success === true) {
        setClick(true);
        setReset();
      } else {
        setError(true);
      }
    } catch {
      (err: { message: any }) => console.log(err.message);
    }
  };
  return (
    <div className='h-full w-full'>
      <FormWrapper
        title='Reset password success'
        description='Follow the steps to reset password'
        footer={
          <>
            <hr />
            <div className='flex flex-col gap-2'>
              <span className='flex w-full flex-row items-center justify-center text-sm lg:mt-3 lg:text-base'>
                <p className='text-dark-black'>
                  Don&apos;t want to reset password?
                </p>
                &nbsp;
                <span
                  className='cursor-pointer text-primary underline'
                  onClick={getLoginForm}
                >
                  Login
                </span>
              </span>
            </div>
          </>
        }
      >
        <div className='flex flex-col items-center justify-center gap-3'>
          <Image
            src='https://res.cloudinary.com/bullionmentor/image/upload/Icons/check_v3m5h5.png'
            alt='Check image'
            className='h-12 w-12'
            height={100}
            width={100}
            loading='lazy'
          />
          <span className='text-[1.35rem] font-semibold text-primary'>
            Check your email
          </span>
          <span className='mb-1 -mt-2 text-center text-[0.9rem] text-[#7b7b7b]'>
            We have sent a password reset instruction to your email. Click on
            the button provided in the email to reset your password.
          </span>
          <span
            className='mb-4 -mt-2 cursor-pointer font-medium text-primary underline'
            onClick={resendemail}
          >
            Resend email
          </span>
          {click === true ? (
            <span className='-mt-8 mb-2 text-center text-[0.9rem] text-[#397016]'>
              Reset link is sent on email. Please check your inbox.
            </span>
          ) : (
            ''
          )}
        </div>
      </FormWrapper>
    </div>
  );
}
