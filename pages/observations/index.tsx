import { getTopProducts } from '@/services/spot-prices';
import { GetTopProductsBy } from '@/interfaces/typeinterfaces';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import data from '@/data';
import { useSelector } from 'react-redux';
import { selectUser } from '@/features/userSlice';
import { useEffect, useState } from 'react';
import { getObservations } from '@/services/observations';
import useToggle from '@/hooks/useToggle';
import Spinner from '@/components/Spinner';
import Head from 'next/head';
import Image from 'next/image';
import AddProductModal from '@/components/ModalForm/AddProductModal/AddProductModal';
import ConfirmModal from '@/components/ModalForm/ConfirmLogin/ConfirmModal';
import EmptyObservations from '@/components/EmptyObservations';
import Breadcrumbs from '@/components/breadcrumbs';
import ObservationProduct from '@/components/observations/product';

export default function ObservationList({
  title , description ,
  topProducts
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const ogTag = data.OGTags.home;
  const canonicalUrl = data.WEBSITEUrl + '/observations';
  const breadcrumbs = [
    {
      label: 'Home',
      href: '/'
    },
    {
      label: 'Observation List',
      active: true
    }
  ];
  const user = useSelector(selectUser);
  const [observations, setobservations] =
    useState<Awaited<ReturnType<typeof getObservations>>>();
  const [hydrated, setHydrated] = useState(false);
  const [isLoginModal, toggleLoginModal] = useToggle();
  const [isProductModal, toggleProductModal] = useToggle();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const display = async () => {
      if (user.isLoggedin === true && user.user.id && user.user.token) {
        const response = await getObservations(user.user.id, user.user.token);
        setobservations(response);
      }
    };
    display();
    setTimeout(() => {
      setHydrated(true);
    }, 4000);
  }, [user]);
  useEffect(() => {
    if (user.isLoggedin === false) {
      setLoading(false)
      setHydrated(true);
    } else {
      setLoading(true);
    }
  }, [user.isLoggedin])
  const handleAddProducts = () => {
    if ((observations?.length as number) > 0) {
      toggleProductModal();
    }
  };
  if (hydrated === false) {
    return (
      <div className='grid'>
        <Spinner />
      </div>
    );
  } else {
    return (
      <div className='container mx-auto flex flex-col gap-4 pt-4 text-dark-black md:pt-8'>
        {/* ******************** SEO CONTENT ******************** */}
        <Head>
          <title>{title}</title>
          <meta property='og:type' content={ogTag.type} />
          <meta property='og:url' content={canonicalUrl} key={canonicalUrl} />
          <link rel='canonical' href={canonicalUrl} />
        </Head>
        <div className='flex grid-cols-5 flex-col gap-8 md:mt-3 lg:mt-0 lg:grid'>
          <div className='col-span-4 md:mt-3'>
            {/* ******************** PAGE CONTENT ******************** */}
            {user.isLoggedin === false && loading === false ? (
              <div className='flex flex-col gap-4'>
                <h1 className='mt-10 -mb-2 text-lg font-medium md:mt-0 md:text-2xl'>
                  Observations
                </h1>
                <EmptyObservations />
              </div>
            ) :
              user.isLoggedin === false && loading === true ?
                (<Spinner />) :
                (
                  <>
                    <Breadcrumbs items={breadcrumbs} />
                    {/* ******************** OBSERVATIONS TITLE & ADD PRODUCT BUTTON ******************** */}
                    <div className='flex flex-col gap-4'>
                      <div className='mt-3 flex items-center justify-between lg:mt-0'>
                        <h1 className='text-lg font-medium md:text-2xl'>
                          {(observations?.length as number) > 0
                            ? 'Observation list'
                            : 'Observations'}
                        </h1>
                        <button
                          className={
                            (observations?.length as number) > 0
                              ? 'group relative inline-block overflow-hidden rounded-full bg-primary px-4 py-2 text-sm font-medium text-white'
                              : 'hidden'
                          }
                          onClick={handleAddProducts}
                        >
                          <span className='absolute top-0 left-0 mb-0 flex h-0 w-full translate-y-0 transform bg-secondary opacity-90 transition-all duration-300 ease-out group-hover:h-full'></span>
                          <span className='relative'>Add Products</span>
                        </button>
                      </div>
                    </div>
                    {/* ******************** OBSERVATION LIST ******************** */}
                    {(observations?.length as number) > 0 ? (
                      <div className='grid grid-cols-1 gap-4 md:grid-cols-4'>
                        {observations?.map((product: any) => (
                          <ObservationProduct
                            {...product}
                            key={product.productId}
                          />
                        ))}
                      </div>
                    ) : (
                      <EmptyObservations
                        products={topProducts.homePageProductDetails}
                      />
                    )}
                  </>
                )}
          </div>
          {/* ******************** INFOGRAPHICS ******************** */}
          <div className='flex flex-col gap-8 md:sticky md:top-0 md:h-fit'>
            <h2 className='text-xl font-medium'>Sponsored</h2>
            <div className='w-full items-center justify-center text-2xl'>
              <Image
                src='https://res.cloudinary.com/bullionmentor/image/upload/v1689160172/Infographics/Bullion-Investment-Benefits_ghwffm.jpg'
                alt=''
                height={1000}
                width={500}
                className='rounded-lg'
                loading='lazy'
              />
            </div>
          </div>
        </div>
        {isProductModal && (
          <AddProductModal
            products={topProducts.homePageProductDetails}
            closeModal={toggleProductModal}
          />
        )}
        {isLoginModal && <ConfirmModal closeModal={toggleLoginModal} />}
      </div>
    );
  }
}

export const getServerSideProps: GetServerSideProps<{
  title: any;
  description: any;
  topProducts: Awaited<ReturnType<typeof getTopProducts>>;
}> = async ({ query }) => {
  const getBy = query.getBy as GetTopProductsBy | undefined;
  const searchKeyword = query.search as string | undefined;

  const topProducts = await getTopProducts(getBy, searchKeyword);
  const title = data.site.observation.page;
  const description = data.site.observation.description;
  return {
    props: {
      title , description ,
      topProducts: topProducts
    }
  };
};
