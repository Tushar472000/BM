import { useState } from 'react';
import { GoFlame } from 'react-icons/go';
import { GridViewSkeleton } from '../Grid/GridViewSkeleton';
export default function DashboardSkeleton() {
  const [view, setView] = useState<'detailed' | 'grid'>('grid');
  return (
    <div>
      {/* ******************* GRADIENT AND CAROUSEL PULSE ****************** */}
      <section className='w-full bg-gradient-to-b from-secondary via-white to-white'>
        <div className='container relative mx-auto flex w-full flex-col items-center justify-center pt-4 pb-2'>
          <div className='mt-11 md:px-10 lg:px-28'>
            <h1 className='text-center text-xl font-bold text-white md:text-3xl'>
              A Catalyst in Bullion World
            </h1>
            <p className='mt-2 text-center text-xs font-normal text-white md:text-sm lg:text-base'>
              We monitor bullion market sales events & inform consumers of the
              excellent ones. compare and keep track of bullion prices..
            </p>
          </div>
          <div className='relative mt-[50px] flex h-32 w-full flex-row gap-3 sm:mt-2 md:mt-2 md:h-40 lg:h-60 xl:h-80'>
            <span className='h-full w-full animate-pulse bg-gray-200'></span>
            <span className='hidden h-full w-2/4 animate-pulse bg-gray-200 md:block'></span>
          </div>
        </div>
      </section>
      {/* ******************* PAGE CONTAINER ****************** */}
      <section className='w-ful container mx-auto mt-4'>
        <div className='flex grid-cols-3 flex-col-reverse gap-4 md:grid lg:grid-cols-12'>
          {/* ******************* LEFT SECTION ****************** */}
          <div className='flex h-auto flex-col lg:col-span-3'>
            {/* ******************* ADVERTISEMENT CONTAINER ****************** */}
            <div className='mt-4 h-80 w-full animate-pulse  rounded bg-gray-200 md:mt-0 lg:mt-0'></div>
            {/* ******************* REQUEST PRODUCT CONTAINER ****************** */}
            <div className='flex flex-col'>
              <hr className='my-4 w-full' />
              <span className='h-96 w-auto animate-pulse rounded bg-gray-200'></span>
            </div>
          </div>
          {/* ******************* PRODUCT GRID ****************** */}
          <div className='md:col-span-2 lg:col-span-9'>
            {/* ******************* PRODUCT GRID TITLE ****************** */}
            <h2 className='-mt-4 flex items-center gap-2 text-xl font-semibold md:-mt-0 md:text-2xl'>
              <GoFlame className='text-2xl text-primary md:text-3xl' />
              Trending Deals
            </h2>
            {/* ******************* PRODUCT GRID TOGGLE BUTTONS ****************** */}
            <div className='hidden gap-6 self-end md:flex md:self-auto'>
              {/* ******************* DETAILED VIEW BUTTON ****************** */}
              <button
                onClick={() => setView('detailed')}
                className={`flex items-center gap-2 px-4 py-2 ${
                  view === 'detailed'
                    ? 'rounded-md bg-primary text-white'
                    : 'bg-white'
                }`}
              >
                <span>Detailed View</span>
              </button>
              {/* ******************* GRID VIEW BUTTON ****************** */}
              <button
                onClick={() => setView('grid')}
                className={`flex items-center gap-2 px-4 py-2 ${
                  view === 'grid'
                    ? 'rounded-md bg-primary text-white'
                    : 'bg-white'
                }`}
              >
                <span>Grid View</span>
              </button>
            </div>

            {/* ******************* PRODUCT LIST ****************** */}
            <div
              className={`grid grid-cols-2 gap-x-4 gap-y-8 md:mt-3 md:gap-y-4 xl:grid-cols-4`}
            >
              {Array(8)
                .fill(null)
                .map((values: any, index: number) => (
                  <GridViewSkeleton key={index} />
                ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
