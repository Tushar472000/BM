import data from '@/data';
import { AnimatePresence } from 'framer-motion';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import IconMenu from '../icons/IconMenu';
import { IoMdArrowDropdown } from 'react-icons/io';
import { RegisterLoginModal } from '../ModalForm';
import Modal from '../ModalForm/Modal';
import useToggle from '@/hooks/useToggle';
import { useRouter } from 'next/router';
import MegaMenu from '../megaMenu';
import Head from 'next/head';
import useOnClickOutside from '@/hooks/useOnclickOutside';
import { CgShare } from 'react-icons/cg';
import { GetCustomerDetails, createUser, login } from '@/services/spot-prices';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, signin, signout } from '@/features/userSlice';
import dynamic from 'next/dynamic';

const ShareModal = dynamic(() => import('../ModalForm/ShareModal/shareModal'));
const GoldMenu = dynamic(() => import('../goldMenu'));
const SilverMenu = dynamic(() => import('../silverMenu'));
const NearToSpotMenu = dynamic(() => import('../NearToSpotMenu'));
const MobileMenu = dynamic(() => import('../MobileMenu'));

export default function TopNavbar() {
  const { data: session } = useSession();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isOpenModalRegister, toggleModalRegister] = useToggle();
  const [showSilverMenu, setShowSilverMenu] = useState(false);
  const [showNearSpotMenu, setshowNearSpotMenu] = useState(false);
  const [showGoldMenu, setShowGoldMenu] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [siteModal, toggleSiteModal] = useToggle();
  const [userInfo, setUserInfo] = useState('');
  const router = useRouter();
  const isGoogleUser = true;
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  useEffect(() => {
    const getUserName = async () => {
      if (user.isLoggedin === true) {
        const response = await GetCustomerDetails(user.user.email);
        if (user.user.name === null) {
          setUserInfo(`${response.data.emailId.slice(0, 8)}...`);
        } else {
          setUserInfo(response.data.name);
        }
      }
    };
    getUserName();
  }, [user]);
  const handleGoogleLogin = async () => {
    if (session?.user?.email !== undefined) {
      const response = await login(
        session?.user?.email as string,
        '',
        isGoogleUser
      );
      if (response.success === true) {
        dispatch(
          signin({
            name: response.data.name,
            email: response.data.emailId,
            id: response.data.customerId,
            token: response.data.token,
            isGoogleUser: response.data.isGoogleUser
          })
        );
      }
    }
    9;
  };
  const handleGoogleRegistration = async () => {
    const res = await createUser(session?.user?.email as string, '', '', true);
    if (res.success === true) {
      handleGoogleLogin();
    } else {
      handleGoogleLogin();
    }
  };
  useEffect(() => {
    if ((session?.user?.email?.length as number) > 0) {
      handleGoogleLogin();
      handleGoogleRegistration();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [(session?.user?.email?.length as number) > 0]);

  const hideSilverMenu = () => {
    setShowSilverMenu(false);
  };
  const hideGoldMenu = () => {
    setShowGoldMenu(false);
  };
  const hideNearToSpotMenu = () => {
    setshowNearSpotMenu(false);
  };
  const outSideRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(outSideRef, () => setDropdown(false));

  return (
    <>
      <Head>
        <link
          rel='preload'
          href='https://res.cloudinary.com/bullionmentor/image/upload/Icons/avatar_lpmhnb.webp'
        />
        <link
          rel='preload'
          href='https://res.cloudinary.com/bold-pm/image/upload/BBD/BM-logo.webp'
        />
        <link
          rel='preload'
          href='https://res.cloudinary.com/bold-pm/image/upload/BBD/BM-logo-mob.webp'
        />
      </Head>
      <div className='z-30 w-full bg-secondary-dark text-white'>
        <div className='container relative mx-auto flex flex-row items-center py-2 text-sm lg:py-2.5'>
          {/* ************************ HAMBURGER MENU ICON ************************ */}
          <button
            aria-label='Mobile_Menu'
            onClick={() => setShowMobileMenu(true)}
            className='mr-2 w-[40px] lg:hidden'
          >
            <IconMenu className='h-10 w-10 fill-white stroke-2' />
          </button>
          {/* ************************ MOBILE LOGO ************************ */}
          <Link className='lg:hidden' href={'/'} passHref prefetch={false}>
            <Image
              src='https://res.cloudinary.com/bold-pm/image/upload/BBD/BM-logo-mob.webp'
              width={50}
              height={50}
              alt={data.site.home.page}
              loading='lazy'
            />
          </Link>
          {/* ************************ WEB LOGO ************************ */}
          <Link
            className='absolute top-0 z-10 hidden lg:block'
            href={'/'}
            passHref
            prefetch={false}
          >
            <Image
              src='https://res.cloudinary.com/bullionmentor/image/upload/v1690806037/Images-Icons/BBD-horizontal.webp'
              alt={data.site.home.page}
              height={300}
              width={300}
              className='h-[3.5rem] w-auto object-cover'
              loading='lazy'
            />
          </Link>
          <div className='max-w-[267px] grow'>&nbsp;</div>
          <div className='ml-auto items-center gap-6 md:text-sm lg:flex'>
            <div
              onMouseOver={() => setShowSilverMenu(true)}
              onMouseLeave={() => setShowSilverMenu(false)}
              onClick={() => setShowSilverMenu(!showSilverMenu)}
              className='relative'
            >
              <Link
                href='/silver'
                className={`hidden py-1 text-sm font-medium hover:text-primary lg:block ${
                  router.pathname === '/silver'
                    ? "after:contents-[''] relative text-primary after:absolute after:inset-x-0 after:bottom-0 after:h-1 after:bg-primary"
                    : ''
                }`}
                passHref
                prefetch={false}
              >
                <button className='py-1 text-sm font-normal hover:text-primary'>
                  Silver
                </button>
              </Link>
              <AnimatePresence>
                {showSilverMenu && (
                  <MegaMenu>
                    <SilverMenu hideSilverMenu={hideSilverMenu} />
                  </MegaMenu>
                )}
              </AnimatePresence>
            </div>
            <div
              onMouseOver={() => setShowGoldMenu(true)}
              onMouseLeave={() => setShowGoldMenu(false)}
              onClick={() => setShowGoldMenu(!showGoldMenu)}
              className='relative'
            >
              <Link
                href='/gold'
                className={`hidden py-1 text-sm font-medium hover:text-primary lg:block ${
                  router.pathname === '/gold'
                    ? "after:contents-[''] relative text-primary after:absolute after:inset-x-0 after:bottom-0 after:h-1 after:bg-primary"
                    : ''
                }`}
                passHref
                prefetch={false}
              >
                <button className='py-1 text-sm font-normal hover:text-primary'>
                  Gold
                </button>
              </Link>
              <AnimatePresence>
                {showGoldMenu && (
                  <MegaMenu>
                    <GoldMenu hideGoldMenu={hideGoldMenu} />
                  </MegaMenu>
                )}
              </AnimatePresence>
            </div>

            <div
              onMouseOver={() => setshowNearSpotMenu(true)}
              onMouseLeave={() => setshowNearSpotMenu(false)}
              onClick={() => setshowNearSpotMenu(!setshowNearSpotMenu)}
              className='relative'
            >
              <Link
                className={`hidden py-1 text-sm font-normal hover:text-primary lg:block ${
                  router.pathname === '/near-to-spot/silver'
                    ? "after:contents-[''] relative text-primary after:absolute after:inset-x-0 after:bottom-0 after:h-1 after:bg-primary"
                    : ''
                }`}
                href={'/near-to-spot/silver'}
                passHref
                prefetch={false}
              >
                <button className='py-1 text-sm font-normal hover:text-primary'>
                  Near to Spot
                </button>
              </Link>
              <AnimatePresence>
                {showNearSpotMenu && (
                  <MegaMenu>
                    <NearToSpotMenu hideNearToSpotMenu={hideNearToSpotMenu} />
                  </MegaMenu>
                )}
              </AnimatePresence>
            </div>

            <Link
              className={`hidden py-1 text-sm font-normal hover:text-primary lg:block ${
                router.pathname === '/new-launched'
                  ? "after:contents-[''] relative text-primary after:absolute after:inset-x-0 after:bottom-0 after:h-1 after:bg-primary"
                  : ''
              }`}
              href={'/new-launched'}
              prefetch={false}
            >
              New Launched
            </Link>
            <Link
              className={`hidden py-1 text-sm font-normal hover:text-primary lg:block ${
                router.pathname === '/blogs'
                  ? "after:contents-[''] relative text-primary after:absolute after:inset-x-0 after:bottom-0 after:h-1 after:bg-primary"
                  : ''
              }`}
              href={'/blogs'}
              passHref
              prefetch={false}
            >
              Blog
            </Link>
            <Link
              className={`hidden py-1 text-sm font-normal hover:text-primary lg:block ${
                router.pathname === '/dealer-review'
                  ? "after:contents-[''] relative text-primary after:absolute after:inset-x-0 after:bottom-0 after:h-1 after:bg-primary"
                  : ''
              }`}
              href='/dealer-review'
              prefetch={false}
            >
              Dealers
            </Link>
            <Link
              className={`hidden py-1 text-sm font-normal hover:text-primary lg:block 
              ${
                router.pathname === '/observations'
                  ? "after:contents-[''] relative text-primary after:absolute after:inset-x-0 after:bottom-0 after:h-1 after:bg-primary"
                  : ''
              }
              `}
              href='/observations'
              passHref
              prefetch={false}
            >
              Observations
            </Link>
            <span className='flex flex-row items-center gap-4'>
              <button
                aria-label='Share'
                className=' inline-block hover:text-primary'
                onClick={toggleSiteModal}
              >
                <CgShare size={22} />
              </button>
              {/* ******************** USER PROFILE ******************** */}
              {user.isLoggedin === true ? (
                <span
                  className='flex cursor-pointer flex-row items-center justify-end gap-1'
                  onClick={() => setDropdown(true)}
                >
                  <Image
                    src='https://res.cloudinary.com/bullionmentor/image/upload/Icons/avatar_lpmhnb.webp'
                    alt={user.user.name}
                    height={25}
                    width={25}
                    className='rounded-full border-2 border-white p-0.5'
                    loading='lazy'
                  />
                  <p>Hi, {userInfo}</p>
                  <IoMdArrowDropdown />
                </span>
              ) : (
                <button
                  onClick={toggleModalRegister}
                  className='group relative inline-block w-full overflow-hidden rounded-full border-2 border-[#FFAA00] bg-[#FFAA00] px-6 py-0.5 text-sm font-medium text-[#0F4463] hover:border-white'
                >
                  <span className='absolute top-0 left-0 mb-0 flex h-0 w-full translate-y-0 transform bg-white opacity-90  transition-all duration-300 ease-out group-hover:h-full'></span>
                  <span className='relative group-hover:text-secondary-dark'>
                    {data.navbar.btnText.login}
                  </span>
                </button>
              )}
              {/* ******************** USER DROPDOWN ******************** */}
              {dropdown && (
                <AnimatePresence>
                  <div className='absolute top-12 right-4 z-10 -mr-2 bg-secondary-dark pl-10 pr-3 text-right'>
                    <ul>
                      <Link
                        href='/myaccount'
                        onClick={() => setDropdown(false)}
                        passHref
                        prefetch={false}
                      >
                        <li className='py-2 hover:cursor-pointer hover:text-primary'>
                          My Account
                        </li>
                      </Link>
                      <li
                        onClick={() => {
                          if (session) {
                            signOut({ callbackUrl: '/' }).then(() => {
                              dispatch(signout());
                            });
                            setDropdown(false);
                          } else {
                            setDropdown(false);
                            router.push('/').then(() => {
                              dispatch(signout());
                            });
                          }
                        }}
                        className='py-2 hover:cursor-pointer hover:text-primary'
                      >
                        Logout
                      </li>
                    </ul>
                  </div>
                </AnimatePresence>
              )}
            </span>
            {dropdown && (
              <div
                className='fixed inset-0 h-full w-full'
                onClick={() => setDropdown(false)}
              />
            )}
          </div>
        </div>
        {isOpenModalRegister && (
          <RegisterLoginModal closeModal={toggleModalRegister} />
        )}
      </div>
      <AnimatePresence>
        {showMobileMenu && (
          <MobileMenu onHide={() => setShowMobileMenu(false)} />
        )}
      </AnimatePresence>
      {showLogin && <Modal closeModal={() => setShowLogin(false)} />}
      {siteModal && (
        <ShareModal
          closeModal={toggleSiteModal}
          shareUrl={process.env.WEBSITE_URL as string}
          p1={`Hey there,\n`}
          p2='Find the best BULLION DEALS and RELIABLE DEALERS at '
        />
      )}
    </>
  );
}
