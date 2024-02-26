import Image from 'next/image';
import Link from 'next/link';
import useToggle from '@/hooks/useToggle';
import Spinner from '@/components/Spinner';
import { getDealersReviews } from '@/services/spot-prices';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { TiStarFullOutline } from 'react-icons/ti';
import ReviewModal from '@/components/ModalForm/ReviewModal/ReviewModal';
import data from '@/data';
import Head from 'next/head';
import VendorReviewModal from '@/components/ModalForm/VendorReviewModals/VendorReviewModal';
import { MdLocalShipping } from 'react-icons/md';
import { FaDotCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { selectUser } from '@/features/userSlice';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Advertisement from './advertisement';

export default function VendorReview({
  title , description ,
  dealers
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const { code } = router.query;
  const vendorReviewData = data.site.vendorReview;
  const ogTag = data.OGTags.home;
  const formattedPath = router.asPath.replace(
    '/dealers-review?DealerCode=${code}',
    ''
  );
  const canonicalUrl = data.WEBSITEUrl + formattedPath;
  const [isOpenModalRegister, toggleModalDealersRating] = useToggle();
  const [isSuccessModal, toggleSuccessModal] = useToggle();
  const user = useSelector(selectUser);
  const [loading, setLoading] = useState(true);
  const [dealer, setDealer] =
    useState<Awaited<ReturnType<typeof getDealersReviews>>>();
  const [error, setError] = useState('');
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');
  useEffect(() => {
    setTimeout(() => setLoading(false));
    const initFetch = async () => {
      setStatus('loading');
      try {
        const res = await fetch(`/api/dealers-review?DealerCode=${code}`);
        const isJson = res.headers
          .get('content-type')
          ?.includes('application/json');

        const data: Awaited<ReturnType<typeof getDealersReviews>> | null =
          isJson ? await res.json() : null;
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        setDealer(data ?? undefined);
        setStatus('success');
      } catch (error) {
        setError((error as Error)?.message || 'Api Error');
        setStatus('error');
      }
    };

    initFetch();
  }, [code]);

  const wordCount = (str: string) => {
    return str.split(' ').length;
  };

  const str: any = dealer?.detailUrl;
  // -------------------------------- Url break --------------------------
  const detailUrlSlice = str?.slice(0, 30) + '...';
  const [showMore, setShowMore] = useState(false);
  const [selected, setSelected] = useState(0);
  const handleSelect = (i: number) => {
    setShowMore(!showMore);
    setSelected(i);
  };

  if (!dealer) {
    return <Spinner />;
  } else {
    return (
      <>
        <Head>
          <title>{title}</title>
          <meta property='og:type' content={ogTag.type} />
          <meta property='og:url' content={canonicalUrl} key={canonicalUrl} />
          <link rel='canonical' href={canonicalUrl} />
          <link
            rel='preload'
            href='https://res.cloudinary.com/bullionmentor/image/upload/Banners/Symbol-of-Strength-and-Liberty_nc5oki.webp'
          />
        </Head>
        <div className='w-auto'>
          <div className='mx-auto text-dark-black'>
            <div className='h-40 bg-gradient-to-b from-secondary via-white to-white'></div>
            <div className='container mx-auto -mt-40'>
              <div className='grid gap-2 text-dark-black md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-8 '>
                <div className='col-span-6 mt-10 md:col-span-6 lg:col-span-6 lg:mt-0'>
                  {/********************* Header for Desktop ******************** */}
                  <div className='hidden lg:block'>
                    <div className='grid h-24 w-auto grid-cols-8 items-center md:h-44 lg:h-52 lg:grid-cols-8 '>
                      {/* --------------------- LOGO -------------------------------- */}
                      <div className='col-span-1 flex w-full' key={dealer?.id}>
                        <Image
                          src={dealer?.image ?? ''}
                          height={123}
                          width={136}
                          alt={dealer?.image ?? ''}
                          className='mt-2 h-24 w-24 object-contain md:mt-0 md:h-52 md:w-auto md:pt-3 lg:h-48 lg:w-auto lg:pt-10'
                          loading='lazy'
                        />
                      </div>
                      {/* --------------------- DEALERS NAME -------------------------------- */}
                      <div className='col-span-3 mt-4 h-16 border-r-2 border-gray-300 text-xs md:mt-10 lg:mt-10 lg:ml-8'>
                        <div className='items-left items-left flex md:flex lg:flex'>
                          <TiStarFullOutline
                            height={15}
                            width={15}
                            fill='#E49E2F'
                            className='md:h-6 md:w-6 lg:h-6 lg:w-6'
                          />
                          <p className='pl-1 text-xs md:text-sm lg:text-base'>
                            {dealer?.rating} out of 5
                          </p>
                        </div>

                        <h2 className='pt-0 text-base font-medium md:pt-2 lg:pt-2 lg:text-2xl'>
                          {dealer?.aliasName}
                        </h2>
                      </div>
                      {/* --------------------- SHIPPING & URL -------------------------------- */}
                      <div className='col-span-3 mt-4 h-24 pl-2 text-xs md:mt-10 lg:ml-4 lg:mt-16 lg:justify-between'>
                        <div className='col-span-1 flex'>
                          <MdLocalShipping
                            height={15}
                            width={15}
                            fill=''
                            className='pt-0 md:h-6 md:w-6 lg:h-8 lg:w-8 lg:pt-2'
                          ></MdLocalShipping>
                          <h2 className='col-span-2 pt-0 text-xs md:text-sm lg:pt-2 lg:text-base'>
                            {dealer?.shippingDescription}
                          </h2>
                        </div>

                        <div className='col-span-1 flex'>
                          <FaDotCircle
                            height={10}
                            width={10}
                            fill=''
                            className='pt-0 md:h-6 md:w-6 lg:h-8 lg:w-8 lg:pt-2'
                          ></FaDotCircle>
                          <p className='col-span-2 pt-0 text-xs text-primary underline md:hidden md:pt-1 md:text-base lg:pt-2 lg:text-base'>
                            <Link
                              href={`${dealer?.detailUrl}`}
                              target='_blank'
                              passHref
                              prefetch={false}
                            >
                              {detailUrlSlice}
                            </Link>
                          </p>
                          <p className='hidden pt-0 text-xs text-primary underline hover:text-[#0F4463] md:block md:text-base lg:pt-2 lg:text-base'>
                            <Link
                              href={`${dealer?.detailUrl}`}
                              target='_blank'
                              passHref
                              prefetch={false}
                            >
                              {dealer?.detailUrl.replace(/\/+$/, '')}
                            </Link>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* ******************** Header for MV ******************** */}
                  <div className='mx-auto flex h-24 w-auto grid-cols-8 gap-4 sm:gap-5 md:h-44 md:grid-cols-8 md:gap-6 lg:hidden lg:h-52 lg:grid-cols-8 xl:grid-cols-12 '>
                    {/* --------------------- LOGO -------------------------------- */}
                    <div
                      className='col-span-2 grid xl:col-span-4'
                      key={dealer?.id}
                    >
                      <Image
                        src={dealer?.image ?? ''}
                        height={100}
                        width={100}
                        alt={dealer?.image ?? ''}
                        className='mt-2 h-24 w-24 object-contain md:mt-0 md:h-52 md:w-auto md:pt-3 lg:h-60 lg:w-64 lg:pt-10'
                        loading='lazy'
                      />
                    </div>
                    {/* --------------- DEALERS NAME, SHIPPING & URL ------------------- */}
                    <div className='col-span-6 mt-4 text-xs md:col-span-6 md:mt-10 md:w-full lg:col-span-6 lg:mt-16 lg:w-full xl:col-span-8'>
                      <div className='items-left items-left flex '>
                        <TiStarFullOutline
                          height={15}
                          width={15}
                          fill='#E49E2F'
                          className='md:h-6 md:w-6 lg:h-6 lg:w-6'
                        />
                        <p className='pl-1 text-xs md:text-sm lg:text-base'>
                          {dealer?.rating} out of 5
                        </p>
                      </div>

                      <h2 className='pt-0 text-base font-medium md:pt-2 md:text-3xl lg:pt-2 lg:text-4xl'>
                        {dealer?.aliasName}
                      </h2>

                      <h2 className='text-xs md:text-sm lg:text-base'>
                        {dealer?.shippingDescription}
                      </h2>
                      <p className='pt-0 text-xs text-primary underline md:hidden md:pt-1 md:text-base lg:pt-2 lg:text-base '>
                        <Link
                          href={`${dealer?.detailUrl}`}
                          target='_blank'
                          prefetch={false}
                        >
                          {detailUrlSlice}
                        </Link>
                      </p>
                      <p className='hidden pt-0 text-xs text-primary underline md:block md:pt-1 md:text-base lg:pt-2 lg:text-base'>
                        <Link
                          href={`${dealer?.detailUrl}`}
                          target='_blank'
                          prefetch={false}
                        >
                          {dealer?.detailUrl}
                        </Link>
                      </p>
                    </div>
                  </div>
                  {/* ******************** Review list title ******************** */}
                  <div className='mx-auto mt-4 grid grid-cols-6 gap-2 md:mt-8 md:grid-cols-10 md:gap-4 lg:mt-2 lg:grid-cols-12 lg:gap-4'>
                    <h1 className='col-span-4 text-lg font-semibold text-dark-black md:col-span-8 md:text-xl lg:col-span-10'>
                      Review List
                    </h1>
                    <button
                      className='col-span-2 rounded-full bg-primary px-2 py-2 text-xs font-normal text-white lg:hidden'
                      onClick={toggleModalDealersRating}
                    >
                      Add Review
                    </button>
                  </div>
                  {/* ******************** Review list ******************** */}
                  <div
                    className='mx-auto mt-1 grid gap-2 overflow-y-scroll md:grid-cols-6 lg:h-auto lg:grid-cols-4 py-4'
                    id='noscroll'
                  >
                    {dealer &&
                      dealer.dealerReview.slice(0).map((dealers, index) => (
                        <div
                          className={`mt-6 rounded-2xl border-gray-200 bg-white shadow-md shadow-slate-300 md:col-span-6 md:mt-8 md:w-full md:px-6 md:py-4 lg:col-span-2 lg:mt-8
                         ${dealer.dealerReview.length < 3
                              ? 'max-h-[25rem] min-h-[15rem] lg:h-min'
                              : 'max-h-[50rem] lg:h-auto'
                            } lg:px-3 lg:py-4`}
                          key={dealers.id}
                        >
                          <div className='-mt-4 ml-4 flex items-center md:-mt-8 md:ml-7 md:flex lg:ml-10 lg:flex'>
                            {Array.from({ length: 5 }, (value, index) => {
                              let numbers = index + 0.5;
                              return (
                                <span key={index}>
                                  {dealers.rating >= index + 1 ||
                                    dealers.rating >= numbers ? (
                                    <TiStarFullOutline
                                      fill='#E49E2F'
                                      className='h-8 w-8 text-yellow-500 md:h-10 md:w-10 lg:h-10 lg:w-10'
                                    />
                                  ) : (
                                    <TiStarFullOutline
                                      fill='#C0C0C0'
                                      className='h-8 w-8 text-yellow-500 md:h-10 md:w-10 lg:h-10 lg:w-10'
                                    />
                                  )}
                                </span>
                              );
                            })}
                          </div>
                          <div className='py-2 px-4 text-sm md:px-6 md:py-4 md:text-base lg:px-6 lg:py-2 lg:text-base'>
                            <p className='block font-semibold xl:hidden'>
                              {wordCount(
                                dealers.reviewHeader ? dealers.reviewHeader : ''
                              ) <= 6
                                ? dealers.reviewHeader
                                : dealers.reviewHeader?.slice(0, 33) + '...'}
                            </p>
                            <p className='hidden font-semibold md:hidden md:text-lg lg:text-lg xl:block'>
                              {dealers.reviewHeader}
                            </p>

                            <p className='hidden h-24 py-2 md:hidden lg:h-28 xl:h-24'>
                              {wordCount(
                                dealers.reviewText ? dealers.reviewText : ''
                              ) <= 29
                                ? dealers.reviewText
                                : dealers.reviewText?.slice(0, 120) + '...'}
                            </p>
                            {/* ******************** REVIEW TEXT ******************** */}
                            <span className='h-auto py-2 text-base text-gray-500 '>
                              {showMore === false && selected === 0
                                ? dealers.reviewText.slice(0, 150)
                                : showMore === true && selected === index
                                  ? dealers.reviewText
                                  : dealers.reviewText.slice(0, 150)}
                              <br />
                              {dealers.reviewText.length > 150 && (
                                <button
                                  className='text-base font-normal text-primary'
                                  onClick={() => handleSelect(index)}
                                >
                                  {showMore === false && selected === 0
                                    ? 'Read more'
                                    : showMore === true && selected === index
                                      ? 'Read less'
                                      : 'Read more'}
                                </button>
                              )}
                            </span>

                            <p className=' text-base  font-light italic text-slate-600 md:text-base lg:text-base'>
                              - {dealers.fullName}
                              ,&nbsp;
                              {new Intl.DateTimeFormat('en-US', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric'
                              }).format(new Date(dealers.createTS))}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
                {/* ******************** Advertisement ******************** */}
                <div className='col-span-6  md:col-span-6 lg:col-span-2 xl:col-span-2'>
                  <div className='top-6'>
                    {/********************* RATE A DEALER FORM ********************  */}
                    <Advertisement dealer={dealer} code={code as string} />
                    {/********************* INFOGRAPHICS ********************  */}
                    <div className='item-center mt-6 w-full  justify-center rounded-2xl  md:mt-10 lg:mt-10'>
                      <Image
                        src='https://res.cloudinary.com/bullionmentor/image/upload/Banners/Symbol-of-Strength-and-Liberty_nc5oki.webp'
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
          </div>
          {isOpenModalRegister && (
            <ReviewModal closeModal={toggleModalDealersRating} />
          )}
          {isSuccessModal && (
            <VendorReviewModal closeModal={toggleSuccessModal} />
          )}
        </div>
      </>
    );
  }
}

export const getServerSideProps: GetServerSideProps<{
  title: any;
  description: any;
  dealers: Awaited<ReturnType<typeof getDealersReviews>>;
}> = async (context) => {
  const { code } = context.params as any;
  const dealers = await getDealersReviews(code);
const title = dealers.metatitle
const description = dealers.metaDesc
  return {
    props: { title , description,
      dealers: dealers
    }
  };
};
