import Link from 'next/link';
import { TbWorld } from 'react-icons/tb';
import { AiFillStar } from 'react-icons/ai';
import { toCurrency } from '@/utils/utilities';
import { selectUser } from '@/features/userSlice';
import { addProdBuyClicksLog } from '@/services/spot-prices';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { CompetitorProductPricesProps } from '@/interfaces/propsinterfaces';


export default function MobileCompetitorProductPrices({
  competitors,
  premiumParameter,
  productName
}: CompetitorProductPricesProps) {
  const [customerId, setCustomerId] = useState(0);
  const user = useSelector(selectUser);

  useEffect(() => {
    if (user.isLoggedin === false) {
      setCustomerId(0);
    } else {
      setCustomerId(user.user.id);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addProduct = async (dealerName: string, vendorId: number) => {
    const response = await addProdBuyClicksLog(
      productName,
      dealerName,
      customerId,
      vendorId
    );
  };
  return (
    <div className='grid gap-2 sm:grid-cols-3'>
      {competitors.map((competitor, index) => (
        <div key={index} className='rounded-lg border-gray-400 p-2 shadow-md'>
          <div className='flex items-center justify-between '>
            <div className='flex items-center gap-1'>
              <TbWorld />
              <Link
                href={competitor.detailUrl}
                className=' h-6 text-ellipsis  sm:w-24'
                prefetch={false}
              >
                {competitor.name}
              </Link>
            </div>
            <div className='fix flex gap-1'>
              <AiFillStar className='text-primary' />
              <p className='border-b border-black text-sm'>
                {competitor.rating}
              </p>
            </div>
          </div>

          <div className='text-sm font-bold text-primary'>
            {toCurrency(competitor.priceTier1)}
          </div>
          <div className='text-sm font-bold text-red-500'>
            {`${toCurrency(competitor.asLowAs)}${premiumParameter}`}
          </div>
          <h2 className='mb-2 text-xs font-medium'>
            {competitor.shippingDescription}
          </h2>
          <Link
            href={competitor.productUrl}
            className='.bottom-0 block w-20 rounded-3xl bg-primary py-1 text-center text-sm text-white'
            prefetch={false}
            onClick={() => addProduct(competitor.name, competitor.vendorId)}
          >
            Buy
          </Link>
        </div>
      ))}
    </div>
  );
}
