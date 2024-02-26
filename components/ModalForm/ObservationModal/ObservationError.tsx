import FormWrapper from '../FormWrapper';
import Image from 'next/image';
import { ObservationErrorModalProps } from '@/interfaces/typeinterfaces';


export default function ObservationError({ closeModal }: ObservationErrorModalProps) {
  return (
    <div className='w-full p-3 px-8  md:p-3 lg:p-3 '>
      <FormWrapper
        title='Add this product to observation list'
        description=''
        footer=''
      >
        <div className='flex flex-col items-center py-4 md:py-0'>
          <Image
            src='https://res.cloudinary.com/bullionmentor/image/upload/Icons/alert_icrowi.png'
            className='h-12 w-12'
            height={100}
            width={100}
            alt='alert'
            loading='lazy'
          />
          <span className='text-center text-lg font-bold text-primary'>
            This product already exists in your observation list
          </span>
        </div>
      </FormWrapper>
    </div>
  );
}
