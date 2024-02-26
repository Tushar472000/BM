import { chartData} from '@/interfaces/typeinterfaces';
import { getChartData } from '@/services/spot-prices';
import React, { Suspense, useEffect, useState } from 'react'
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';
type props = {
  metal:string;
  spotpricedata:number;
}
const Historicaldatatable = ({
   metal
}: props) => {
  const  [historycaldata,sethistorycaldata]=useState<chartData[]>([]);
    useEffect(() => {
      const initfetch= async () => {
        const response = await getChartData(1,'week',true);
        return sethistorycaldata(response.data);
      }
      initfetch();
    },[]);
  return (
    <div className='flex flex-col justify-center w-full items-center px-2 py-2 rounded-lg bg-white shadow-lg'>
    <table className='sm:m-2 w-full bg-white'>
      <thead className='font-semibold text-[18px] text-dark-black items-start text-center'>
        <tr>
          <th className='px-1 py-1 text-start'>Time</th>
          <th className='px-1 py-1 text-start'>Change</th>
          <th className='px-1 py-1 text-start'>Change%</th>
        </tr>
      </thead>
      <tbody className='font-medium items-start justify-start text-center text-[15px]'>
        <Suspense fallback={<tr className='text-gray-700 bg-white px-1 py-1' key={'table1'}></tr>} >
          {historycaldata.map((data:any,index:number)=>(
            <>
              <tr className={index%2 === 0 ? ' text-gray-700 bg-white px-1 py-1':' text-gray-700 bg-gray-100 px-1 py-1'} key={index}>
                <td className='text-start text-[12px] px-2 py-1 w-fit whitespace-normal'>
                    {data.timeframe}
                </td>
                <td className='w-fit px-2 py-1'>
                  {Number(parseFloat(data.silverChange).toFixed(2)) < 0 || Number(parseFloat(data.goldChange).toFixed(2)) < 0 ? (
                      <div className="flex items-center">
                        <MdArrowDropDown size={24} fill="#FF2A2A" />
                        <span className={'text-red-600'}>
                           {metal === "Silver" ? Math.abs(parseFloat(data.silverChange)).toFixed(2) : Math.abs(parseFloat(data.goldChange)).toFixed(2)}
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <MdArrowDropUp size={24} fill="#27D24A" />
                        <span className={'text-green-600'}>
                          {metal === "Silver" ? Math.abs(parseFloat(data.silverChange)).toFixed(2) : Math.abs(parseFloat(data.goldChange)).toFixed(2)}
                        </span>
                      </div>
                    )}

                </td>
                <td className='w-fit px-2 py-1'>
                  {Number(parseFloat(data.silverChangePercent).toFixed(2)) < 0 || Number(parseFloat(data.goldChangePercent).toFixed(2)) < 0 ? (
                     <div className="flex items-center">
                       <MdArrowDropDown size={24} fill="#FF2A2A" />
                       <span className='text-red-600'>
                         {metal === "Silver" ? Math.abs(parseFloat(data.silverChangePercent)).toFixed(2) + '%' : Math.abs(parseFloat(data.goldChangePercent)).toFixed(2) + '%'}
                       </span>
                     </div>
                   ) : (
                     <div className="flex items-center">
                       <MdArrowDropUp size={24} fill="#27D24A" />
                       <span className='text-green-600'>
                         {metal === "Silver" ? Math.abs(parseFloat(data.silverChangePercent)).toFixed(2) + '%' : Math.abs(parseFloat(data.goldChangePercent)).toFixed(2) + '%'}
                       </span>
                     </div>
                   )}

                </td>
              </tr>
            </>
          ))
        }
        </Suspense>
      </tbody>

        
    </table>
    </div>
  )
}

export default Historicaldatatable

