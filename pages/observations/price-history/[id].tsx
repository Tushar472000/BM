import Breadcrumbs from '@/components/breadcrumbs';
import PriceHistoryTable from '@/components/PriceHistory/table';
import Spinner from '@/components/Spinner';
import { getPriceHistory } from '@/services/observations';
import dayjs from 'dayjs';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getTopProducts } from '@/services/spot-prices';
import queryString from 'query-string';
import { useEffect, useState } from 'react';
import useToggle from '@/hooks/useToggle';
import Image from 'next/image';
import AddProductModal from '@/components/ModalForm/AddProductModal/AddProductModal';

export default function PriceHistory({
  priceHistory,
  topProducts
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [productPriceHistory, setProductPriceHistory] = useState<any>();
  const [competitorList, setCompetitorName] = useState<any>();
  const [addProduct, toggleAddProducts] = useToggle();
  const [hydrated, setHydrated] = useState(false);
  const breadcrumbs = [
    {
      label: 'Home',
      href: '/'
    },
    {
      label: 'Observation List',
      href: '/observations'
    },
    {
      label: 'Price History',
      active: true
    }
  ];
  useEffect(() => {
    setProductPriceHistory(priceHistory.pricePulledDate);
    setCompetitorName(priceHistory.competitorList);
    setHydrated(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (hydrated === false) {
    return (
      <div>
        <Spinner />
      </div>
    );
  } else {
    return (
      <>
        <div className='container mx-auto mt-12 flex flex-col gap-4 text-dark-black md:mt-10 md:pt-8 lg:mt-2 xl:flex-row xl:gap-6'>
          {/* ******************** PRICE HISTORY DATA ******************** */}
          <div className='flex flex-col gap-4 xl:w-4/6'>
            <Breadcrumbs items={breadcrumbs} />
            {/* ******************** PRODUCT NAME ******************** */}
            <div className='flex flex-col items-start gap-2 lg:flex-row lg:items-center lg:gap-4'>
              <h1 className='text-base font-medium md:text-2xl'>
                {priceHistory.name}
              </h1>
              <span className='flex flex-row justify-around gap-4'>
                <button
                  className='rounded-full bg-primary px-4 py-2 text-sm font-medium text-white hover:border-transparent hover:bg-opacity-80 md:block'
                  onClick={toggleAddProducts}
                >
                  Add products
                </button>
              </span>
            </div>
            <PriceHistoryTable
              productPriceHistory={productPriceHistory}
              competitorList={competitorList}
            />
          </div>
          {/* ******************** INFOGRAPHICS ******************** */}
          <div className='flex flex-col gap-8 xl:w-2/6'>
            <h2 className='mt-1 text-xl font-medium md:text-xl'>Sponsored</h2>
            <div className='grid-cols-2 gap-8 lg:grid xl:flex xl:flex-col'>
              <div className='flex w-full items-center justify-start text-2xl'>
                <Image
                  src='https://res.cloudinary.com/bullionmentor/image/upload/Banners/Royal-Canadian-Mint_xqgsz4.jpg'
                  alt=''
                  height={500}
                  width={500}
                  className='rounded-lg'
                  loading='lazy'
                />
              </div>
            </div>
          </div>
        </div>
        {addProduct && (
          <AddProductModal
            closeModal={toggleAddProducts}
            products={topProducts.homePageProductDetails}
          />
        )}
      </>
    );
  }
}

export const getServerSideProps: GetServerSideProps<{
  priceHistory: Awaited<ReturnType<typeof getPriceHistory>>;
  topProducts: Awaited<ReturnType<typeof getTopProducts>>;
}> = async (context) => {
  const { id } = context.params as any;
  const query = queryString.stringify({
    ProductId: id,
    SDate: dayjs().subtract(5, 'd').format('YYYY-MM-DD'),
    EDate: dayjs().format('YYYY-MM-DD')
  });
  const priceHistory = await getPriceHistory(query);
  const topProducts = await getTopProducts();
  return {
    props: {
      priceHistory: priceHistory,
      topProducts
    }
  };
};
