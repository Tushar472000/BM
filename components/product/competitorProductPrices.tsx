import { selectUser } from '@/features/userSlice';
import { addProdBuyClicksLog } from '@/services/spot-prices';
import { toCurrency } from '@/utils/utilities';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { CompetitorProductPricesProps } from '@/interfaces/propsinterfaces';

export default function CompetitorProductPrices({
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
    <div className='overflow-auto rounded-xl shadow-[0_0_3.5px_rgba(0,0,0,0.35)]'>
      <table className='w-full border-separate border-spacing-0 overflow-hidden rounded-xl border'>
        <thead>
          <tr className=''>
            <th className='border-b py-2 px-3 text-left text-sm font-semibold'>
              Dealer Name
            </th>
            <th className='border-b px-3 py-2 text-left text-sm font-semibold'>
              Premium
            </th>
            <th className='border-b px-3 py-2 text-left text-sm font-semibold'>
              Price
            </th>
            <th className='border-b px-3 py-2 text-left text-sm font-semibold'>
              Free Shipping
            </th>
            <th className='border-b px-3 py-2 text-left text-sm font-semibold'>
              Reviews
            </th>
            <th className='border-b px-3 py-2 text-left text-sm font-semibold'>
              Link
            </th>
          </tr>
        </thead>

        <tbody className='px-1'>
          {competitors.map((competitor, index) => (
            <tr className='rounded-sm text-sm even:bg-gray-200' key={index}>
              <td className='py-4 px-3'>
                <div className='flex flex-col gap-1'>
                  <Link
                    className='font-medium underline'
                    target={'_blank'}
                    href={competitor.detailUrl}
                    passHref
                    prefetch={false}
                  >
                    {competitor.name}
                  </Link>
                  <div className='flex gap-1'>
                    <div className='mt-1 flex items-center justify-center md:mt-0 lg:mt-0'>
                      {Array.from({ length: 5 }, (value, index) => {
                        let numbers = index + 0.5;
                        return (
                          <span key={index}>
                            {competitor.rating >= index + 1 ||
                            competitor.rating >= numbers ? (
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                viewBox='0 0 24 24'
                                fill='#E49E2F'
                                className='h-4 w-4 text-yellow-500 md:h-6 md:w-6 lg:h-6 lg:w-6'
                              >
                                <path
                                  fillRule='evenodd'
                                  d='M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z'
                                  clipRule='evenodd'
                                />
                              </svg>
                            ) : (
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='#C0C0C0'
                                viewBox='0 0 24 24'
                                strokeWidth={0}
                                stroke='currentColor'
                                className='h-4 w-4 md:h-6 md:w-6 lg:h-6 lg:w-6 '
                              >
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  d='M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z'
                                />
                              </svg>
                            )}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </td>
              <td className='py-4 px-3'>{`${toCurrency(
                competitor.asLowAs
              )}${premiumParameter}`}</td>
              <td className='py-4 px-3'>{toCurrency(competitor.priceTier1)}</td>
              <td className='py-4 px-3'>{competitor.shippingDescription}</td>
              <td className='py-4 px-3'>{competitor.reviewCnt} reviews</td>
              <td className='py-4 px-3'>
                <Link
                  target={'_blank'}
                  href={competitor.productUrl}
                  className=''
                  passHref
                  prefetch={false}
                >
                  <div className='group relative inline-flex items-center overflow-hidden rounded-full bg-primary text-sm text-white'>
                    <button
                      onClick={() =>
                        addProduct(competitor.name, competitor.vendorId)
                      }
                      className='group relative inline-block w-full overflow-hidden rounded-full border-2  border-primary bg-primary px-6 py-1 text-sm font-medium text-white hover:border-secondary'
                    >
                      <span className='absolute top-0 left-0 mb-0 flex h-0 w-full translate-y-0 transform bg-secondary opacity-90 transition-all duration-300 ease-out group-hover:h-full '></span>
                      <span className='relative '>Buy</span>
                    </button>
                  </div>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
