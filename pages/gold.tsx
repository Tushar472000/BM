import GoldSeries from '@/components/GoldSeries';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import data from '@/data';
import { goldBars,goldCoins } from '@/services/menu';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

const goldTextCoins = {
  coins: [
    <p key={1}>
      Gold coins are not just mere pieces of metal, they are a tangible
      representation of history, culture, and art.They have stood the test of
      time, enduring economic upheavals and political turmoil, and have
      consistently held their value. Possessing a gold coin is akin to owning a
      piece of the past and present while securing your financial future.
    </p>
  ],
  bars: [
    <p key={1}>
      Gold bars are the quintessential symbol of wealth and prosperity. These
      solid, gleaming bars represent a tangible investment in the future and a
      hedge against economic uncertainty.With their impressive weight and shine,
      gold bars are a physical reminder of the enduring value of this precious
      metal.
    </p>
  ]
};
export default function Gold({title , description ,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      {/* ******************** SEO CONTENT ******************** */}
      <Head>
        <title>{title}</title>
        <meta property='og:type' content={data.OGTags.home.type} />
        <meta
          property='og:url'
          content={`${process.env.WEBSITE_URL}/gold`}
          key={`${process.env.WEBSITE_URL}/gold`}
        />
        <link rel='canonical' href={`${process.env.WEBSITE_URL}/gold`} />
      </Head>
      <div className='text-dark-black'>
        {/* ******************** GRADIENT ******************** */}
        <div className='bg-gradient-to-b from-secondary via-white to-white'>
          {/* ******************** HEADING ******************** */}
          <div className='container mx-auto pt-8  md:mt-2 lg:mt-1'>
            <h1 className='mt-3 text-xl font-semibold md:text-2xl lg:mt-0'>
              Gold
            </h1>
            <p className='pt-2 text-sm text-slate-600 md:text-base'>
              Investing in gold coins and bars is an excellent method to
              diversify your portfolio and safeguard your cash from inflation.
              Gold has been used as a currency for thousands of years and
              remains a valuable and trusted asset today. Gold coins and bars
              come in a wide range of sizes and patterns, making it simple to
              choose the most suitable investment for your needs. Whether you
              are a veteran investor or just getting started, gold is a wise
              investment for anyone trying to secure their financial future.
            </p>
          </div>
        </div>
        {/* ******************** GOLD PAGE CONTENT ******************** */}
        <div className='container mx-auto'>
          {/* ******************** PRODUCT TYPE ******************** */}
          <h2 className='mt-4 text-lg font-semibold md:text-xl'>
            Product Type
          </h2>
          <div className='-mb-20 grid pt-2 md:grid-cols-6 lg:grid-cols-12'>
            {/* ******************** GOLD COINS ******************** */}
            <div className='col-span-4 md:col-span-6 lg:col-span-6'>
              <div className='h-42 col-span-4 grid sm:mr-2 md:grid-cols-6 lg:grid-cols-6'>
                {/* ******************** IMAGE CONTAINER ******************** */}
                <div className='col-span-4 md:col-span-2 lg:col-span-2'>
                  <Link
                   as={`/gold/gold-coins`}
                    href={
                      '/search?searchFrom=advanced&metal=gold&productType=coins&size=50&pageNumber=1'
                    }
                    className='relative block h-32 w-full'
                    passHref
                    prefetch={false}
                  >
                    <Image
                      src='https://res.cloudinary.com/bullionmentor/image/upload/Banners/gold-coins_ngiymn.jpg'
                      className='rounded-lg'
                      alt={''}
                      height={210}
                      width={210}
                      loading='lazy'
                    />
                  </Link>
                </div>
                {/* ******************** TEXT REDIRECTION ******************** */}
                <div className='col-span-4  mt-4 md:col-span-4 md:mt-0 lg:col-span-4 lg:mx-auto'>
                  <h3 className='mt-8 text-sm font-semibold hover:text-primary md:mx-2 md:mt-0 md:text-lg'>
                    <Link
                    as={`/gold/gold-coins`}
                      href={
                        '/search?searchFrom=advanced&metal=gold&productType=coins&size=50&pageNumber=1'
                      }
                      passHref
                      prefetch={false}
                    >
                      Gold Coins
                    </Link>
                  </h3>
                  <div className='py-2 pt-2 text-sm text-slate-600 md:mx-2 md:text-base'>
                    {goldTextCoins.coins.map((name) => name)}
                    <h4>
                      {goldCoins.map((weight, weightIndex) => (
                        <Link
                          as={`/gold/${weight.weight}`}
                          href={`/search?searchFrom=advanced&metal=Gold&productType=Coins&itemWeight=${weight.weight}&size=50&pageNumber=1`}
                          key={weightIndex}
                          passHref
                          prefetch={false}
                        >
                          <button className='... w-35 mr-4 mb-2  leading-4 text-primary underline hover:text-[#0F4463]'>
                            {weight.label}
                          </button>
                        </Link>
                      ))}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
            {/* ******************** GOLD BARS ******************** */}
            <div className='col-span-4 mt-2 md:col-span-6 md:mt-8 lg:col-span-6 lg:mt-0'>
              <div className='h-42 col-span-4 grid md:grid-cols-6 lg:grid-cols-6'>
                {/* ******************** IMAGE CONTAINER ******************** */}
                <div className='col-span-4 md:col-span-2 lg:col-span-2'>
                  <Link
                   as={'gold/gold-bars'}
                    href={
                      '/search?searchFrom=advanced&metal=gold&productType=bars&size=50&pageNumber=1'
                    }
                    className='relative block h-32 w-full'
                    passHref
                    prefetch={false}
                  >
                    <Image
                      src='https://res.cloudinary.com/bullionmentor/image/upload/Banners/gold-bars_d7lubo.jpg'
                      className='rounded-lg'
                      alt={''}
                      height={210}
                      width={210}
                      loading='lazy'
                    />
                  </Link>
                </div>
                {/* ******************** TEXT REDIRECTION ******************** */}
                <div className='col-span-4 mt-4 md:col-span-4 md:ml-2  md:mt-0 lg:col-span-4'>
                  <h3 className='mt-8 text-sm font-semibold hover:text-primary md:mt-0 md:text-lg lg:mx-auto lg:mt-0 '>
                    <Link
                      as={`/gold/gold-bars`}
                      href={
                        '/search?searchFrom=advanced&metal=gold&productType=bars&size=50&pageNumber=1'
                      }
                      passHref
                      prefetch={false}
                    >
                      Gold Bars
                    </Link>
                  </h3>
                  <div className='py-2 pt-2 text-sm text-slate-600 md:text-base'>
                    {goldTextCoins.bars.map((name) => name)}
                    <h4>
                      {goldBars.map((weight, weightIndex) => (
                        <Link
                          as={`/gold/${weight.weight}`}
                          href={`/search?searchFrom=advanced&metal=Gold&productType=Bars&itemWeight=${weight.weight}&size=50&pageNumber=1`}
                          key={weightIndex}
                          passHref
                          prefetch={false}
                        >
                          <button className='... w-30 mr-4 mb-2 leading-4 text-primary underline hover:text-[#0F4463] '>
                            {weight.label}
                          </button>
                        </Link>
                      ))}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* ******************** GOLD series ******************** */}
          <div className='mx-auto'>
            <h2 className='mt-24 text-lg font-semibold md:text-xl'>series</h2>
            <GoldSeries />
          </div>
        </div>
      </div>
    </>
  );
}


export const getServerSideProps: GetServerSideProps<{
  title: any;
  description: any;
}> = async () => {
  const title = data.site.goldPage.page;
  const description = data.site.goldPage.description;
  return {
    props: {
      title,
      description,
    }
  };
};
