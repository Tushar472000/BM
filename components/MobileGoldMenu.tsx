import Image from 'next/image';
import { HiOutlineArrowNarrowLeft } from 'react-icons/hi';
import Accordion from './Accordion';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MobileGoldMenuProps } from '@/interfaces/propsinterfaces';
import { goldBars,goldCoins,goldseries } from '@/services/menu';

export default function MobileGoldMenu({ onHide }: MobileGoldMenuProps) {
  return (
    <motion.div
      initial={{ translateX: '100%', opacity: 0, visibility: 'hidden' }}
      animate={{
        translateX: '0',
        opacity: 1,
        visibility: 'visible',
        transition: {
          duration: 0.2,
          delay: 0.25
        }
      }}
      exit={{
        translateX: '100%',
        opacity: 0,
        visibility: 'hidden',
        transition: {
          duration: 0.2
        }
      }}
    >
      <div className='flex items-center gap-2 py-2 text-sm font-semibold'>
        <button onClick={onHide}>
          <HiOutlineArrowNarrowLeft className='h-6 w-6 stroke-white' />
        </button>
        <p className='text-white'>Gold</p>
      </div>
      <div className='flex flex-col divide-y divide-gray-200'>
        {/* -------------------- GOLD PRODUCT TYPE --------------------- */}
        <Accordion title='Categories'>
          <div className='grid grid-cols-2 gap-4 py-4'>
            <div className='flex flex-col gap-2'>
              <div className='relative h-16 w-24 md:h-44 md:w-56'>
                <Link
                as={`/gold/gold-coins`}
                  onClick={onHide}
                  href={
                    '/search?searchFrom=advanced&metal=gold&productType=coins&size=50&pageNumber=1'
                  }
                  passHref
                  prefetch={false}
                >
                  <Image
                    fill
                    src={
                      'https://res.cloudinary.com/bullionmentor/image/upload/Banners/gold-coins_ngiymn.jpg'
                    }
                    alt='Gold Coins'
                    loading='lazy'
                  />
                </Link>
              </div>

              <p className='text-sm font-semibold text-white'>
                <Link
                as={`/gold/gold-coins`}
                  onClick={onHide}
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
            <div className='flex flex-col gap-2'>
              <div className='relative h-16 w-24 md:h-44 md:w-56'>
                <Link
                as={`/gold/gold-bars`}
                  onClick={onHide}
                  href={
                    '/search?searchFrom=advanced&metal=gold&productType=bars&size=50&pageNumber=1'
                  }
                  passHref
                  prefetch={false}
                >
                  <Image
                    fill
                    src={
                      'https://res.cloudinary.com/bullionmentor/image/upload/Banners/gold-bars_d7lubo.jpg'
                    }
                    alt='Gold Bars'
                    loading='lazy'
                  />
                </Link>
              </div>
              <p className='text-sm font-semibold text-white'>
                <Link
                as={`/gold/gold-bars`}
                  onClick={onHide}
                  href={
                    '/search?searchFrom=advanced&metal=gold&productType=bars&size=50&pageNumber=1'
                  }
                  passHref
                  prefetch={false}
                >
                  Gold Bars
                </Link>
              </p>
            </div>
          </div>
        </Accordion>
        {/* ---------------------- GOLD series ----------------------- */}
        <Accordion title='series'>
          <div className='grid grid-cols-2 gap-4 py-4'>
            {goldseries.map((item, itemIndex) => (
              <div key={itemIndex}>
                <Link
                as={`/gold/${item.code}`}
                  onClick={onHide}
                  href={`/search?searchFrom=advanced&productType=Coins&metal=Gold&series=${item.code}&size=50&pageNumber=1`}
                  passHref
                  prefetch={false}
                >
                  <div className='relative h-24 w-auto border-2 border-white md:h-44 md:w-56'>
                    <Image
                      className='object-fill'
                      fill
                      src={item.image}
                      alt={item.label}
                      loading='lazy'
                    />
                  </div>
                  <p className='mt-2 text-center text-xs font-semibold text-white'>
                    {item.label}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        </Accordion>
        {/* ---------------------- GOLD SERIES ----------------------- */}
        <Accordion title='Weights'>
          <p className='-mb-1 text-[0.9rem] font-medium text-white'>
            Gold Coins
          </p>
          <div className='flex flex-wrap py-4'>
            {goldCoins.map((weight, weightIndex) => (
              <Link
              as={`/gold/${weight.weight}`}
                onClick={onHide}
                href={`/search?searchFrom=advanced&metal=Gold&productType=Coins&itemWeight=${weight.weight}&size=50&pageNumber=1`}
                key={weightIndex}
                className='py-1 pr-4 text-sm font-extralight text-white'
                passHref
                prefetch={false}
              >
                {weight.label}
              </Link>
            ))}
          </div>
          <p className='-mb-1 text-[0.9rem] font-medium text-white'>
            Gold Bars
          </p>
          <div className='flex flex-wrap py-4 text-white'>
            {goldBars.map((weight, weightIndex) => (
              <Link
                onClick={onHide}
                href={`/search?searchFrom=advanced&metal=Gold&productType=Bars&itemWeight=${weight.weight}&size=50&pageNumber=1`}
                key={weightIndex}
                className='py-1 pr-4 text-sm font-extralight text-white'
                passHref
                prefetch={false}
              >
                {weight.label}
              </Link>
            ))}
          </div>
        </Accordion>
      </div>
    </motion.div>
  );
}
