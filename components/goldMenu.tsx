import Image from 'next/image';
import Link from 'next/link';
import { goldMenuProps } from '@/interfaces/typeinterfaces';
import { goldBars,goldCoins,goldseries } from '@/services/menu';

export default function GoldMenu({ hideGoldMenu }: goldMenuProps) {

  return (
    <div className='flex '>
      <div className='w-3/12 px-8'>
        {/* Product Type */}
        <p className='mb-3 text-base font-medium'>Product Type</p>
        <div className='flex flex-col gap-4'>
          {/* Gold Coins */}
          <div className='flex flex-col gap-1'>
            {/* Add the scrollable container */}
            <div className='h-32 overflow-auto'>
              <Link
              as={`/gold/gold-coins`}
                onClick={hideGoldMenu}
                href={
                  '/search?searchFrom=advanced&metal=gold&productType=coins&size=50&pageNumber=1'
                }
                className='relative block h-32 w-full'
                passHref
                prefetch={false}
              >
                <Image
                  fill
                  src={
                    'https://res.cloudinary.com/bullionmentor/image/upload/Banners/gold-coins_ngiymn.jpg'
                  }
                  alt='Gold Coins'
                  className='rounded-lg border border-white'
                  loading='lazy'
                />
              </Link>
            </div>
            <p className='text-sm hover:text-primary'>
              <Link
              as={`/gold/gold-coins`}
                href={
                  '/search?searchFrom=advanced&metal=gold&productType=coins&size=50&pageNumber=1'
                }
                passHref
                prefetch={false}
              >
                Gold Coins
              </Link>
            </p>
          </div>
          {/* Gold Bars */}
          <div className='flex flex-col gap-1'>
            {/* Add the scrollable container */}
            <div className='h-32 overflow-auto'>
              <Link
               as={`/gold/gold-bars`}
                onClick={hideGoldMenu}
                href={'/search?searchFrom=advanced&metal=gold&productType=bars&size=50&pageNumber=1'}
                className='relative block h-32 w-full'
                passHref
                prefetch={false}
              >
                <Image
                  fill
                  src={
                    'https://res.cloudinary.com/bullionmentor/image/upload/Banners/gold-bars_d7lubo.jpg'
                  }
                  alt='Gold Bars'
                  className='rounded-lg border border-white'
                  loading='lazy'
                />
              </Link>
            </div>
            <p className='text-sm hover:text-primary'>
              <Link
               as={`/gold/gold-bars`}
                href={'/search?searchFrom=advanced&metal=gold&productType=bars&size=50&pageNumber=1'}
                passHref
                prefetch={false}
              >
                Gold Bars
              </Link>
            </p>
          </div>
        </div>
      </div>
      {/* series */}
      <div className='col-span-2 w-7/12 overflow-auto border-l border-gray-500  px-4'>
        <p className='mb-3 text-base font-medium'>series</p>
        {/* Add the scrollable container */}
        <div className='mx-auto max-w-screen-sm  overflow-auto'>
          <div className='custom-scrollbar style grid grid-cols-3 gap-6 overflow-auto '>
            {goldseries.map((item, itemIndex) => (
              <div key={itemIndex}>
                <div className='relative h-32 w-32'>
                  <Link
                    as={`/gold/${item.code}`}
                    onClick={hideGoldMenu}
                    href={`/search?searchFrom=advanced&productType=Coins&metal=Gold&series=${item.code}&size=50&pageNumber=1`}
                    className='block h-32 w-full '
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
                 as={`/gold/${item.code}`}
                  href={`/search?searchFrom=advanced&productType=Coins&metal=Gold&series=${item.code}&size=50&pageNumber=1`}
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
        <div className='flex flex-col gap-4'>
          <p className='-mb-1  text-[0.9rem] font-medium'>Gold Coins</p>
          {goldCoins.map((weight, weightIndex) => (
            <Link
            as={`/gold/${weight.weight}`}
              href={`/search?searchFrom=advanced&metal=Gold&productType=Coins&itemWeight=${weight.weight}&size=50&pageNumber=1`}
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
          <p className='-mb-1  mt-8 text-[0.9rem] font-medium'>Gold Bars</p>
          {goldBars.map((weight, weightIndex) => (
            <Link
             as={`/gold/${weight.weight}`}
              href={`/search?searchFrom=advanced&metal=Gold&productType=Bars&itemWeight=${weight.weight}&size=50&pageNumber=1`}
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
