import { useState } from "react"
import { GridViewSkeleton } from "../Grid/GridViewSkeleton";

export default function MiscSkeleton1() {
    const [view, setView] = useState<"detailed" | "grid">("grid");
    return (
        <div className='container mx-auto text-dark-black'>
            <div className="flex gap-4">
                {/* ******************* LEFT ADVERTISEMENT CONTAINER ****************** */}
                <div className='hidden flex-col gap-4 md:flex'>
                    <div className='flex h-60 w-52 items-center justify-center rounded-md bg-gray-200 animate-pulse'>
                    </div>
                    <div className='flex h-60 w-52 items-center justify-center rounded-md bg-gray-200 animate-pulse'>
                    </div>
                    <div className='flex h-60 w-52 items-center justify-center rounded-md bg-gray- animate-pulse'>
                    </div>
                </div>
                {/* ******************* PRODUCT GRID ****************** */}
                <div className="w-full">
                    {/* ******************* VIEW TOGGLE BUTTONS ****************** */}
                    <div className='mb-4 hidden justify-end gap-8 lg:flex'>
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
                    {/* ******************* PRODUCT LIST PULSE ****************** */}
                    <div
                        className={`grid gap-x-4 gap-y-8 md:gap-y-4 ${view === 'grid'
                            ? 'grid-cols-2 xl:grid-cols-3 '
                            : 'grid-cols-1 lg:grid-cols-2'
                            }`}>
                        {Array(16).fill(null).map((values: any, index: number) => (
                            <GridViewSkeleton key={index} />
                        ))}
                    </div>
                </div>
                {/* ******************* RIGHT ADVERTISEMENT CONTAINER ****************** */}
                <div className='hidden flex-col gap-4 md:flex'>
                    <div className='flex h-60 w-52 items-center justify-center rounded-md bg-gray-200 animate-pulse'>
                    </div>
                    <div className='flex h-60 w-52 items-center justify-center rounded-md bg-gray-200 animate-pulse'>
                    </div>
                    <div className='flex h-60 w-52 items-center justify-center rounded-md bg-gray-200 animate-pulse'>
                    </div>
                </div>
            </div>
        </div>
    )
}