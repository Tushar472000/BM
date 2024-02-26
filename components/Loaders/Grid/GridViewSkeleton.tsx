export function GridViewSkeleton() {
    return (
        <div className="relative mt-20 flex flex-col items-center rounded-[13px] pt-4 pb-6 text-sm shadow-[0px_3px_3px_rgba(0,0,0,0.16)] md:pb-4">
            <div className="-mt-24 h-24 w-24 md:h-24 md:w-24 lg:h-32 lg:w-32 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="mt-2 h-8 overflow-clip text-center font-semibold md:mt-4 lg:mt-1 lg:h-10 w-9/12 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="mt-2 h-6 overflow-clip text-center font-semibold md:mt-4 lg:mt-1 w-7/12 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="mt-2 h-6 overflow-clip text-center font-semibold md:mt-4 lg:mt-1 w-8/12 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="mt-2 h-6 overflow-clip text-center font-semibold md:mt-4 lg:mt-1 w-7/12 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="border-t-2 border-gray-300 mt-3 w-3/4 rounded">
                <GridButtonSkeleton />
            </div>
        </div>
    )
}
export function GridButtonSkeleton() {
    return (
        <div className='mt-2 hidden w-full flex-1 items-center gap-2 px-3 md:flex justify-center'>
            <span className='group relative inline-flex items-center justify-center rounded h-8 w-24 bg-gray-200 animate-pulse'></span>
            <div className="absolute h-12 w-[2px] bg-gray-300 -mt-1"></div>
            <span className='group relative inline-flex items-center justify-center rounded h-8 w-24 bg-gray-200 animate-pulse'></span>
        </div>
    )
}