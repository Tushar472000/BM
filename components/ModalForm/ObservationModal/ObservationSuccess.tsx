import Image from 'next/image';
import FormWrapper from '../FormWrapper';
import { SuccessModalProps } from '@/interfaces/typeinterfaces';

export default function ObservationSuccess({ closeModal }: SuccessModalProps) {
  return (
    <div className='h-auto w-auto p-3 px-4 sm:w-full'>
      <FormWrapper
        title='Add this product to observation list'
        description=''
        footer=''
      >
        <div className='flex flex-col items-center py-4 md:py-0'>
          <Image
            src='https://res.cloudinary.com/bullionmentor/image/upload/Icons/check_v3m5h5.png'
            className='h-12 w-12'
            height={100}
            width={100}
            alt='close'
          />
          <span className='text-center text-lg font-bold text-primary'>
            Congratulations
          </span>
          <span className='text-center text-sm text-[#7B7B7B]'>
            Product successfully added to observation list
          </span>
        </div>
      </FormWrapper>
    </div>
  );
}
