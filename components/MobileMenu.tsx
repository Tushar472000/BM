import Image from 'next/image';
import Link from 'next/link';
import { HiOutlineArrowNarrowLeft } from 'react-icons/hi';
import { useLockBodyScroll } from 'react-use';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { BiChevronDown } from 'react-icons/bi';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { MobileMenuProps } from '@/interfaces/propsinterfaces';
// ------------------------ Dynamic Imported here -----------------
const MobileGoldMenu = dynamic(() => import('./MobileGoldMenu'));
const MobileSilverMenu = dynamic(() => import('./MobileSilverMenu'));
const MobileNearToSpotMenu = dynamic(() => import('./MobileNearToSpotMenu'));


export default function MobileMenu({ onHide }: MobileMenuProps) {
  useLockBodyScroll();
  const [showSilverMenu, setShowSilverMenu] = useState(false);
  const [showGoldMenu, setShowGoldMenu] = useState(false);
  const [showNearToSpotMenu, setShowNearToSpotMenu] = useState(false);
  
  const router = useRouter();
  const items = [
    {
      label: 'New Launched',
      href: '/new-launched'
    },
    {
      label: 'Blog',
      href: '/blogs'
    },
    {
      label: 'Dealers List',
      href: '/dealer-review'
    },
    {
      label: 'Observation List',
      href: '/observations'
    }
  ];
  const hideSilverMenu = () => {
    setShowSilverMenu(false);
    onHide();
  };
  const hideGoldMenu = () => {
    setShowGoldMenu(false);
    onHide();
  };
  const hideNearToSpotMenu = () => {
    setShowNearToSpotMenu(false);
    onHide();
  };
  const clickHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onHide();
    router.push(e.currentTarget.href);
  };
  return (
    <motion.div
      initial={{
        translateX: '-100%'
      }}
      animate={{
        translateX: '0',
        transition: {
          duration: 0.2
        }
      }}
      exit={{
        translateX: '-100%',
        transition: {
          duration: 0.2
        }
      }}
      id='scrollable-content'
      className='container fixed inset-y-0 inset-x-0 z-50 w-9/12 overflow-y-scroll bg-secondary-dark shadow-md'
    >
      <div className='flex flex-col divide-y divide-gray-500'>
        <div className='my-3 flex items-center justify-between'>
          <Link onClick={clickHandler} href={'/'} passHref prefetch={false}>
            <Image
              src={`https://res.cloudinary.com/bullionmentor/image/upload/Images-Icons/BM-logo-mob_tssebr.png`}
              width={50}
              height={50}
              alt={'logo'}
              loading='lazy'
            />
          </Link>
          <button onClick={onHide}>
            <HiOutlineArrowNarrowLeft className='h-6 w-6 stroke-white' />
          </button>
        </div>

        <AnimatePresence mode='wait'>
          {!showSilverMenu && !showGoldMenu && !showNearToSpotMenu && (
            <motion.div
              initial={{
                translateX: '0'
              }}
              exit={{
                translateX: '-100%',
                transition: {
                  duration: 0.2
                }
              }}
              animate={{
                translateX: '0',
                transition: {
                  duration: 0.2,
                  delay: 0.25
                }
              }}
              className='flex flex-col divide-y divide-gray-500'
            >
              <div className='hidden items-center gap-2 py-2'>
                <div className='flex h-9 w-9 items-center justify-center rounded-full bg-gray-200'></div>
                <p className='text-white'>Hi, Jane Doe</p>
              </div>
              {/*--------------------- SIDE MOBILE MENU LIST -----------------*/}
              <button
                onClick={() => setShowSilverMenu(true)}
                className='flex items-center justify-between py-4 text-sm'
              >
                <Link
                  href='/silver'
                  onClick={clickHandler}
                  passHref
                  prefetch={false}
                >
                  <p className='text-white'>Silver</p>
                </Link>
                <BiChevronDown className='h-5 w-5 text-white' />
              </button>
              <button
                onClick={() => setShowGoldMenu(true)}
                className='flex items-center justify-between py-4 text-sm'
              >
                <Link
                  href='/gold'
                  onClick={clickHandler}
                  passHref
                  prefetch={false}
                >
                  <p className='text-white'>Gold</p>
                </Link>
                <BiChevronDown className='h-5 w-5 text-white' />
              </button>
              <button
                onClick={() => setShowNearToSpotMenu(true)}
                className='flex items-center justify-between py-4 text-sm'
              >
                <Link
                  href='/near-to-spot/silver'
                  onClick={clickHandler}
                  passHref
                  prefetch={false}
                >
                  <p className='text-white'>Near to Spot</p>
                </Link>
                <BiChevronDown className='h-5 w-5 text-white' />
              </button>
              {items.map((item, itemIndex) => (
                <Link
                  className='py-4 text-sm text-white'
                  key={itemIndex}
                  href={item.href}
                  onClick={clickHandler}
                  passHref
                  prefetch={false}
                >
                  {item.label}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <AnimatePresence mode='wait'>
        {showSilverMenu && <MobileSilverMenu onHide={hideSilverMenu} />}
        {showGoldMenu && <MobileGoldMenu onHide={hideGoldMenu} />}
        {showNearToSpotMenu && <MobileNearToSpotMenu onHide={hideNearToSpotMenu} />}
      </AnimatePresence>
    </motion.div>
  );
}
