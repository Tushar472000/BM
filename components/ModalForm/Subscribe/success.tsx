import Image from 'next/image';
import FormWrapper from '../FormWrapper';

export default function SubscribeSuccess() {
  return (
    <div className='h-full w-full'>
      <FormWrapper title='Subscribe To Bullion Mentor' description='' footer=''>
        <div className='flex flex-col'>
          <div className='flex h-auto w-auto justify-center'>
            <Image
              height={100}
              width={100}
              src='https://res.cloudinary.com/bullionmentor/image/upload/Images-Icons/mail-and-tick_m23cxz.png'
              alt='Cancel icon'
              loading='lazy'
            />
          </div>
          <div className='flex flex-col gap-3'>
            <span className='text-center text-base font-semibold text-primary sm:text-[1.35rem]'>
              Congrats! Subscription successful
            </span>
            <span className='-mt-2 text-center text-[0.9rem] text-[#7b7b7b]'>
              You are now eligible to receive Bullion Mentor&apos;s newsletters.
            </span>
          </div>
        </div>
      </FormWrapper>
    </div>
  );
}
