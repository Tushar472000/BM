import Image from 'next/image';
import FormWrapper from '../FormWrapper';

export default function SuccessModal() {
  return (
    <div className='h-full w-full'>
      <FormWrapper
        title='Change Password'
        description='Your request was successfully submitted'
        footer=''
      >
        <div className='flex flex-col justify-center'>
          <div className='flex justify-center'>
            <Image
              src='https://res.cloudinary.com/bullionmentor/image/upload/Images-Icons/mail-and-tick_m23cxz.png'
              alt='Banner'
              height={120}
              width={120}
            />
          </div>
          <span className='text-center text-base font-semibold text-primary sm:text-[1.35rem]'>
            Password Successfully Changed!
          </span>
          <span className='text-center text-sm font-normal text-dark-black sm:text-[0.9rem]'>
            Please login with new password
          </span>
          <div className='flex justify-center'>
            <button className='m-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-white'>
              Login
            </button>
          </div>
        </div>
      </FormWrapper>
    </div>
  );
}
