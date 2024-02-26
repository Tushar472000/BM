import FormWrapper from '../FormWrapper';
import Image from 'next/image';
import { NewSuccessModalProps } from '@/interfaces/typeinterfaces';

export default function ReviewSuccess() {
  return (
    <div className='h-full w-full'>
      <FormWrapper
        title='Rate a dealer'
        description='Your feedback is valuable'
        footer=''
      >
        <div className='flex flex-row items-center justify-center gap-3'>
          <div className='flex h-auto w-auto justify-center'>
            <Image
              src='https://res.cloudinary.com/bullionmentor/image/upload/Images-Icons/person-showing-thumb_vzk9xa.png'
              height={100}
              width={100}
              alt='Banner'
            />
          </div>
          <div className='flex flex-col justify-start'>
            <span className='text-base font-semibold text-primary'>
              Thank you, we appreciate your feedback
            </span>
            <span className='text-[0.9rem] font-normal text-dark-grey'>
              Spread the word about Bullion Mentor: Your trusted platform for
              the bullion world.
            </span>
          </div>
        </div>
      </FormWrapper>
    </div>
  );
}
