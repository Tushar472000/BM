import { useState } from 'react';
import Image from 'next/image';
import TooltipStatus from '../TooltipStatus';
import { toCurrency } from '@/utils/utilities';
import Link from 'next/link';
import { ObservationProductProps } from '@/interfaces/propsinterfaces';
export default function ObservationProduct({
  imageUrl,
  names,
  products,
  dealers,
  cheapestPrice,
  asLowAs,
  premium,
  productId
}: ObservationProductProps) {
  const [tooltipStatus, setTooltipStatus] = useState(0);
  return (
    <>
      <div className='pb-15 relative mt-20 flex h-[250px] flex-col items-center rounded-[13px] py-4 text-sm shadow-[0px_3px_3px_rgba(0,0,0,0.16)] md:pb-4 xl:h-60 2xl:h-[232px]'>
        <Image
          src={imageUrl}
          alt={names}
          width={500}
          height={500}
          className='-mt-20 h-32 w-32 '
          loading='lazy'
        />
        <div
          onMouseEnter={() => setTooltipStatus(3)}
          onMouseLeave={() => setTooltipStatus(0)}
          className='relative mx-5 flex justify-center'
        >
          <div className='twoline mr-2  mt-1 lg:mb-1'>
            <h3 className='my-1 h-10 text-center text-sm font-semibold leading-5 md:mt-4 lg:mt-1 lg:h-10'>
              {products.slice(0,20)}...
            </h3>
          </div>
          {tooltipStatus == 3 && (
            <TooltipStatus view='grid' productName={products} />
          )}
        </div>
        <div className='-mt-1 flex flex-col items-center px-2 md:px-6 xl:-mt-2'>
          <span className='text-center font-medium text-red-500'>
            Premium {toCurrency(asLowAs)}
          </span>
          <span className='text-center text-sm font-normal text-[#656565] line-clamp-1'>
            <>{dealers ?? '-'}</>
          </span>
          <span className='text-center  text-sm font-semibold text-primary'>
            As low as {toCurrency(cheapestPrice)}
          </span>
          <div className='mt-1  hidden w-full flex-1 items-end gap-2 px-3 sm:flex xl:mt-0'>
            <div className='mt-1 rounded border-t-2 border-gray-300 xl:mt-0 '>
              <div className='mt-0 flex items-center justify-center'>
                <Link
                  href={`/observations/price-history/${productId}`}
                  passHref
                  prefetch={false}
                >
                  <div className='ml-2 mr-0 mt-3 font-semibold text-blue-500 underline decoration-blue-500 hover:text-[#0F4463] hover:underline xl:mr-0 2xl:mt-2'>
                    <span>Price History</span>
                  </div>
                </Link>
                <div className='absolute mt-2 mr-0 h-9 border-l-2 border-gray-300 md:mr-4 xl:mr-8 2xl:mr-0 2xl:ml-0'></div>
                <div className='mx-px h-4 w-2 bg-white'></div>
                <Link href={`/${names}`} passHref prefetch={false}>
                  <div className='mt-2 ml-2'>
                    <div className='group relative inline-flex w-full items-center justify-center overflow-hidden rounded-full bg-primary px-3 py-2 text-white md:px-2 xl:px-4'>
                      <span className='absolute left-0 top-0 mb-0 flex h-0 w-full translate-y-0 transform bg-secondary transition-all duration-300 ease-out group-hover:h-full'></span>
                      <span className='relative'>Compare</span>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className='absolute inset-x-0 mt-[165px]  flex-1 justify-center gap-2 text-center sm:hidden'>
          <Link
            href={`/observations/price-history/${productId}`}
            passHref
            prefetch={false}
          >
            <div className='ml-2 mr-0 mt-0  font-semibold text-blue-500 underline decoration-blue-500  hover:underline lg:mt-2 xl:mr-0 xl:mt-1'>
              <span>Price History</span>
            </div>
          </Link>
          <Link href={`/${names}`} passHref prefetch={false}>
            <div className='mt-[10px] ml-2 '>
              <span className=' group relative w-full items-center justify-center overflow-hidden rounded-full bg-primary px-4 py-2 text-white md:px-2 xl:px-4'>
                Compare
              </span>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
