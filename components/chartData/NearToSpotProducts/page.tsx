/* eslint-disable @next/next/link-passhref */
import { selectUser } from '@/features/userSlice';
import { ProductItem } from '@/interfaces/typeinterfaces';
import { addProdBuyClicksLog, getTopProducts } from '@/services/spot-prices';
import Link from 'next/link';
import React, { Suspense, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import TooltipStatus from '@/components/TooltipStatus';
import { toCurrency } from '@/utils/utilities';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { GridViewSkeleton } from '@/components/Loaders/Grid/GridViewSkeleton';
import TopProductItem from '@/containers/home/TopProductItem';

const NearToSpotProducts = ({
  productId,
  imageUrl,
  mobileImageurl,
  productName,
  shortName,
  competitorProductUrl,
  dealers,
  premium,
  weightCategoryParam,
  cheapestPrice,
  asLowAs,
  dealerId
}: ProductItem) => {
  imageUrl =
    imageUrl ||
    'https://res.cloudinary.com/bold-pm/image/upload/q_auto:good/Graphics/no_img_preview_product.png';
  const [tooltipStatus, setTooltipStatus] = useState(0);
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

  const addProduct = async () => {
    const response = await addProdBuyClicksLog(
      productName,
      dealers,
      customerId,
      dealerId
    );
  };
  return (
    <div
      key={productId}
      className='flex h-fit w-fit flex-col items-center rounded-[13px] pt-2 pb-3 text-sm shadow-[2px_4px_4px_rgba(0,0,0,0.2)] md:pb-4'
    >
      <div className='items-left mt-5 hidden md:block' id='Desktopview'>
        <Link href={shortName} aria-label={productName} prefetch={false}>
          <Image
            src={imageUrl}
            alt={productName ?? ''}
            width={500}
            height={500}
            className='h-20 w-20 md:h-28 md:w-28'
            priority={true}
            loading='eager'
          />
        </Link>
      </div>
      <div className='float-left mt-20 flex md:hidden' id='Mobileview'>
        <Link href={shortName} aria-label={productName} prefetch={false}>
          <Image
            src={mobileImageurl}
            alt={productName ?? ''}
            width={200}
            height={200}
            className='-mt-20 h-20 w-20'
            priority={true}
            loading='eager'
          />
        </Link>
      </div>
      <div
        onMouseEnter={() => setTooltipStatus(3)}
        onMouseLeave={() => setTooltipStatus(0)}
        className='relative mx-5 flex justify-center'
      >
        <div className='twoline mr-1 w-28 py-1'>
          <Link href={shortName} aria-label={productName} prefetch={false}>
            <h3 className=' h-10 whitespace-normal text-center text-sm font-semibold leading-5 md:mt-4 lg:h-10'>
              {productName.slice(0,25)}...
            </h3>
          </Link>
        </div>
        {tooltipStatus == 3 && (
          <TooltipStatus view='grid' productName={productName} />
        )}
      </div>
      <div className=' flex flex-col items-center px-1 text-sm md:px-2'>
        <span className='font-medium text-[#AF0E0E]'>
          Premium {toCurrency(asLowAs)}
        </span>
        <span className='font-normal text-[#656565] py-1 px-2'>
          <>{dealers ?? '-'}</>
        </span>
        <span className='h-10 px-1 text-center font-semibold text-primary md:h-9 lg:h-6'>
          As low as {toCurrency(cheapestPrice)}
        </span>

        <div className='-mt-3  w-full flex-1 items-end gap-2 px-1 text-center lg:ml-2 lg:mr-2  lg:items-center lg:px-2'>
          <div className='mt-2 ml-2 flex h-full w-24 items-center justify-center border-t-2 border-gray-300 sm:ml-4 lg:ml-0'></div>
          <div className='mt-2 w-full'>
            <div className=' justify-center'>
              <Link
                href={shortName}
                className='group relative inline-flex items-center justify-center  overflow-hidden font-semibold text-blue-500 underline decoration-blue-500 hover:underline '
                aria-label={`Compare ${productName}`}
                prefetch={false}
              >
                <button className='items-center hover:text-[#0F4463]'>
                  Compare
                </button>
              </Link>

              <div className='relative'>
                <div className='absolute mt-1 h-full border-l-2 border-gray-300'></div>
              </div>
              <Link
                target={'_blank'}
                href={competitorProductUrl}
                aria-label={`Buy ${productName}`}
                prefetch={false}
                onClick={addProduct}
                className='group relative inline-block w-full overflow-hidden rounded-full bg-primary px-2 py-1 font-medium text-white'
              >
                <span className='absolute top-0 left-0 mb-0 flex h-0 w-full translate-y-0 transform bg-secondary opacity-90  transition-all duration-300 ease-out group-hover:h-full'></span>
                <span className='relative'>Buy</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AllproductsOnSpot = () => {
  const [neartospotProducts, setNeartospotProducts] = useState<ProductItem[]>(
    []
  );
  const initFetch = async () => {
    const response = await getTopProducts('NearToSpot', '');
    return setNeartospotProducts(response.homePageProductDetails);
  };
  useEffect(() => {
    initFetch();
  }, []);

  const itemListElement = neartospotProducts.slice(0,6).map((product: any, index: number) => (
    {
      "@type" : "ListItem",
      "position": index + 1, 
      "url": "https://www.bullionmentor.com/charts/" + product.shortName
    }
  ))
  const trendingProductsSchema = {
 
        "@context" : "https://schema.org",
        "@type":"ItemList",
        "itemListElement": itemListElement
     
  }
  return (
    <>
    <head>
    <script async
          defer
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(trendingProductsSchema) }} 
                   key='product-jsonld'></script>
    </head>
    <div className={`grid gap-x-2 gap-y-4 md:gap-y-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 `}>          
      {neartospotProducts.filter((product: any, index: number) => index < 6
      ).map((product: any) => (
        <TopProductItem
        view={"grid"}
        key={product.productId}
        {...product}
        />
        ))}
        </div>
    </>
  );
};

export default AllproductsOnSpot;
