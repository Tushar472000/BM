'use client';
import useToggle from '@/hooks/useToggle';
import { RegisterLoginModal } from '../ModalForm';
import Search from '../Search';
import SpotPrices from '../SpotPrices';
import { useEffect } from 'react';
export default function MainNavbar() {
  const [isOpenModalRegister, toggleModalRegister] = useToggle();
  useEffect(() => { }, []);
  return (
    <>
      <header className='w-full bg-secondary text-white lg:block'>
        <nav className='container relative mx-auto flex w-full items-start text-sm md:justify-between lg:justify-start'>
          <div className='max-w-[267px] grow'></div>
          <div className='grow items-center gap-8 py-2 md:flex'>
            <div className='stick hidden basis-4/6 items-start md:flex'>
              <Search />
            </div>
            <SpotPrices />
          </div>
        </nav>
      </header>
      {isOpenModalRegister && (
        <RegisterLoginModal closeModal={toggleModalRegister} />
      )}
    </>
  );
}
