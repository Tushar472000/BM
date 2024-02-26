import FormWrapper from '../FormWrapper';
import Image from 'next/image';
import { SubscribeErrorModalProps } from '@/interfaces/typeinterfaces';

export default function ErrorModal({ getSubscribeForm }: SubscribeErrorModalProps) {
  return (
    <div className='h-full w-full'>
      <FormWrapper
        title='Subscribe to Bullion Mentor'
        description=''
        footer={
          <div>
            <hr />
            <button
              onClick={getSubscribeForm}
              className='text-primary underline'
            >
              Retry
            </button>
          </div>
        }
      >
        <div className='flex flex-col justify-center'>
          <div className='flex justify-center'>
            <Image
              src='https://res.cloudinary.com/bullionmentor/image/upload/Icons/alert_icrowi.png'
              height={100}
              width={100}
              alt='alert'
              loading='lazy'
            />
          </div>
          <div className='my-3 flex flex-col justify-center text-center'>
            <span className='text-base font-medium text-primary'>
              You are already subscribed to Bullion Mentor
            </span>
            <span className='text-sm font-normal text-[#7B7B7B]'>
              Please try with a different email
            </span>
          </div>
        </div>
      </FormWrapper>
    </div>
  );
}
