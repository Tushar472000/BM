/* eslint-disable react-hooks/exhaustive-deps */
import { getProduct } from '@/services/product';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Image from 'next/image';
import parse from 'html-react-parser';
import CompetitorProductPrices from '@/components/product/competitorProductPrices';
import ProductSpecifications from '@/components/product/specifications';
import MobileCompetitorProductPrices from '@/components/product/mobileCompetitorProductPrices';
import TextClamper from '@/components/TextClamper';
import { addProduct } from '@/services/observations';
import { useEffect, useState } from 'react';
import useToggle from '@/hooks/useToggle';
import ObservationModal from '@/components/ModalForm/ObservationModal/ObservationModal';
import { useRouter } from 'next/router';
import ConfirmModal from '@/components/ModalForm/ConfirmLogin/ConfirmModal';
import Head from 'next/head';
import ShareModal from '@/components/ModalForm/ShareModal/shareModal';
import productUrl from '@/data';
import { AiFillInfoCircle } from 'react-icons/ai';
import { CgShare } from 'react-icons/cg';
import { useSelector } from 'react-redux';
import { selectUser } from '@/features/userSlice';

export default function ProductPage({
  title , description,
  productData
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const { data } = productData;
  const [premiumParameter, setPremiumParameter] = useState<any>();
  const [time, setTime] = useState('');
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const user = useSelector(selectUser);

  useEffect(() => {
    setTime(data.pulldate.pricePulledHours);
    setHour(data.pulldate.pricePulledHours);
    setMinute(data.pulldate.pricePulledHours);
  }, [data.pulldate.pricePulledHours]);
  useEffect(() => {
    setPremiumParameter(data.permiumParameter.premiumWeightParameter);
    console.log(`Premium Parameter ${premiumParameter}`);
  }, [data.permiumParameter]);
  const [isModalOpen, toggleModal] = useToggle();
  const [isLoginModalOpen, toggleLoginModal] = useToggle();
  const [alertState, setAlertState] = useState('error');
  const [share, setShare] = useState<any>();
  const [shareModal, toggleShareModal] = useToggle();
  const [showTooltip, setShowTooltip] = useState(false);
  const handleSubmit = async (productId: number) => {
    if (user.user.id && user.user.token) {
      const response = await addProduct(
        productId,
        user.user.id,
        user.user.token
      );
      if (response === true) {
        setAlertState('success');
        setTimeout(() => {
          toggleModal();
          router.push('/observations');
        }, 4000);
      } else if (response === false) {
        toggleModal();
        setAlertState('error');
      }
    }
  };
  useEffect(() => {
    setShare(window.location.href);
  }, [share]);
  const canonicalpProductUrl = productUrl.WEBSITEUrl + '/' + data.shortName;

  const wordCount = (str: string) => {
    return str.split(' ').length;
  };

  // get Current Date logic for Schema for 'priceValidUntil'
  const dateObject = new Date();
  let date = dateObject.toISOString();
  // -----------------------

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property='og:type' content={data.metaTitle} />
        <link rel='canonical' href={canonicalpProductUrl} />
        <meta
          property='og:image'
          content={'https://res.cloudinary.com/bullionmentor/image/upload/Images-Icons/thumbnail.webp'} // Path to your thumbnail image
        />

        {/*---------- Thumbnail code modified start*/}
        <meta name='twitter:url' content={canonicalpProductUrl} />
        <meta name='twitter:title' content={title} />
        <meta name='twitter:description' content={description} />
        <meta name='twitter:card' content='summary' />
        <meta name='twitter:image' content={data.image} />
        {/*----------- Thumbnail code modified end */}

        <link
          rel='preload'
          href='https://res.cloudinary.com/bullionmentor/image/upload/Banners/United-States-Mint_cemody.webp'
        />
        <link
          rel='preload'
          href='https://res.cloudinary.com/bullionmentor/image/upload/v1689156670/Banners/Malta-Golden-Eagle-Coin-v2_ismagp.webp'
        />
        <script
          async
          defer
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org/',
              '@type': 'Product',
              name: data.name,
              sku: data.sku,
              productId: data.productId,
              image: [data.image],
              description: data.metaDesc,
              brand: {
                '@type': 'Brand',
                name: 'Buillion Mentor'
              },
              offers: {
                '@type': 'Offer',
                url: `${
                  'https://bbdapi.bestbulliondeals.com/' +
                  data.productId +
                  '/' +
                  data.shortName
                }`,
                priceCurrency: 'USD',
                price: data.competitorProductPrices[0].priceTier1,
                priceValidUntil: date
              },
              review: []
            })
          }}
        />
      </Head>
      <div className='h-22 relative z-0 flex w-screen items-center justify-end bg-gradient-to-b from-secondary md:mb-10 lg:h-44 lg:w-full'>
        <div className='container relative mx-auto'>
          <div className='mt-10 flex gap-1 sm:gap-8 md:mt-12  lg:mt-0'>
            <div className='relative bottom-0 left-0 mt-1 h-20 w-20 flex-shrink-0 grow-0 sm:h-24 sm:w-24 md:h-36 md:w-36 lg:mt-6'>
              <Image
                fill
                className='mt-1 rounded-full object-contain lg:mt-4'
                src={data.image}
                alt={data.name}
                loading='lazy'
              />
            </div>
            <div className='px-1 text-center text-white md:mt-8 md:px-4 md:text-left lg:mt-2 lg:-ml-6 lg:pt-9'>
              <h1 className='mt-2 text-left text-sm font-bold sm:mt-6 md:mt-0 md:text-xl lg:text-xl'>
                {data.name}
              </h1>
              <div className='-mt-2 flex flex-row gap-1 sm:m-2 lg:absolute lg:top-10 lg:right-3 xl:right-7'>
                <button
                  onClick={() =>
                    user.isLoggedin === false
                      ? toggleLoginModal()
                      : handleSubmit(data.productId)
                  }
                  className='group relative mt-4 ml-[70px] inline-block w-full overflow-hidden rounded-full border-2 border-primary bg-primary  px-2 py-1 text-sm font-medium text-white hover:border-secondary sm:px-4 sm:py-2 md:px-6 md:text-sm'
                >
                  <span className='absolute top-0 left-0 mb-0 flex h-0 w-full translate-y-0 transform bg-secondary opacity-90 transition-all duration-300 ease-out group-hover:h-full '></span>
                  <span className='relative '> Add to Observation</span>
                </button>
                <button
                  className='mt-4 inline-block'
                  onClick={toggleShareModal}
                >
                  <CgShare
                    className='text-4xl text-black hover:text-white'
                    size={22}
                  />
                </button>
              </div>
              <div className='hidden h-auto w-[72%] lg:block lg:text-lg'>
                {wordCount(
                  data.shortDescription ? data.shortDescription : ''
                ) <= 29 ? (
                  <>{parse(data.shortDescription)}</>
                ) : (
                  <>{parse(data.shortDescription?.slice(0, 200)) + '...'}</>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='container relative mx-auto mt-2 mb-4 text-xs md:text-sm lg:hidden'>
        <TextClamper desc={data.shortDescription} className='lg:hidden'>
          {parse(data.shortDescription ?? '')}
        </TextClamper>
      </div>

      <div className='container mx-auto mt-[-13px] text-dark-black'>
        <div className='grid gap-8 md:py-4 lg:grid-cols-4 xl:pr-5'>
          <div className='lg:col-span-3'>
            <div className='md:flex md:items-center md:justify-between lg:-mt-8'>
              <h2 className='text-lg font-semibold md:text-xl '>
                Compare Prices
              </h2>
              <p className='flex justify-items-end text-[0.7rem] font-medium md:text-sm'>
                Prices last updated :{' '}
                <span>{data.pulldate.pricePulledHours}</span>
              </p>
              <div className='relative'>
                <p
                  className='flex text-[0.7rem] font-medium md:text-sm'
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                >
                  <AiFillInfoCircle
                    height={30}
                    width={30}
                    fill=''
                    className='h-4 w-4 pt-0 md:h-5 md:w-8'
                  ></AiFillInfoCircle>
                  Out Of Stock :{' '}
                  <span>{data.countOfoutOfStock.outOfStockCount}</span>
                </p>
                {showTooltip && (
                  <div className='absolute top-[15px] left-1/2 -mt-[4.9rem] w-80 -translate-x-1/2 transform bg-[#707575] p-2 text-xs text-white md:-translate-x-96 lg:-translate-x-1/2'>
                    Vendors with Out-of-Stock Products: Indicates the number of
                    vendors who currently do not have the product in stock.
                  </div>
                )}
              </div>
            </div>
            <div className='md:mt-4'>
              <div className='hidden md:block'>
                <CompetitorProductPrices
                  premiumParameter={premiumParameter}
                  competitors={data.competitorProductPrices}
                  productName={data.name}
                />
              </div>
              <div className='md:hidden'>
                <MobileCompetitorProductPrices
                  competitors={data.competitorProductPrices}
                  premiumParameter={premiumParameter}
                  productName={data.name}
                />
              </div>
            </div>
          </div>
          <div className='lg:block'>
            <h2 className='hidden text-lg font-semibold  md:block md:text-xl'>
              Sponsored
            </h2>
            <div className='mt-4'>
              <div className='flex w-full items-center justify-center text-2xl font-semibold'>
                <Image
                  src='https://res.cloudinary.com/bullionmentor/image/upload/v1689156670/Banners/Malta-Golden-Eagle-Coin-v2_ismagp.webp'
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
      </div>
      <div className='container mx-auto text-dark-black md:mt-4'>
        <h2 className='mt-2  text-lg font-semibold md:text-xl '>
          Product Description
        </h2>
        <div className='text-sm font-light text-slate-600 md:text-base  '>
          {parse(data.description)}
        </div>
      </div>
      <div className='container mx-auto text-dark-black md:mt-4 xl:mr-20'>
        <div className='flex grid-cols-2 flex-col gap-8 md:grid'>
          <ProductSpecifications
            specifications={data.competitorProductAttributes}
          />

          <div className='flex w-full items-center justify-center py-10 text-2xl font-semibold md:p-0'>
            <Image
              src='https://res.cloudinary.com/bullionmentor/image/upload/Banners/United-States-Mint_cemody.webp'
              alt=''
              height={500}
              width={500}
              className='rounded-lg'
              loading='lazy'
            />
          </div>
        </div>
      </div>
      {isModalOpen && (
        <ObservationModal closeModal={toggleModal} alertState={alertState} />
      )}
      {isLoginModalOpen && (
        <ConfirmModal
          productId={data.productId}
          closeModal={toggleLoginModal}
        />
      )}
      {shareModal && (
        <ShareModal
          shareUrl={share}
          closeModal={toggleShareModal}
          productName={productData.data.name}
          p1={`Hey there,\n`}
          p2={`Find UNBEATABLE PRICES for the ${productData.data.name} from REPUTABLE DEALERS now!\n`}
        />
      )}
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{
  title: any;
  description: any;
  productData: Awaited<ReturnType<typeof getProduct>>;
}> = async ({ params }) => {
  let product;
  if (params && params.slug) {
    product = await getProduct(params.slug as string);
  }
  if (product && product.data && product.success) {
    const title = product.data.metaTitle ;
    const description = product.data.metaDesc ;
    return {
      props: {
        title , description,
        productData: product
      }
    };
  }
  return {
    redirect: {
      destination: '/404',
      permanent: false
    }
  };
};
