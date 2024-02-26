import Image from 'next/image';
import FormWrapper from './FormWrapper';
import { ErrorModalProps } from '@/interfaces/typeinterfaces';

export default function ErrorModal({
  getLogin,
  getRegistration,
  closeModal
}: ErrorModalProps) {
  return (
    <div className='-ml-16 w-[120%] sm:-ml-48 sm:w-full md:-ml-48 md:w-full lg:-ml-48 lg:w-full'>
      <FormWrapper
        title='Reset password'
        description=''
        footer={
          <>
            <hr className='mx-auto my-4 h-[0.110rem] w-[115%] rounded border-0 bg-gray-200 dark:bg-gray-200 sm:w-full md:my-4 md:w-full lg:my-4 lg:w-full' />
            <div className='-mb-6 flex w-[117%] flex-col items-center justify-center align-middle sm:w-full md:w-full lg:w-full'>
              <div className='ml-12 flex w-[120%] flex-row items-center justify-center text-sm lg:ml-0 lg:text-base'>
                <button
                  onClick={getLogin}
                  className='-ml-6 text-primary underline sm:ml-5'
                >
                  Retry
                </button>
              </div>
            </div>
          </>
        }
      >
        <div className='ml-8 flex w-full flex-col items-center gap-5 sm:w-full md:w-full lg:w-full'>
          <Image
            src='https://res.cloudinary.com/bullionmentor/image/upload/Icons/alert_icrowi.png'
            className='h-12 w-12'
            alt='alert'
            height={100}
            width={100}
            loading='lazy'
          />
          <span className='text-center text-xl font-bold text-primary'>
            Please enter a valid EmailId
          </span>
          <span className='-mt-4 text-center text-sm text-[#7B7B7B]'>
            Please enter a valid email address or register to Bullion Mentor
          </span>
        </div>
      </FormWrapper>
    </div>
  );
}
