import Accordion from './Accordion';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { HiOutlineArrowNarrowLeft } from 'react-icons/hi';
import { MobileSilverMenuProps } from '@/interfaces/propsinterfaces';
import { silverBars,silverCoins,silverRounds,series } from '@/services/menu';

export default function MobileSilverMenu({ onHide }: MobileSilverMenuProps) {


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
          duration: 0.1
        }
      }}
    >
      <div className='flex items-center gap-2 py-2 text-sm'>
        <button onClick={onHide}>
          <HiOutlineArrowNarrowLeft className='h-6 w-6 stroke-white' />
        </button>
        <p className='text-sm font-semibold text-white'>Silver</p>
      </div>
      <div className='flex flex-col divide-y divide-gray-200 py-4'>
        {/* -------------------- SILVER PRODUCT TYPE --------------------- */}
        <Accordion title='Product type'>
          <div className='grid grid-cols-2 gap-4 py-4'>
            <div className='flex flex-col gap-2'>
              <div className='relative h-16 w-24 md:h-44 md:w-56'>
                <Link
                  onClick={onHide}
                  as={`/silver/silver-coins`}
                  href={
                    '/search?searchFrom=advanced&metal=silver&productType=coins&size=50&pageNumber=1'
                  }
                  passHref
                  prefetch={false}
                >
                  <Image
                    fill
                    src={
                      'https://res.cloudinary.com/bullionmentor/image/upload/v1679919018/Banners/silver-coins_krsix4.jpg'
                    }
                    alt='Silver Coins'
                    loading='lazy'
                  />
                </Link>
              </div>

              <p className='text-sm text-white'>
                <Link
                as={`/silver/silver-coins`}
                  href={
                    '/search?searchFrom=advanced&metal=silver&productType=coins&size=50&pageNumber=1'
                  }
                  passHref
                  prefetch={false}
                  onClick={onHide}
                >
                  Silver Coins
                </Link>
              </p>
            </div>
            <div className='flex flex-col gap-2'>
              <div className='relative h-16 w-24 md:h-44 md:w-56'>
                <Link
                as={`/silver/silver-bars`}
                  onClick={onHide}
                  href={
                    '/search?searchFrom=advanced&metal=silver&productType=bars&size=50&pageNumber=1'
                  }
                  passHref
                  prefetch={false}
                >
                  <Image
                    fill
                    src={
                      'https://res.cloudinary.com/bullionmentor/image/upload/Banners/silver-bars_r9wi5b.jpg'
                    }
                    alt='Silver Bars'
                    loading='lazy'
                  />
                </Link>
              </div>
              <p className='text-sm text-white'>
                <Link
                as={`/silver/silver-bars`}
                  href={
                    '/search?searchFrom=advanced&metal=silver&productType=bars&size=50&pageNumber=1'
                  }
                  passHref
                  prefetch={false}
                  onClick={onHide}
                >
                  Silver Bars
                </Link>
              </p>
            </div>
            <div className='flex flex-col gap-2'>
              <div className='relative h-16 w-24 md:h-44 md:w-56'>
                <Link
                as={`/silver/silver-rounds`}
                  onClick={onHide}
                  href={
                    '/search?searchFrom=advanced&metal=silver&productType=rounds&size=50&pageNumber=1'
                  }
                  passHref
                  prefetch={false}
                >
                  <Image
                    fill
                    src={
                      'https://res.cloudinary.com/bullionmentor/image/upload/Banners/silver-rounds-series-banners.webp'
                    }
                    alt='Silver Rounds'
                    loading='lazy'
                  />
                </Link>
              </div>
              <p className='text-sm text-white'>
                <Link
                as={`/silver/silver-rounds`}
                  href={
                    '/search?searchFrom=advanced&metal=silver&productType=rounds&size=50&pageNumber=1'
                  }
                  passHref
                  prefetch={false}
                  onClick={onHide}
                >
                  Silver Rounds
                </Link>
              </p>
            </div>
          </div>
        </Accordion>
        {/* ---------------------- SILVER series ----------------------- */}
        <Accordion title='series'>
          <div className='grid grid-cols-2 gap-4 py-4'>
            {series.map((item, itemIndex) => (
              <div key={itemIndex}>
                <Link
                as={`/silver/${item.code}`}
                  onClick={onHide}
                  href={`/search?searchFrom=advanced&productType=Coins&metal=Silver&series=${item.code}&size=50&pageNumber=1`}
                  passHref
                  prefetch={false}
                >
                  <div className='relative h-24 w-auto border-2 border-white object-contain md:h-44 md:w-56'>
                    <Image
                      className='object-fill'
                      fill
                      src={item.image}
                      alt={item.label}
                      loading='lazy'
                    />
                  </div>
                  <p className='mt-2 text-center text-xs text-white'>
                    {item.label}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        </Accordion>
        {/* ------------------- SILVER WEIGHTS --------------------- */}
        <Accordion title='Weight'>
          <p className='-mb-1 text-[0.9rem] font-medium text-white'>
            Silver Coins
          </p>
          <div className='flex flex-wrap  py-4'>
            {silverCoins.map((weight, weightIndex) => (
              <Link
                onClick={onHide}
                as={`/silver/${weight.weight}`}
                href={`/search?searchFrom=advanced&metal=Silver&productType=Coins&itemWeight=${weight.weight}&size=50&pageNumber=1`}
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
            Silver Bars
          </p>
          <div className='flex flex-wrap  py-4'>
            {silverBars.map((weights, weightIndex) => (
              <Link
                onClick={onHide}
                as={`/silver/${weights.weight}`}
                href={`/search?searchFrom=advanced&metal=Silver&productType=Bars&itemWeight=${weights.weight}&size=50&pageNumber=1`}
                key={weightIndex}
                className=' py-1 pr-4 text-sm font-extralight text-white'
                passHref
                prefetch={false}
              >
                {weights.label}
              </Link>
            ))}
          </div>
          <p className='-mb-1 text-[0.9rem] font-medium text-white'>
            Silver Rounds
          </p>
          <div className='flex flex-wrap  py-4'>
            {silverRounds.map((weights, weightIndex) => (
              <Link
              as={`/silver/${weights.weight}`}
                onClick={onHide}
                href={`/search?searchFrom=advanced&metal=Silver&productType=Rounds&itemWeight=${weights.weight}&size=50&pageNumber=1`}
                key={weightIndex}
                className=' py-1 pr-4 text-sm font-extralight text-white'
                passHref
                prefetch={false}
              >
                {weights.label}
              </Link>
            ))}
          </div>
        </Accordion>
      </div>
    </motion.div>
  );
}
