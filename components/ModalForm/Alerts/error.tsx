import FormWrapper from '../FormWrapper';
import Image from 'next/image';

export default function ErrorModal() {
  return (
    <div className='h-full w-full'>
      <FormWrapper
        title='Contact us'
        description='Your request was successfully submitted'
        footer=''
      >
        <div className='flex flex-col justify-center'>
          <div className='flex justify-center'>
            <Image
              src='https://res.cloudinary.com/bullionmentor/image/upload/Icons/alert_icrowi.png'
              alt='alert'
              height={120}
              width={120}
              loading='lazy'
            />
          </div>
          <span className='text-center text-base font-semibold text-primary sm:text-[1.35rem]'>
            Oops! Something went wrong
          </span>
          <span className='text-center text-sm font-normal text-dark-black sm:text-[0.9rem]'>
            We encountered an error while processing your request.
          </span>
        </div>
      </FormWrapper>
    </div>
  );
}
