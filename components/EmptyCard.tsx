import Image from 'next/image';
export default function EmptyCard() {
  return (
    <div className='rounded-lg p-2 shadow-md lg:mx-16'>
      <div className='flex h-32 justify-center rounded bg-white bg-opacity-60 sm:h-40 md:h-60'>
        <Image
          src='https://res.cloudinary.com/bullionmentor/image/upload/Images-Icons/no-products_ydi7jw.jpg'
          className='h-full w-full object-fill'
          alt='Banner'
          height={400}
          width={1800}
        />
      </div>
      <div className='mt-2 flex flex-col gap-1 py-4 px-2 pb-4 text-center text-sm text-dark-black md:pb-10'>
        <p className='font-semibold text-primary'>No results found</p>
        <p>
          The product you are searching for isn&apos;t available at the moment.
          Please try some time later or search another product.
        </p>
      </div>
    </div>
  );
}
