import Image from 'next/image';
export default function LeftAdvertisements({ src }: any) {
    return (
      <>
        <div className='mt-4 md:mt-2'>
          <div className='flex  w-full items-center  justify-center rounded  text-2xl md:mt-0 lg:mt-0'>
            <Image
              src={src}
              height={500}
              width={500}
              priority={false}
              loading='lazy'
              alt='ads'
              className='h-[300px] w-[445px] justify-center rounded-lg md:h-[250px] lg:w-[500px] xl:h-[300px] 2xl:h-[360px]'
            />
          </div>
        </div>
      </>
    );
    }