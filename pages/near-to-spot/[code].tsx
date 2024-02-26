import MiscSkeleton1 from '@/components/Loaders/Misc1/MiscSkeleton1';
import TopProductItem from '@/containers/home/TopProductItem';
import data from '@/data';
import { GetTopProductsBy } from '@/interfaces/typeinterfaces';
import { getTopProducts} from '@/services/spot-prices';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import { Suspense, useEffect, useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoGridSharp } from 'react-icons/io5';
import Image from 'next/image';

export default function NearToSpot({
  title , description ,  searchKeyword,
  topProducts
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [view, setView] = useState<'detailed' | 'grid'>('grid');
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, [topProducts]);
  const itemListElement = topProducts.homePageProductDetails.map((product: any, index: number) => (
    {
      "@type" : "ListItem",
      "position": index + 1, 
      "url": "https://www.bullionmentor.com/" + product.shortName
    }
  ))
  const trendingProductsSchema = {
 
        "@context" : "https://schema.org",
        "@type":"ItemList",
        "itemListElement": itemListElement
     
  }
   
  return (
    <>
      {/* ******************** SEO CONTENT ******************** */}
      <Head>
        <title>{title}</title>
        <meta property='og:type' content={data.OGTags.home.type} />
        <meta
          property='og:url'
          content={`${process.env.WEBSITE_URL}/near-to-spot/${searchKeyword}`}
          key={`${process.env.WEBSITE_URL}/near-to-spot/${searchKeyword}`}
        />
        <link
          rel='canonical'
          href={`${process.env.WEBSITE_URL}/near-to-spot/${searchKeyword}`}
        />
        <link rel="preload" as='image' href="https://res.cloudinary.com/bullionmentor/image/upload/Banners/Royal-Canadian-Mint_xqgsz4.webp" />
        <link rel="preload" as='image' href="https://res.cloudinary.com/bullionmentor/image/upload/v1689165092/Banners/Canadian-Maple-Leaf_c1juxl.webp" />
        <link rel="preload" as='image' href="https://res.cloudinary.com/bullionmentor/image/upload/Banners/Bullion-Mentor-motive_anp3hj.webp" />
        <script async
          defer
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(trendingProductsSchema) }} 
                   key='product-jsonld'></script>
      </Head>
      {/* ******************** GRADIENT ******************** */}
      <div className='bg-gradient-to-b from-secondary via-white to-white text-dark-black'>
        <div className='container mx-auto md:mt-2 lg:mt-1  py-8'>
          <h1 className='mb-2 mt-3 text-lg font-bold md:text-xl lg:mt-0'>
            Explore the best prices of bullion with Bullion Mentor
          </h1>
          <p
            className='text-xs md:text-base text-slate-600'
            dangerouslySetInnerHTML={{ __html: topProducts.homepagecontent.seoContent }}
          ></p>
        </div>
      </div>
      {hydrated === true ? (
        <div className='container mx-auto text-dark-black'>
         
          <div className='flex flex-col gap-2 md:grid md:grid-cols-5'>
            {/* ******************** LEFT ADVERTISEMENT ******************** */}
            <div className='flex-col gap-4 lg:flex md:h-fit md:sticky md:top-32'>
              <div className='flex w-full items-center justify-center rounded-md '>
                <Image
                  src='https://res.cloudinary.com/bullionmentor/image/upload/Banners/Silver-Coins_gxr8un.webp'
                  alt=''
                  height={350}
                  width={350}
                  className='rounded-lg'
                  loading='lazy'
                />
              </div>
              <div className='flex  w-full items-center justify-center rounded-md'>
                <Image
                  src='https://res.cloudinary.com/bullionmentor/image/upload/v1689165092/Banners/Canadian-Maple-Leaf_c1juxl.webp'
                  alt=''
                  height={350}
                  width={350}
                  className='rounded-lg pt-4 lg:pt-0'
                  loading='lazy'
                />
              </div>
            </div>
            {/* ******************** PAGE CONTENT ******************** */}
            <div className='col-span-3 mx-0 grow gap-0 lg:mx-4 lg:gap-4'>
              {/* ******************** VIEW TOGGLE BUTTONS ******************** */}
              <div className='mb-4 hidden justify-end gap-6 md:flex'>
                {/* ******************** DETAIL VIEW BUTTON ******************** */}
                <button
                  onClick={() => setView('detailed')}
                  className={`flex items-center gap-2 px-4 py-2 ${view === 'detailed'
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
                  className={`flex items-center gap-2 px-4 py-2 ${view === 'grid'
                    ? 'rounded-md bg-primary text-white'
                    : 'bg-white'
                    }`}
                >
                  <IoGridSharp size={25} />
                  <span>Grid View</span>
                </button>
              </div>
              {/* ******************** PRODUCT LIST ******************** */}
              <Suspense>
                <div
                  className={`grid  gap-4 ${view === 'detailed'
                    ? 'grid-cols-1 xl:grid-cols-2'
                    : 'grid-cols-2 xl:grid-cols-3'
                    }`}
                >
                  {topProducts.homePageProductDetails.map((product: any) => (
                    <TopProductItem
                      view={view}
                      key={product.productId}
                      {...product}
                    />
                  ))}
                </div>
              </Suspense>
            </div>
            {/* ******************** RIGHT ADVERTISEMENT ******************** */}
            <div className='flex-col gap-4 md:flex pt-6 lg:pt-0  md:h-fit md:sticky md:top-32'>
              <div className='flex  w-full items-center justify-center rounded-md'>
                <Image
                  src='https://res.cloudinary.com/bullionmentor/image/upload/Banners/Bullion-Mentor-motive_anp3hj.webp'
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
      ) : (
        <MiscSkeleton1 />
      )}
    </>
  );
}


export const getServerSideProps: GetServerSideProps = async ({ query, res }) => {
  // Extracting query parameters
  let getBy = query.getBy as GetTopProductsBy | undefined;
  const searchKeyword = query.code;
  getBy = 'NearToSpot';
  // Setting cache control header
  res.setHeader(
    'Cache-control',
    'public, sa-maxage=10, state-while-revalidate=59'
  );

  try {
    const response = await fetch(`${process.env.BASE_URL}/api/BestBullionDeals/GetHomePageProductsByLocation?GetBy=${getBy}&MetalType=${searchKeyword}`);
    if (!response.ok) {
      throw new Error('Failed to fetch data');  
    }
    
    const res = await response.json();

    const title = res.data.homepagecontent.metaTitle ;
    const description = res.data.homepagecontent.metaDesc ;
    const topProducts = res.data;
    
    return {
      props: {
        title,
        description,
        searchKeyword,
        topProducts
      }
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        title: '',
        description: '',
        topProducts: []
      }
    };
  }
};
