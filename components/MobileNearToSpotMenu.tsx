import Accordion from './Accordion';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { HiOutlineArrowNarrowLeft } from 'react-icons/hi';
import { MobileSilverMenuProps } from '@/interfaces/propsinterfaces';

export default function MobileNearToSpotMenu({ onHide }: MobileSilverMenuProps) {


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
        <p className='text-sm font-semibold text-white'>Near To Spot</p>
      </div>
      <div className='flex flex-col divide-y divide-gray-200 py-4'>
        {/* -------------------- SILVER PRODUCT TYPE --------------------- */}
        <Accordion title='Metal type'>
          <div className='flex flex-col gap-4 py-4'>
            <div className='flex flex-col gap-2'>
              <p className='text-sm text-white'>
                <Link
                as={`/near-to-spot/silver`}
                  href={
                    ''
                  }
                  passHref
                  prefetch={false}
                  onClick={onHide}
                >
                  Silver
                </Link>
              </p>
            </div>
            <div className='flex flex-col gap-2'>
              <p className='text-sm text-white'>
                <Link
                as={`/near-to-spot/gold`}
                  href={
                    ''
                  }
                  passHref
                  prefetch={false}
                  onClick={onHide}
                >
                  Gold
                </Link>
              </p>
            </div>
          </div>
        </Accordion>
      </div>
    </motion.div>
  );
}
