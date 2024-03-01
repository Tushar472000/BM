import React, { Suspense, useEffect, useState } from 'react';
import { GoFlame } from 'react-icons/go';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoGridSharp } from 'react-icons/io5';
import { GridViewSkeleton } from '@/components/Loaders/Grid/GridViewSkeleton';
import TopProductItem from '@/containers/home/TopProductItem';
import { getTopProducts } from '@/services/spot-prices';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { GetTopProductsBy } from '@/interfaces/typeinterfaces';
const ProductListing = () => {
  const [view, setView] = useState<'detailed' | 'grid'>('grid');
  const [topProducts, setTopProducts] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getBy: GetTopProductsBy | undefined = undefined /* your getBy logic */
        const searchKeyword: string | undefined = undefined/* your searchKeyword logic */

        const fetchedProducts = await getTopProducts(getBy, searchKeyword);
        // console.log(fetchedProducts);
        setTopProducts(fetchedProducts);
      } catch (error) {
        console.error('Error fetching top products:', error);
        // Handle the error if needed
      }
    };

    fetchData();
  }, [topProducts]);
  return (
    <>
      <div className='flex flex-col gap-2 md:col-span-2 lg:col-span-9'>
        {/* ******************** PRODUCT LIST TITLE ******************** */}
        <div className='flex w-full flex-col justify-between gap-4 lg:flex-row lg:items-center lg:gap-0'>
          <h2 className='-mt-1 flex items-center gap-2 text-xl font-semibold md:-mt-0 md:text-2xl'>
            <GoFlame className='text-2xl text-primary md:text-3xl' /> Trending
            Deals
          </h2>
          {/* ******************** MENU TOGGLE BUTTON ******************** */}
          <div className='hidden gap-6 self-end md:flex'>
            {/* ******************** DETAILED VIEW BUTTON ******************** */}
            <button
              onClick={() => setView('detailed')}
              className={`flex items-center gap-2 px-4 py-2 ${
                view === 'detailed'
                  ? 'rounded-md bg-primary text-white'
                  : 'bg-white'
              }`}
            >
              <GiHamburgerMenu size={25} />
              <span>Detailed View</span>
            </button>
            {/* ******************** GRID VIEW BUTTON ******************** */}
            <button
              onClick={() => setView('grid')}
              className={`flex items-center gap-2 px-4 py-2 ${
                view === 'grid'
                  ? 'rounded-md bg-primary text-white'
                  : 'bg-white'
              }`}
            >
              <IoGridSharp size={25} />
              <span>Grid View</span>
            </button>
          </div>
        </div>
        {/* ******************** PRODUCTS ARRAY ******************** */}
        <Suspense fallback={<GridViewSkeleton />}>
          <div
            className={`grid gap-x-2 gap-y-4 md:gap-y-4 ${
              view === 'grid'
                ? 'grid-cols-2 xl:grid-cols-4 '
                : 'grid-cols-1 lg:grid-cols-2'
            }`}
          >
            {topProducts && topProducts.homePageProductDetails.map((product: any) => (
              <TopProductItem
                view={view}
                key={product.productId}
                {...product}
              />
            ))}
          </div>
        </Suspense>
      </div>
    </>
  );
};
// export const getServerSideProps: GetServerSideProps<{
//   topProducts: Awaited<ReturnType<typeof getTopProducts>>;
// }> = async ({ res, query }) => {
//   const getBy = query.getBy as GetTopProductsBy | undefined;
//   const searchKeyword = query.search as string | undefined;
//   res.setHeader(
//     'Cache-control',
//     'public, sa-maxage=10, state-while-revalidate=59'
//   );
//   const topProducts = await getTopProducts(getBy, searchKeyword);
//   console.log(query.getBy)
//   console.log(query.search)

//   return {
//     props: {
//       topProducts: topProducts
//     }
//   };
// };
 export default ProductListing;
