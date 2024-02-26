import Image from 'next/image';
import FormWrapper from '../FormWrapper';

export default function RequestSuccess() {
  return (
    <div className='h-full w-full'>
      <FormWrapper title='Request a product' description='' footer=''>
        <div className='flex flex-col'>
          <div className='flex h-auto w-auto justify-center'>
            <Image
              height={100}
              width={100}
              src='https://res.cloudinary.com/bullionmentor/image/upload/Images-Icons/person-showing-thumb_vzk9xa.png'
              alt='Cancel icon'
              loading='lazy'
            />
          </div>
          <div className='flex flex-col gap-3'>
            <span className='text-center text-base font-semibold text-primary sm:text-[1.35rem]'>
              Congratulations
            </span>
            <span className='-mt-2 text-center text-[0.9rem] text-[#7b7b7b]'>
              We&apos;ve received your product request. You will be notified via
              email once the product is available.
            </span>
          </div>
        </div>
      </FormWrapper>
    </div>
  );
}
