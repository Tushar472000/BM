import { useState } from 'react';
import { GoFlame } from 'react-icons/go';
import { GridViewSkeleton } from '../Grid/GridViewSkeleton';
import DescText from '@/components/HomePageComponents/DescText';

export default function DashboardSkeleton() {
    const [view, setView] = useState<"detailed" | "grid">("grid");
    return (
        <div>
            {/* ******************* GRADIENT AND CAROUSEL PULSE ****************** */}
            <section className='bg-gradient-to-b from-secondary via-white to-white w-full'>
                <div className='container relative flex flex-col items-center justify-center w-full pt-4 pb-2 mx-auto'>
                    <div className='w-full rounded-[39px] pb-2 md:px-10 lg:px-28'>
                        <h1 className='md:text-3xl text-xl font-bold text-center text-white'>
                            A Catalyst in Bullion World
                        </h1>
                        <p className='md:text-sm lg:text-base mt-2  text-xs font-normal text-center text-white'>
                            We monitor bullion market sales events & inform consumers of
                            the excellent ones. compare and keep track of bullion prices..
                        </p>
                    </div>
                    <div className="flex flex-row gap-3 relative h-32 w-full sm:mt-2 md:mt-2 md:h-40 lg:h-60 xl:h-80">
                        <span className="h-full w-full bg-gray-200 animate-pulse"></span>
                        <span className="hidden md:block h-full w-2/4 bg-gray-200 animate-pulse"></span>
                    </div>
                </div>
            </section>
            {/* ******************* PAGE CONTAINER ****************** */}
            <section className="text-dark-black container w-full mx-auto mt-4">
                <div className='md:grid lg:grid-cols-12 flex flex-col-reverse grid-cols-3 gap-4'>
                    {/* ******************* LEFT SECTION ****************** */}
                    <div className='lg:col-span-3 flex flex-col h-auto gap-0'>
                        {/* ******************* ADVERTISEMENT CONTAINER ****************** */}
                        <div className='h-80 md:mt-0 lg:mt-0 flex items-center justify-center w-full mt-4 text-2xl bg-gray-200 rounded animate-pulse'>
                        </div>
                        {/* ******************* REQUEST PRODUCT CONTAINER ****************** */}
                        <div className='flex flex-col'>
                            <hr className='w-full my-4' />
                            <span className="h-96 w-auto rounded bg-gray-200 animate-pulse"></span>
                        </div>
                    </div>
                    {/* ******************* PRODUCT GRID ****************** */}
                    <div className='md:col-span-2 lg:col-span-9 flex flex-col gap-2'>
                        <div className="lg:flex-row lg:items-center lg:gap-0 flex flex-col justify-between w-full gap-4">
                            {/* ******************* PRODUCT GRID TITLE ****************** */}
                            <h2 className='md:-mt-0 md:text-2xl flex items-center gap-2 -mt-4 text-xl font-semibold'>
                                <GoFlame className='text-primary md:text-3xl text-2xl' />
                                Trending Deals
                            </h2>
                            {/* ******************* PRODUCT GRID TOGGLE BUTTONS ****************** */}
                            <div className='md:flex md:self-auto self-end hidden gap-6'>
                                {/* ******************* DETAILED VIEW BUTTON ****************** */}
                                <button
                                    onClick={() => setView('detailed')}
                                    className={`flex items-center gap-2 px-4 py-2 ${view === 'detailed'
                                        ? 'rounded-md bg-primary text-white'
                                        : 'bg-white'
                                        }`}
                                >
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        width='28'
                                        height='23'
                                        viewBox='0 1 28 23'
                                    >
                                        <path
                                            d='M0 1h28v6H0V1z'
                                            fill={view === 'detailed' ? '#fff' : '#707070'}
                                            fillRule='evenodd'
                                        />
                                        <path
                                            d='M0 10h28v6H0v-6z'
                                            fill={view === 'detailed' ? '#fff' : '#707070'}
                                            fillRule='evenodd'
                                        />
                                        <path
                                            d='M0 18h28v6H0v-6z'
                                            fill={view === 'detailed' ? '#fff' : '#707070'}
                                            fillRule='evenodd'
                                        />
                                    </svg>
                                    <span>Detailed View</span>
                                </button>
                                {/* ******************* GRID VIEW BUTTON ****************** */}
                                <button
                                    onClick={() => setView('grid')}
                                    className={`flex items-center gap-2 px-4 py-2 ${view === 'grid'
                                        ? 'rounded-md bg-primary text-white'
                                        : 'bg-white'
                                        }`}
                                >
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        width='23'
                                        height='23'
                                        viewBox='0.215 1 23 23'
                                    >
                                        <path
                                            d='M.215 1h9v10h-9V1z'
                                            fill={view === 'grid' ? '#fff' : '#707070'}
                                            fillRule='evenodd'
                                        />
                                        <path
                                            d='M0 0h9v10h0-9 0V0h0z'
                                            strokeLinejoin='round'
                                            strokeLinecap='round'
                                            stroke={view === 'grid' ? '#fff' : '#707070'}
                                            fill='transparent'
                                            transform='matrix(.88889 0 0 .9 .715 1.5)'
                                        />
                                        <path
                                            d='M.215 14h9v10h-9V14z'
                                            fill={view === 'grid' ? '#fff' : '#707070'}
                                            fillRule='evenodd'
                                        />
                                        <path
                                            d='M0 0h9v10h0-9 0V0h0z'
                                            strokeLinejoin='round'
                                            strokeLinecap='round'
                                            stroke={view === 'grid' ? '#fff' : '#707070'}
                                            fill='transparent'
                                            transform='matrix(.88889 0 0 .9 .715 14.5)'
                                        />
                                        <path
                                            d='M13.215 1h10v10h-10V1z'
                                            fill={view === 'grid' ? '#fff' : '#707070'}
                                            fillRule='evenodd'
                                        />
                                        <path
                                            d='M13.715 1.5h9v9h0-9 0v-9h0z'
                                            strokeLinejoin='round'
                                            strokeLinecap='round'
                                            stroke={view === 'grid' ? '#fff' : '#707070'}
                                            fill='transparent'
                                            strokeWidth='.9'
                                        />
                                        <path
                                            d='M13.215 14h10v10h-10V14z'
                                            fill={view === 'grid' ? '#fff' : '#707070'}
                                            fillRule='evenodd'
                                        />
                                        <path
                                            d='M13.715 14.5h9v9h0-9 0v-9h0z'
                                            strokeLinejoin='round'
                                            strokeLinecap='round'
                                            stroke={view === 'grid' ? '#fff' : '#707070'}
                                            fill='transparent'
                                            strokeWidth='.9'
                                        />
                                    </svg>
                                    <span>Grid View</span>
                                </button>
                            </div>
                        </div>
                        {/* ******************* PRODUCT LIST ****************** */}
                        <div
                            className={`grid gap-x-4 gap-y-8 md:gap-y-4 grid-cols-2 xl:grid-cols-4`}>
                            {Array(16).fill(null).map((values: any, index: number) => (
                                <GridViewSkeleton key={index} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            {/* ******************* PAGE CONTAINER ****************** */}
            <DescText />
        </div>
    )
}