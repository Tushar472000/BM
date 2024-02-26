import { getDealers } from '@/services/spot-prices';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography
} from '@material-tailwind/react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import useToggle from '@/hooks/useToggle';
import { TiStarFullOutline } from 'react-icons/ti';
import ReviewModal from '@/components/ModalForm/ReviewModal/ReviewModal';
import data from '@/data';
import Head from 'next/head';

export default function DealerReview({title , description ,
  dealers
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [isOpenModalRegister, toggleModalDealersRating] = useToggle();
  return (
    <>
      {/* ******************** SEO CONTENT ******************** */}
      <Head>
        <title>{title}</title>
        <meta property='og:type' content={data.OGTags.home.type} />
        <meta
          property='og:url'
          content={`${process.env.WEBSITE_URL}/dealer-review`}
          key={`${process.env.WEBSITE_URL}/dealer-review`}
        />
        <link
          rel='canonical'
          href={`${process.env.WEBSITE_URL}/dealer-review`}
        />
        <link
          rel='preload'
          as='image'
          href='https://res.cloudinary.com/bullionmentor/image/upload/v1689160172/Infographics/Bullion-Investment-Benefits_ghwffm.webp'
        />
      </Head>
      {/* ******************** GRADIENT ******************** */}
      <div className='h-40 bg-gradient-to-b from-secondary via-white to-white'></div>
      <div className='-mt-28 flex flex-col gap-4 text-dark-black'>
        {/* ******************** HEADING ******************** */}
        <div className='container mx-auto grid grid-cols-4 md:grid-cols-10 md:gap-4 lg:grid-cols-12 '>
          {/* ******************** HEADING ******************** */}
          <div className='col-span-2 md:col-span-8 md:mt-3 lg:col-span-10 lg:mt-0'>
            <h1 className='text-xl font-medium md:text-2xl'>Dealers</h1>
          </div>
          {/* ******************** ADD REVIEW BUTTON ******************** */}
          <div className='col-span-2 flex justify-end md:col-span-2 md:mt-3 lg:col-span-2 lg:mt-0'>
            <button
              onClick={toggleModalDealersRating}
              className='group relative inline-block overflow-hidden rounded-full bg-primary px-2 py-2 font-normal text-white md:px-6 md:py-2 md:text-sm lg:px-6 lg:py-3 lg:text-sm'
            >
              <span className='absolute top-0 left-0  mb-0 flex h-0 w-full translate-y-0 transform bg-secondary opacity-90 transition-all duration-300 ease-out group-hover:h-full '></span>
              <span className='relative '>Add Review</span>
            </button>
          </div>
        </div>
        <div className='grid-col-4 container mx-auto mt-4 flex flex-col gap-4 md:grid md:grid-cols-8 lg:grid-cols-10 lg:flex-col'>
          {/* ******************** DEALERS LIST ******************** */}
          <div className='col-span-4 mt-0 md:col-span-5 md:mt-2 lg:col-span-8 lg:mt-0'>
            <div className='grid grid-cols-2 flex-col gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5'>
              {dealers.map((dealers) => (
                <div key={dealers.id}>
                  <Card
                    className='md:h-66 mx-auto mt-6 h-52 sm:h-72 md:mt-4 lg:mb-4 lg:mt-2 
                   lg:h-64'
                  >
                    <CardHeader
                      floated={true}
                      className='h-26 mx-2 -mt-2 shadow-none sm:-mt-4 sm:h-36 md:-mt-3 md:h-40 lg:-mt-7 lg:h-40'
                    >
                      <Link
                        target={'_blank'}
                        href={dealers.detailUrl}
                        passHref
                        prefetch={false}
                      >
                        <Image
                          src={dealers.image}
                          alt=''
                          className='mx-auto h-24 w-24 sm:h-32 sm:w-32 md:h-36 md:w-36 lg:h-40 lg:w-40'
                          height={400}
                          width={400}
                          loading='lazy'
                        />
                      </Link>
                    </CardHeader>
                    <CardBody className='mt-1 text-center sm:mt-1'>
                      <Typography variant='h6' color='blue-gray'>
                        <p className='text-xs underline line-clamp-1 hover:text-primary md:text-base lg:text-sm'>
                          <Link
                            target={'_blank'}
                            href={dealers.detailUrl}
                            passHref
                            prefetch={false}
                          >
                            {dealers.aliasName}
                          </Link>
                        </p>

                        <div className='mt-1 flex items-center justify-center md:mt-0 lg:mt-0'>
                          {Array.from({ length: 5 }, (value, index) => {
                            let numbers = index + 0.5;
                            return (
                              <span key={index}>
                                {dealers.rating >= index + 1 ||
                                dealers.rating >= numbers ? (
                                  <TiStarFullOutline
                                    fill='#E49E2F'
                                    className='h-4 w-4 text-yellow-500 md:h-6 md:w-6 lg:h-6 lg:w-6'
                                  />
                                ) : (
                                  <TiStarFullOutline
                                    fill='#C0C0C0'
                                    className='h-4 w-4 text-yellow-500 md:h-6 md:w-6 lg:h-6 lg:w-6'
                                  />
                                )}
                              </span>
                            );
                          })}
                        </div>

                        <p className='mt-2 h-4 text-xs font-extralight md:h-3 lg:mt-1 lg:h-6 xl:mt-2 xl:h-5 2xl:h-4'>
                          {dealers.shippingDescription}
                        </p>
                      </Typography>
                    </CardBody>
                    <CardFooter className='-mt-3 flex justify-center gap-7'>
                      <Link
                        href={`/dealer-review/${dealers.code}`}
                        as={`/dealer-review/${dealers.code}`}
                        className='group relative mt-6 inline-flex items-center overflow-hidden rounded-md  font-normal text-blue-500'
                        passHref
                        prefetch={false}
                      >
                        <div className='mt-2 w-20 rounded border-t-2 border-gray-300 md:w-24  lg:w-32'>
                          <div className='flex justify-center'></div>
                          <p className='mt-2 h-6 text-center text-xs font-semibold underline decoration-blue-500 hover:text-black hover:decoration-black sm:mt-2 md:mt-1 md:text-sm lg:mt-1 lg:text-sm'>
                            {dealers.reviewCnt} Reviews
                          </p>
                        </div>
                      </Link>
                    </CardFooter>
                  </Card>
                </div>
              ))}
            </div>
          </div>
          {/* ******************** RIGHT ADVERTISEMENTS ******************** */}
          <div className=' col-span-4 md:col-span-3 md:ml-4 md:flex lg:col-span-2 lg:ml-4'>
            <div className='mt-0 w-full  rounded-2xl md:mt-4 md:h-full lg:mt-1 '>
              <Image
                src='https://res.cloudinary.com/bullionmentor/image/upload/v1689160172/Infographics/Bullion-Investment-Benefits_ghwffm.webp'
                alt=''
                height={1000}
                width={500}
                className='rounded-lg'
                loading='lazy'
              />
            </div>
          </div>
        </div>
      </div>
      {isOpenModalRegister && (
        <ReviewModal closeModal={toggleModalDealersRating} />
      )}
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{
  title: any;
  description: any;
  dealers: Awaited<ReturnType<typeof getDealers>>;
}> = async ({ res }) => {
  res.setHeader(
    'Cache-control',
    'public, sa-maxage=10, state-while-revalidate=59'
  );
  const dealers = await getDealers();
  const title = data.site.dealerslist.page
  const description = data.site.dealerslist.description
  return {
    props: {
      title , description ,
      dealers
    }
  };
};
