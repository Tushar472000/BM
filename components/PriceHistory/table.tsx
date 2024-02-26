import { ProductPriceHistoryDetail } from "@/interfaces/propsinterfaces";
import { PriceHistoryTableProps, } from "@/interfaces/typeinterfaces";
import { toCurrency } from '@/utils/utilities';


export default function PriceHistoryTable({
  productPriceHistory,
  competitorList
}: PriceHistoryTableProps) {

  // --------- (PRICE DATE,COMPETITORS NAME) FOR AVERGAE-PRICE-PER-DAY --------------
  const getAveragePrice = (
    date: string,
    competitiorName: string
  ): ProductPriceHistoryDetail | undefined => {
    const detail = productPriceHistory.find((d) => d.priceDate == date);
    const compDateDetail = detail?.productPriceHistoryDetails.find(
      (c) => c.competitorName == competitiorName
    );
    return compDateDetail;
  };

  return (
    <div
      className=' border-separate border-spacing-0 overflow-x-auto rounded-lg p-1 text-dark-black  shadow-md'
      id='searchresult'
    >
      <table className='w-full'>
        <thead className='bg-secondary-dark text-white'>
          <tr>
            <th className='whitespace-nowrap border-b border-gray-200 px-5 py-3 text-sm font-medium underline md:text-base md:font-semibold'>
              Price Date
            </th>
            {competitorList.map((items: any, i: number) => {
              return (
                <th
                  key={i}
                  className='whitespace-nowrap border-b border-gray-200 px-5 py-3 text-sm font-medium underline md:text-base md:font-semibold'
                >
                  {items}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {productPriceHistory.map((item: any, idx: number) => {
            return (
              <tr key={`dt_tr_${idx}`} className='even:bg-slate-200'>
                <td className='whitespace-nowrap px-5 py-4 text-sm font-light md:text-base'>
                  {item.priceDate || '-'}
                </td>
                {competitorList.map((compName: any, i: number) => {
                  const compDetails = getAveragePrice(item.priceDate, compName);
                  return (
                    <td
                      key={i}
                      className={`whitespace-nowrap px-5 py-4 text-center text-sm font-light md:text-base ${
                        compDetails?.isMinPrice
                          ? 'font-extrabold text-primary'
                          : ''
                      }`}
                    >
                      {compDetails?.avgPricePerDay
                        ? toCurrency(compDetails.avgPricePerDay)
                        : '-'}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
