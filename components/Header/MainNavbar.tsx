'use client';
import useToggle from '@/hooks/useToggle';
import { RegisterLoginModal } from '../ModalForm';
import { useEffect } from 'react';
import dynamic from 'next/dynamic';
const Search = dynamic(() => import('../Search'));
const SpotPrices = dynamic(() => import('../SpotPrices'));
export default function MainNavbar() {
  const [isOpenModalRegister, toggleModalRegister] = useToggle();
  useEffect(() => {}, []);
  return (
    <>
      <header className='h-[41px] w-full bg-secondary text-white md:h-[52px] lg:block'>
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
