/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/inline-script-id */
/* eslint-disable @next/next/no-script-in-head */
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import { Suspense, useEffect, useState } from 'react';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getMaintainance, getTopProducts } from '@/services/spot-prices';
import { GetTopProductsBy } from '@/interfaces/typeinterfaces';
import data from '@/data';
import { GoFlame } from 'react-icons/go';
import useToggle from '@/hooks/useToggle';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoGridSharp } from 'react-icons/io5';
import dynamic from 'next/dynamic';

import DashboardCarousel from '@/components/DashboardCarousel';
import DashboardSkeleton from '@/components/Loaders/Dashboard/DashboardSkeleton';
import TopProductItem from '@/containers/home/TopProductItem';
import DashboardImages from '@/services/DashboardImages';
import { GridViewSkeleton } from '@/components/Loaders/Grid/GridViewSkeleton';
import SubscribeModal from '@/components/ModalForm/Subscribe/SubscribeModal';
import { useDispatch, useSelector } from 'react-redux';
import { isVisited, selectUser } from '@/features/userSlice';
// -------------------------- Dynamic import -------------------//
const RequestProductModal = dynamic(
  () => import('@/components/ModalForm/RequestProduct/RequestProductModal')
);
const DescText = dynamic(
  () => import('@/components/HomePageComponents/DescText')
);
const Search = dynamic(() => import('@/components/Search'));

export default function Home({
  title,
  description,
  topProducts
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [view, setView] = useState<'detailed' | 'grid'>('grid');
  const [isRequestModal, toggleRequestModal] = useToggle();
  const [isSubscribeModal, toggleSubscribeModal] = useToggle();
  const [hydrated, setHydrated] = useState(false);
  const [dynamicImages, setDynamicImages] = useState<any>();
  const [staticImage, setStaticImage] = useState<any>();
  useEffect(() => {
    
    check();
    const dashboardImages = DashboardImages();
    setDynamicImages(
      dashboardImages.filter((image) => image.isStatic === false)
    );
    setStaticImage(dashboardImages.find((image) => image.isStatic === true));
    setHydrated(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  useEffect(() => {
    if (user.hasVisited === false) {
      setTimeout(() => {
        toggleSubscribeModal();
        dispatch(isVisited(true));
      }, 6000);
    }
  }, []);
  const homePageSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Bullion Mentor',
    url: 'https://www.bullionmentor.com/',
    logo: 'https://res.cloudinary.com/bold-pm/image/upload/BBD/BM-logo.webp'
  };
  const itemListElement = topProducts.homePageProductDetails.map(
    (product: any, index: number) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: 'https://www.bullionmentor.com/' + product.shortName
    })
  );
  const trendingProductsSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: itemListElement
  };
  return (
    <>
      <Head>
        <title>{title}</title>
        {/*---------- Thumbnail code modified start*/}
        <meta name='twitter:url' content={`${process.env.WEBSITE_URL}`} />
        <meta name='twitter:title' content={title} />
        <meta name='twitter:description' content={description} />
        <meta name='twitter:card' content='summary' />
        <meta
          name='twitter:image'
          content={
            'https://res.cloudinary.com/bullionmentor/image/upload/Images-Icons/thumbnail.webp'
          }
        />
        {/*----------- Thumbnail code modified end */}

        <meta property='og:type' content={data.OGTags.home.type} />
        <meta property='og:url' content={`${process.env.WEBSITE_URL}`} />
        <meta
          property='og:image'
          content={
            'https://res.cloudinary.com/bullionmentor/image/upload/Images-Icons/thumbnail.webp'
          }
        />
        <link rel='canonical' href={`${process.env.WEBSITE_URL}`} />
        <script
          async
          defer
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(homePageSchema) }}
          key='product-jsonld'
        ></script>
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(homePageSchema) }}
        />
        <script
          async
          defer
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(trendingProductsSchema)
          }}
          key='product-jsonld'
        ></script>
          </Head>
      <Suspense fallback={<DashboardSkeleton />}>
        {hydrated === true ? (
          <div>
            {/* ******************** GRADIENT HEADING ******************** */}
            <section className='w-full bg-gradient-to-b from-secondary via-white to-white'>
              <div className='container relative mx-auto flex w-full flex-col items-center justify-center pt-4 pb-2'>
                {/********************* GRADIENT TEXT ******************** */}
                <div className='w-full pb-2 md:px-10 lg:px-28'>
                  <h1 className=' mt-10 text-center text-xl font-bold text-white md:text-3xl lg:mt-0'>
                    A Catalyst in Bullion World
                  </h1>
                  <p className='mt-0.5 text-center text-xs font-semibold text-white md:text-sm lg:text-base'>
                    We monitor bullion market sales events & inform consumers of
                    the excellent ones. Compare and keep track of bullion
                    prices..
                  </p>
                </div>
                {/* ******************** SEARCH COMPONENT ******************** */}
                <div className='md:hidden md:w-2/3'>
                  <Search />
                </div>
              </div>
              {/* ******************** HERO IMAGES ******************** */}
              <section className='mx-auto grid-cols-3 gap-4 md:container md:grid'>
                {/********************* CAROUSEL IMAGES *********************/}
                <div className='col-span-2'>
                  <DashboardCarousel images={dynamicImages} />
                </div>
                {/* ******************** STATIC HERO IMAGES ******************** */}
                <div className='relative hidden h-32 w-fit md:mt-2 md:block md:h-40 md:w-auto lg:h-60 xl:h-80'>
                  {staticImage?.imagePath && (
                    <Link
                      target='_blank'
                      href={staticImage.eventRedirectiveUrl}
                      passHref
                      prefetch={false}
                    >
                      <Image
                        fill
                        aria-label={staticImage.imageName}
                        className='rounded-lg object-contain  md:object-fill'
                        src={staticImage?.imagePath}
                        alt={staticImage?.imageName}
                        priority={false}
                        loading='lazy'
                      />
                    </Link>
                  )}
                </div>
              </section>
            </section>
            {/* ******************** PAGE HEADING ******************** */}
            <section className='container mx-auto mt-4 w-full text-dark-black'>
              <div className='flex grid-cols-3 flex-col-reverse gap-4 md:grid lg:grid-cols-12'>
                {/* ******************** LEFT ADVERTISEMENTS ******************** */}

                <div className='flex h-auto flex-col gap-0 lg:col-span-3'>
                  <LeftAdvertisements src='/2024-1-oz-Canadian-Gold-Maple-Leaf-Coin.jpg' />
                  <LeftAdvertisements src='/2024-American-Eagle-Coins.jpg' />
                  <LeftAdvertisements src='https://res.cloudinary.com/bullionmentor/image/upload/Banners/Majestic-Gilded-Kookaburra_cswfqg.webp' />

                  {/* ******************* GOOGLE ADS CODE GOES HERE ******************* */}

                  <div className='flex flex-col items-center'>
                    <h2 className='pt-4 text-2xl font-semibold'>Sponsored</h2>
                    <hr className='my-2 w-full' />
                    <Image
                      className='item-center h-[300px] w-[343px] cursor-pointer md:h-[250px] lg:w-[500px] xl:h-[300px] '
                      onClick={toggleRequestModal}
                      src='https://res.cloudinary.com/bullionmentor/image/upload/Images/ads-looking_fnfe0i.webp'
                      height={500}
                      width={500}
                      alt='ads'
                      priority={false}
                      loading='lazy'
                    />
                  </div>
                </div>

                {/* ******************** PRODUCT LISTING ******************** */}
                <div className='flex flex-col gap-2 md:col-span-2 lg:col-span-9'>
                  {/* ******************** PRODUCT LIST TITLE ******************** */}
                  <div className='flex w-full flex-col justify-between gap-4 lg:flex-row lg:items-center lg:gap-0'>
                    <h2 className='-mt-1 flex items-center gap-2 text-xl font-semibold md:-mt-0 md:text-2xl'>
                      <GoFlame className='text-2xl text-primary md:text-3xl' />{' '}
                      Trending Deals
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
                      {topProducts.homePageProductDetails.map(
                        (product: any) => (
                          <TopProductItem
                            view={view}
                            key={product.productId}
                            {...product}
                          />
                        )
                      )}
                    </div>
                  </Suspense>
                </div>
              </div>
            </section>
            <DescText />
            {isRequestModal && (
              <RequestProductModal closeModal={toggleRequestModal} />
            )}
            {isSubscribeModal && (
              <SubscribeModal closeModal={toggleSubscribeModal} />
            )}
          </div>
        ) : (
          <DashboardSkeleton />
        )}
      </Suspense>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{
  title: any;
  description: any;
  topProducts: Awaited<ReturnType<typeof getTopProducts>>;
}> = async ({ res, query }) => {
  const getBy = query.getBy as GetTopProductsBy | undefined;
  const searchKeyword = query.search as string | undefined;
  res.setHeader(
    'Cache-control',
    'public, sa-maxage=10, state-while-revalidate=59'
  );
  const topProducts = await getTopProducts(getBy, searchKeyword);
  const title = data.site.home.page;
  const description = data.site.home.description;
  return {
    props: {
      title,
      description,
      topProducts: topProducts
    }
  };
};

function LeftAdvertisements({ src }: any) {
  return (
    <>
      <div className='mt-4 md:mt-2'>
        <div className='flex  w-full items-center  justify-center rounded  text-2xl md:mt-0 lg:mt-0'>
          <Image
            src={src}
            height={500}
            width={500}
            priority={false}
            loading='lazy'
            alt='ads'
            className='h-[300px] w-[445px] justify-center rounded-lg md:h-[250px] lg:w-[500px] xl:h-[300px] 2xl:h-[360px]'
          />
        </div>
      </div>
    </>
  );
}
