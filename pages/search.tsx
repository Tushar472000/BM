import EmptyCard from '@/components/EmptyCard';
import TopProductItem from '@/containers/home/TopProductItem';
import { search } from '@/services/dashboard';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import { Suspense, useEffect, useState } from 'react';
import Image from 'next/image';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoGridSharp } from 'react-icons/io5';
import { GridViewSkeleton } from '@/components/Loaders/Grid/GridViewSkeleton';
import SearchSpinner from '@/components/Loaders/SearchSpinner';
import InfiniteScroll from 'react-infinite-scroll-component';

const PAGE_SIZE = 12;
export default function Search({
  title,
  description,
  products,
  query
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [canonicalUrl, setCanonicalUrl] = useState('');
  const [view, setView] = useState<'detailed' | 'grid'>('grid');
  const [hydrated, setHydrated] = useState(false);

  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(query);
  useEffect(() => {
    setSearchResults(products.data.searchProducts);
  }, [products]);
console.log(query)
  
useEffect(() => {
  performSearch(query); 
}, [query]);

const performSearch = async (newQuery: any) => {
  setLoading(true);
  try {
    const newProducts = await search(newQuery, PAGE_SIZE, 1); 
    setSearchResults(newProducts.data.searchProducts);
    setHasMore(true);
    setCurrentPage(1);
    setSearchQuery(newQuery); 
  } catch (error) {
    console.error('Error performing search:', error);
  }
  setLoading(false);
};

const loadMore = async () => {
  if (loading || !hasMore) return;

  setLoading(true);

  try {
    const nextPage = currentPage + 1;
    const newProducts = await search(searchQuery, PAGE_SIZE, nextPage);
    if (newProducts.data.searchProducts.length === 0) {
      setHasMore(false);
    } else {
      setSearchResults((prevResults) => [
        ...prevResults,
        ...newProducts.data.searchProducts
      ]);
      setCurrentPage(nextPage);
    }
  } catch (error) {
    console.error('Error loading more:', error);
  }

  setLoading(false);
};


  useEffect(() => {
    setHydrated(true);
  }, [products]);

  useEffect(() => {
    setCanonicalUrl(window.location.href.toString());
  }, []);
  return (
    <>
      {/****************** META TAGS ******************/}
      <Head>
        <title>{title}</title>
        <meta name='og:type' content={products.data.content.metaTitle} />
        <link rel='canonical' href={canonicalUrl} />
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'http://schema.org/',
              '@type': 'ItemList',
              mainEntityOfPage: {
                '@type': 'CollectionPage',
                '@id': 'https://www.bullionmentor.com/'
              },
              numberOfItems: products.data.countOfProducts.noOfItems,
              itemListElement: products.data.searchProducts.map(
                (product: any, index: number) => ({
                  '@type': 'ListItem',
                  position: index + 1,
                  item: {
                    '@type': 'Product',
                    url: 'https://www.bullionmentor.com/' + product.shortName,
                    name: product.productName,
                    description: product.shortDescription,
                    image: product.imageUrl,
                    category: [
                      product.productName,
                      'https://www.bullionmentor.com/' + product.shortName
                    ],
                    sku: product.sku,
                    weight: product.weight,
                    depth: product.depth,
                    width: product.width,
                    material: products.data.inputfields.metal,
                    brand: { '@type': 'Brand', name: 'US Mint' }
                  }
                })
              )
            })
          }}
        />

        <script
          async
          defer
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'http://schema.org',
              '@type': 'WebSite',
              url: 'https://www.bullionmentor.com/',
              potentialAction: {
                '@type': 'SearchAction',
                target: `${
                  'https://www.bullionmentor.com/search?q=' +
                  products.data.inputfields.searchKW
                }`,
                'query-input': `${
                  'required name=' + products.data.inputfields.searchKW
                }`
              }
            })
          }}
        />
      </Head>
      <div className='bg-gradient-to-b from-secondary via-white to-white text-dark-black'>
        {/******************* SEO CONTENT TOP *******************/}
        <div className='container mx-auto py-8 md:mt-2 lg:mt-1'>
          <h1 className='mb-2 mt-3 text-lg font-bold md:text-xl lg:mt-0'>
            {products.data.content.title ? products.data.content.title : ''}
          </h1>
          <h2
            id='innerText'
            className='text-sm text-slate-600  md:text-base'
            dangerouslySetInnerHTML={{
              __html: products.data.content
                ? products.data.content.seoContent
                : ''
            }}
          ></h2>
        </div>
      </div>
      {/******************* PAGE CONTENT *******************/}
      {hydrated === false ? (
        <SearchSpinner />
      ) : (
        <div className='container mx-auto text-dark-black'>
          <div className='flex flex-col gap-2 md:grid md:grid-cols-5'>
            {/******************* LEFT ADVERTISEMENT *******************/}
            <div className='flex-col gap-4 md:sticky md:top-32 md:h-fit lg:flex'>
              <div className='flex w-full items-center justify-center rounded-md '>
                <Image
                  src='https://res.cloudinary.com/bullionmentor/image/upload/Banners/Where-Beauty-Meets-Value_ig2c4a.webp'
                  alt=''
                  height={350}
                  width={350}
                  className='rounded-lg'
                  loading='lazy'
                />
              </div>
              <div className='flex  w-full items-center justify-center rounded-md'>
                <Image
                  src='https://res.cloudinary.com/bullionmentor/image/upload/Banners/United-States-Mint_cemody.jpg'
                  alt=''
                  height={350}
                  width={350}
                  className='rounded-lg pt-4 lg:pt-0'
                  loading='lazy'
                />
              </div>
            </div>
            {/******************* PAGE CONTENT *******************/}
            <div className='col-span-3 mx-0 grow gap-0 lg:mx-4 lg:gap-4'>
              {/******************* VIEW TOGGLE BUTTONS *******************/}
              <div className='mb-4 hidden justify-end gap-6 md:flex'>
                {/******************* DETAIL VIEW BUTTON *******************/}
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
                {/******************* GRID VIEW BUTTON *******************/}
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
              {/******************* PRODUCT LIST *******************/}
              <Suspense fallback={<GridViewSkeleton />}>
                {products.data.countOfProducts.noOfItems === 0 ? (
                  <EmptyCard />
                ) : (
                  <>
                    <InfiniteScroll
                      className='mb-10 overflow-hidden'
                      dataLength={searchResults.length}
                      next={loadMore}
                      hasMore={hasMore}
                      loader={<SearchSpinner />}
                      scrollThreshold={0.3} 
                    >
                      {/* Product List */}
                      <div
                        className={`grid mb-5 gap-4 ${
                          view === 'detailed'
                            ? 'grid-cols-1 xl:grid-cols-2'
                            : 'grid-cols-2 xl:grid-cols-3'
                        }`}
                      >
                        {searchResults.map((product: any) => (
                          <TopProductItem
                            view={view}
                            key={product.productId}
                            {...product}
                          />
                        ))}
                      </div>
                    </InfiniteScroll>
                  </>
                )}
              </Suspense>
            </div>
            {/******************* RIGHT ADVERTISEMENT *******************/}
            <div className='flex-col gap-4 pt-6 md:sticky md:top-32  md:flex md:h-fit lg:pt-0'>
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
      )}
      {/******************* SEO CONTENT BOTTOM *******************/}
      <div
        className={`text-justify' container mx-auto mt-10  text-sm text-slate-600 md:mt-5  md:text-base`}
      >
        <span
          id='innerText'
          dangerouslySetInnerHTML={{
            __html: products.data.content.seoContentBottom
              ? products.data.content.seoContentBottom
              : ''
          }}
        ></span>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{
  title: any;
  description: any;
  products: Awaited<ReturnType<typeof search>>;
  query: any;
}> = async ({ query }) => {
  let nextPage = 1;
  const products = await search(query, PAGE_SIZE, nextPage);
  const title = products.data.content.metaTitle;
  const description = products.data.content.metaDesc;
  return {
    props: {
      title,
      description,
      products,
      query
    }
  };
};
