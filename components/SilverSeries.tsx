import Image from 'next/image';
import Link from 'next/link';
import { series } from '@/services/menu';
export default function SilverSeries() {
  
  return (
    <div className='grid grid-cols-4 gap-2 text-xs sm:grid-cols-6 md:text-base lg:grid-cols-10 lg:gap-6'>
      {series.map((item) => (
        <div className='col-span-2 mt-4' key={item.code}>
          <Link
            as={`/silver/${item.code}`}
            href={`/search?searchFrom=advanced&productType=Coins&metal=Silver&series=${item.code}&size=50&pageNumber=1`}
            passHref
            prefetch={false}
          >
            <Image
              src={item.image}
              alt={item.label}
              height={150}
              width={150}
              className='w-full rounded-lg lg:h-56 lg:w-auto'
              loading='lazy'
            />
            <h5 className='mt-1 text-left font-medium underline hover:text-primary'>
              {item.label}
            </h5>
          </Link>
        </div>
      ))}
    </div>
  );
}
