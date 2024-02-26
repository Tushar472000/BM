import { tooltipStatusProps } from "@/interfaces/typeinterfaces"
export default function TooltipStatus({ productName, view }: tooltipStatusProps) {
    return (
        <div
            role='tooltip'
            className={`absolute top-[7.5rem] z-20 ${view === 'grid' ? "-mt-20" : "-mt-24"} hidden h-10  w-max cursor-pointer items-center rounded bg-[#707575] py-3 px-2 align-middle shadow-lg transition duration-150 ease-in-out lg:flex`}
        >
            <svg
                className='left-1/2 -top-5 absolute bottom-0 h-full'
                width='9px'
                height='16px'
                viewBox='0 0 9 16'
                version='1.1'
                xmlns='http://www.w3.org/2000/svg'
                xmlnsXlink='http://www.w3.org/1999/xlink'
            >
                <g
                    id='Page-1'
                    stroke='none'
                    strokeWidth={1}
                    fill='none'
                    fillRule='evenodd'
                >
                    <g
                        id='Tooltips-'
                        transform='translate(-874.000000, -1029.000000)'
                        fill='#707575'
                    >
                        <g
                            id='Group-3-Copy-16'
                            transform='translate(850.000000, 975.000000)'
                        >
                            <g
                                id='Group-2'
                                transform='translate(24.000000, 0.000000)'
                            >
                                <polygon
                                    id='Triangle'
                                    transform='translate(4.500000, 62.000000) rotate(0) translate(-4.500000, -62.000000) '
                                    points='4.5 57.5 12.5 66.5 -3.5 66.5'
                                />
                            </g>
                        </g>
                    </g>
                </g>
            </svg>
            <p className='pb-1 text-center text-[0.75rem] font-bold text-white'>
                {productName}
            </p>
        </div>
    )
}