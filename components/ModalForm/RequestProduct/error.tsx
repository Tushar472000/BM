import FormWrapper from '../FormWrapper';
import Image from 'next/image';
import { ThrowErrorModalProps } from '@/interfaces/typeinterfaces';

export default function ErrorModal({ getRequestForm }: ThrowErrorModalProps) {
  return (
    <div className='h-full w-full'>
      <FormWrapper
        title='Request product'
        description=''
        footer={
          <>
            <hr />
            <span
              className='mt-1 mb-4 cursor-pointer font-medium text-primary underline'
              onClick={getRequestForm}
            >
              Retry
            </span>
          </>
        }
      >
        <div className='my-2 flex flex-col'>
          <div className='flex h-auto w-auto justify-center'>
            <Image
              height={100}
              width={100}
              src='https://res.cloudinary.com/bullionmentor/image/upload/Icons/alert_icrowi.png'
              alt='Cancel icon'
              loading='lazy'
            />
          </div>
          <div className='flex flex-col gap-3'>
            <span className='text-center text-base font-semibold text-primary sm:text-[1.35rem]'>
              Looks like you&apos;ve already requested this product. We&apos;ve
              it in our list.
            </span>
            <span className='-mt-2 text-center text-[0.9rem] text-[#7b7b7b]'>
              If You would like to request some other product click below.
            </span>
          </div>
        </div>
      </FormWrapper>
    </div>
  );
}
