/* eslint-disable @next/next/link-passhref */
import { getSpotPrice } from '@/services/spot-prices';
import { toCurrency } from '@/utils/utilities';
import { useState, useEffect, useRef } from 'react';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';
import Link from 'next/link';
import { spotPriceInterface } from '@/types/types';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, updateSpotPrices } from '@/features/userSlice';
export default function SpotPrices() {
  const dispatch = useDispatch();
  const select = useSelector(selectUser)
  const [spotPricesInfo, setSpotPricesInfo] = useState<spotPriceInterface>({
    gold: 0,
    silver: 0,
    goldChange: 0,
    silverChange: 0,
    goldBid: 0,
    silverBid: 0,
    goldChangePercent: 0,
    silverChangePercent: 0
  });
  const intervalRef = useRef<NodeJS.Timeout>();
  useEffect(() => {
    const initFetch = async () => {
      const response = await getSpotPrice()
      dispatch(updateSpotPrices(response))
    };
    initFetch();
    intervalRef.current = setInterval(initFetch, 45000);
    return () => clearInterval(intervalRef.current);
  }, []);
  useEffect(() => {
    setSpotPricesInfo(select.spotPrices)
  }, [select.spotPrices])
  return (
    <ul className='flex gap-3 md:gap-4' key={'spotpricebar'}>
      <Link href={'/charts/silverChart'} as={'/silver-spot-price'} passHref>
        <li className='flex items-center pr-3 text-[12px] font-normal lg:text-sm'>
        <span className='whitespace-nowrap'>
  Silver: {spotPricesInfo && spotPricesInfo.silver !== undefined ? toCurrency(spotPricesInfo.silver) : 'N/A'}
</span>

          <span>
            {spotPricesInfo.silverChange < 0 ? (
              <MdArrowDropDown fill='#FF5F5F' size={25} />
            ) : (
              <MdArrowDropUp fill='#27D24A' size={25} />
            )}
          </span>
          <span
            className={spotPricesInfo.silverChange < 0 ? 'text-[#FC7C7C]' : 'text-[#27D24A]'}
          >
            {toCurrency(Math.abs(spotPricesInfo.silverChange))}
          </span>
        </li>
      </Link>
      <Link href={'/charts/goldChart'} as={'/gold-spot-price'} passHref>
        <li className='flex items-center pr-3 text-[12px] font-normal lg:text-sm'>
          <span className='whitespace-nowrap'>Gold: {toCurrency(spotPricesInfo.gold)}</span>
          <span>
            {spotPricesInfo.goldChange < 0 ? (
              <MdArrowDropDown fill='#FF5F5F' size={25} />
            ) : (
              <MdArrowDropUp fill='#27D24A' size={25} />
            )}
          </span>
          <span
            className={spotPricesInfo.goldChange < 0 ? 'text-[#FC7C7C]' : 'text-[#27D24A]'}
          >
            {toCurrency(Math.abs(spotPricesInfo.goldChange))}
          </span>
        </li>
      </Link>
    </ul>
  );
}
