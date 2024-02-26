import data from '@/data';
import useToggle from '@/hooks/useToggle';
import Link from 'next/link';
import { Button } from '@material-tailwind/react';
import { useRouter } from 'next/router';
import React from 'react';
import LazyLoad from 'react-lazy-load';
import dynamic from 'next/dynamic';
import SocialMediaIcons from './socialmediaIcons';
const SubscribeModal = dynamic(
  () => import('../ModalForm/Subscribe/SubscribeModal')
);
const RequestProductModal = dynamic(
  () => import('../ModalForm/RequestProduct/RequestProductModal')
);
const footerData = data.footer;
export default function Footer() {
  const [isOpenModalRegister, toggleModalRegister] = useToggle();
  const [isOpenModalRequest, toggleModalRequest] = useToggle();
  const router = useRouter();
  return (
    <>
      <>
        <LazyLoad>
          <section className="lg:back md:back relative mt-6 h-full w-full bg-[url('https://res.cloudinary.com/bullionmentor/image/upload/Banners/subscribe-bg-mob-view.webp')] bg-cover py-6 md:py-3 lg:py-6">
            <div className='container relative mx-auto flex w-full flex-col items-center justify-center text-center'>
              <span className='font-thin text-white md:text-2xl '>
                {footerData.cta.subtitle}
              </span>
              <h2 className='font-size:2.5rem py-2 text-2xl text-primary md:text-5xl'>
                {footerData.cta.title}
              </h2>

              <div className='text-md group relative mt-3 inline-flex cursor-pointer items-center overflow-hidden rounded-full border-2 border-none bg-white text-lg font-semibold text-dark-black'>
                <Button
                  onClick={toggleModalRegister}
                  className='text-md text-slg group relative inline-block h-full w-full overflow-hidden rounded-full bg-white object-cover px-10 py-3 font-semibold text-dark-black hover:border-white hover:text-secondary sm:my-0'
                >
                  <span className='absolute top-0 left-0  mb-0 flex h-0 w-full translate-y-0 transform bg-primary opacity-90 transition-all duration-300 ease-out group-hover:h-full '></span>
                  <span className='relative '>
                    {' '}
                    {footerData.cta.btnText}&nbsp;
                  </span>
                </Button>
              </div>
            </div>
          </section>
        </LazyLoad>
      </>

      <footer className='w-full bg-secondary-dark bg-cover text-white'>
        <div className='container mx-auto w-full py-8 md:py-[13px] lg:py-4'>
          <div className='flex flex-col items-center justify-between  gap-3 sm:flex-row'>
            <ul className='flex flex-wrap justify-center gap-x-3 sm:justify-start  md:gap-0'>
              {footerData.menus.map((menu, index) =>
                menu.button ? (
                  ''
                ) : (
                  <li key={menu.name} className='flex items-center'>
                    <Link
                      className={` py-1 text-sm font-normal hover:text-primary sm:my-0 ${
                        router.pathname === menu.href
                          ? "after:contents-[''] relative text-primary after:absolute after:inset-x-0 after:bottom-0 after:h-1 after:bg-primary"
                          : ''
                      }`}
                      href={menu.href}
                      prefetch={false}
                    >
                      {menu.name}
                    </Link>
                    {index < footerData.menus.length - 2 && (
                      <div className=' my-0 mx-[20px] hidden h-[18px] w-[1px] bg-white opacity-50 md:block xl:mx-[23px]'></div>
                    )}
                  </li>
                )
              )}
            </ul>

            <div className='flex flex-wrap justify-center sm:justify-end gap-2'>
              {footerData.menus.map((menu, index) =>
                menu.button ? (
                  <button
                    key={`button-${index}`}
                    onClick={toggleModalRequest}
                    className='group relative my-2 inline-block overflow-hidden rounded-full border-2 border-primary bg-primary px-3 py-1 text-xs font-normal  text-white hover:border-white hover:text-secondary sm:my-0 lg:text-sm xl:py-3 xl:px-6'
                  >
                    <span className='absolute top-0 left-0  mb-0 flex h-0 w-full translate-y-0 transform bg-white opacity-90 transition-all duration-300 ease-out group-hover:h-full '></span>
                    <span className='relative'>{menu.name}</span>
                  </button>
                ) : (
                  ''
                )
              )}

              <SocialMediaIcons />
            </div>
          </div>
          <hr className='mt-6 w-full text-white' />
          <p className='pt-4 text-center text-xs'>
            Copyright &copy; {footerData.copyrightText}
          </p>
        </div>
      </footer>
      {isOpenModalRegister && (
        <SubscribeModal closeModal={toggleModalRegister} />
      )}
      {isOpenModalRequest && (
        <RequestProductModal closeModal={toggleModalRequest} />
      )}
    </>
  );
}
