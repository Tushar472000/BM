  import Image from 'next/image';
  import Link from 'next/link';

  export default function NearToSpotMenu(hideNearToSpotMenu: any) {

    return (
      <div className='flex flex-col gap-2 '>
          <div className='ml-2 mr-10 text-center'> 
          <p className='text-sm hover:text-primary'>
              <Link
                as={`/near-to-spot/silver`}
                  href={
                    '/api/BestBullionDeals/GetHomePageProductsByLocation?GetBy=near-to-spotMetalType=silver'
                  }passHref
                  prefetch={false}
                >
              Silver
              </Link>
          </p>
          </div>
          <div className=' pt-2 ml-2 mr-10 text-center'> 
          <p className='text-sm hover:text-primary'>
              <Link
                as={`/near-to-spot/gold`}
                  href={
                    '/api/BestBullionDeals/GetHomePageProductsByLocation?GetBy=near-to-spotMetalType=gold'
                  }passHref
                  prefetch={false}
                >
              Gold
              </Link>
          </p>
          </div>
      </div>
    );
  }
