import Image from 'next/image';
import Link from 'next/link';
import { SilverMenuProps } from '@/interfaces/typeinterfaces';
import { silverCoins,silverBars,silverRounds,series } from '@/services/menu';
export default function SilverMenu({ hideSilverMenu }: SilverMenuProps) {

  return (
    <div className='flex '>
      {/* Product Type */}
      <div className='w-3/12 px-8'>
        <p className='mb-3 text-base font-medium'>Product Type</p>
        <div className='flex flex-col gap-4'>
          {/* Silver Coins */}
          <div className='flex flex-col gap-1'>
            {/* Add the scrollable container */}
            <div className='h-32 overflow-auto'>
              <Link
              as={`/silver/silver-coins`}
                onClick={hideSilverMenu}
                href={
                  '/search?searchFrom=advanced&metal=silver&productType=coins&size=50&pageNumber=1'
                }
                className='relative block h-32 w-full'
                passHref
                prefetch={false}
              >
                <Image
                  fill
                  src={
                    'https://res.cloudinary.com/bullionmentor/image/upload/v1679919018/Banners/silver-coins_krsix4.jpg'
                  }
                  alt='Silver Coins'
                  className='rounded-lg border border-white'
                  loading='lazy'
                />
              </Link>
            </div>
            <p className='text-sm hover:text-primary'>
              <Link
              as={`/silver/silver-coins`}
                href={
                  '/search?searchFrom=advanced&metal=silver&productType=coins&size=50&pageNumber=1'
                }
                passHref
                prefetch={false}
              >
                Silver Coins
              </Link>
            </p>
          </div>
          {/* Silver Bars */}
          <div className='flex flex-col gap-1'>
            {/* Add the scrollable container */}
            <div className='h-32 overflow-auto '>
              <Link
                onClick={hideSilverMenu}
                as={`/silver/silver-bars`}
                href={
                  '/search?searchFrom=advanced&metal=silver&productType=bars&size=50&pageNumber=1'
                }
                className='relative block h-32 w-full'
                passHref
                prefetch={false}
              >
                <Image
                  fill
                  src={
                    'https://res.cloudinary.com/bullionmentor/image/upload/Banners/silver-bars_r9wi5b.jpg'
                  }
                  alt='Silver Bars'
                  className='rounded-lg border border-white'
                  loading='lazy'
                />
              </Link>
            </div>
            <p className='text-sm hover:text-primary'>
              <Link
              as={`/silver/silver-bars`}
                href={
                  '/search?searchFrom=advanced&metal=silver&productType=bars&size=50&pageNumber=1'
                }
                passHref
                prefetch={false}
              >
                Silver Bars
              </Link>
            </p>
          </div>
          {/* Silver Rounds */}
          <div className='flex flex-col gap-1'>
            <div className='h-32 overflow-auto '>
              <Link
                onClick={hideSilverMenu}
                as={`/silver/silver-rounds`}
                href={
                  '/search?searchFrom=advanced&metal=silver&productType=rounds&size=50&pageNumber=1'
                }
                className='relative block h-32 w-full'
                passHref
                prefetch={false}
              >
                <Image
                  fill
                  src={
                    'https://res.cloudinary.com/bullionmentor/image/upload/Banners/silver-rounds-series-banners.webp'
                  }
                  alt='Silver rounds'
                  className='rounded-lg border border-white'
                  loading='lazy'
                />
              </Link>
            </div>
            <p className='text-sm hover:text-primary'>
              <Link
              as={`/silver/silver-rounds`}
                href={
                  '/search?searchFrom=advanced&metal=silver&productType=rounds&size=50&pageNumber=1'
                }
                passHref
                prefetch={false}
              >
                Silver Rounds
              </Link>
            </p>
          </div>
        </div> 
      </div>
      {/* series */}
      <div className='col-span-2 w-7/12 border-l border-gray-500  px-4'>
        <p className='mb-3 text-base font-medium '>series</p>
        {/* Add the scrollable container */}
        <div className='mx-auto max-w-screen-sm  overflow-auto'>
          <div className='custom-scrollbar style grid grid-cols-3 gap-6 overflow-auto'>
            {series.map((item, itemIndex) => (
              <div key={itemIndex}>
                <div className='relative h-32 w-32'>
                  <Link
                  as={`/silver/${item.code}`}
                    onClick={hideSilverMenu}
                    href={`/search?searchFrom=advanced&productType=Coins&metal=Silver&series=${item.code}&size=50&pageNumber=1`}
                    className='w-ful block h-32'
                    passHref
                    prefetch={false}
                  >
                    <Image
                      fill
                      src={item.image}
                      alt={item.label}
                      className='rounded-lg border border-white'
                      loading='lazy'
                    />
                  </Link>
                </div>
                <Link
                  as={`/silver/${item.code}`}
                  href={`/search?searchFrom=advanced&productType=Coins&metal=Silver&series=${item.code}&size=50&pageNumber=1`}
                  passHref
                  prefetch={false}
                >
                  <p className='mt-1 text-sm hover:text-primary'>
                    {item.label}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Weight */}
      <div className='w-2/12 border-l border-gray-500 px-4'>
        <p className='mb-2 text-base font-medium'>Weight</p>
        <div className='flex flex-col gap-2'>
          <p className='-mb-1 text-[0.9rem] font-medium'>Silver Coins</p>
          {silverCoins.map((weight, weightIndex) => (
            <Link
            as={`/silver/${weight.weight}`}
              href={`/search?searchFrom=advanced&metal=Silver&productType=Coins&itemWeight=${weight.weight}&size=50&pageNumber=1`}
              key={weightIndex}
              className='h-4 text-sm hover:text-primary'
              passHref
              prefetch={false}
            >
              {weight.label}
            </Link>
          ))}
        </div>
        <div className='flex flex-col gap-4'>
          <p className='-mb-1  mt-8 text-[0.9rem] font-medium'>Silver Bars</p>
          {silverBars.map((weight, weightIndex) => (
            <Link
             as={`/silver/${weight.weight}`}
              href={`/search?searchFrom=advanced&metal=Silver&productType=Bars&itemWeight=${weight.weight}&size=50&pageNumber=1`}
              key={weightIndex}
              className='h-4 text-sm hover:text-primary'
              passHref
              prefetch={false}
            >
              {weight.label}
            </Link>
          ))}
        </div>
        <div className='flex flex-col gap-4'>
          <p className='-mb-1  mt-8 text-[0.9rem] font-medium'>Silver Rounds</p>
          {silverRounds.map((weight, weightIndex) => (
            <Link
             as={`/silver/${weight.weight}`}
              href={`/search?searchFrom=advanced&metal=Silver&productType=Rounds&itemWeight=${weight.weight}&size=50&pageNumber=1`}
              key={weightIndex}
              className='h-4 text-sm hover:text-primary'
              passHref
              prefetch={false}
            >
              {weight.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
