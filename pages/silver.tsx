import SilverSeries from '@/components/SilverSeries';
import Image from 'next/image';
import Link from 'next/link';
import data from '@/data';
import Head from 'next/head';
import { silverBars,silverCoins,silverRounds } from '@/services/menu';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

const silverTextCoins = {
  coins: [
    <p key={1}>
      Silver coins are not just mere pieces of metal they are a tangible
      representation of history, culture, and art.They have stood the test of
      time, enduring economic upheavals and political turmoil, and have
      consistently held their value. Possessing a silver coin is akin to owning
      a piece of the past and present while securing your financial future.
    </p>
  ],
  bars: [
    <p key={1}>
      Silver bars are the quintessential symbol of wealth and prosperity. These
      solid, gleaming bars represent a tangible investment in the future and a
      hedge against economic uncertainty.With their impressive weight and shine,
      silver bars are a physical reminder of the enduring value of this precious
      metal.
    </p>
  ],
  rounds: [
    <p key={1}>
      Silver rounds are coin-shaped silver items that are independently created by private mints. 
      They are not coins since they are not government-minted or authorized currency. 
      Many factors make silver rounds attractive, including their various size choices. 
      Silver rounds up to 10 oz are available in addition to fractional and 1 oz, 2 oz weights. 
      These intricately made rounds delight investors and collectors with high-volume manufacturing of 
      .995 to .999 fine silver, usually low mintage numbers, and attractive designs. 
      Silver rounds are a liquid asset choice that is simple to store.
    </p>
  ]
};
export default function Silver({title , description ,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      {/* ******************** SEO CONTENT ******************** */}
      <Head>
        <title>{title}</title>
        
        <meta property='og:type' content={data.OGTags.home.type} />
        <link rel='canonical' href={`${process.env.WEBSITE_URL}/silver`} />
        <meta
          property='og:image'
          content='/silver-coins.jpg' // Path to your thumbnail image
        />

        {/*---------- Thumbnail code modified start -------------*/}
        <meta
          name='twitter:url'
          content={`${process.env.WEBSITE_URL}/silver`}
        />
        <meta name='twitter:title' content={title} />
        <meta
          name='twitter:description'
          content={description}
        />
        <meta name='twitter:card' content='summary' />
        <meta name='twitter:image' content='/silver-coins.jpg' />
        {/*----------- Thumbnail code modified end -------------*/}
      </Head>
      <div className='text-dark-black'>
        {/* ******************** GRADIENT ******************** */}
        <div className='bg-gradient-to-b from-secondary via-white to-white'>
          {/* ******************** HEADING ******************** */}
          <div className='container mx-auto pt-8 md:mt-2 lg:mt-1'>
            <h1 className='mt-3 text-xl font-semibold md:text-2xl lg:mt-0'>
              Silver
            </h1>
            <p className='pt-2 text-sm text-slate-600  md:text-base'>
              Investing in silver coins and bars is an excellent method to
              diversify your portfolio and safeguard your cash from inflation.
              Silver has been used as a currency for thousands of years and
              remains a valuable and trusted asset today. Silver coins and bars
              come in a wide range of sizes and patterns, making it simple to
              choose the most suitable investment for your needs. Whether you
              are a veteran investor or just getting started, silver is a wise
              investment for anyone trying to secure their financial future.
            </p>
          </div>
        </div>
        {/* ******************** SILVER PAGE CONTENT ******************** */}
        <div className='container mx-auto'>
          {/* ******************** PRODUCT TYPE ******************** */}
          <h2 className='mt-4 text-lg font-semibold md:text-xl'>
            Product Type
          </h2>
          <div className='-mb-20 grid pt-2 md:grid-cols-6 lg:grid-cols-12'>
            {/* ******************** SILVER COINS ******************** */}
            <div className='col-span-4 md:col-span-6 lg:col-span-6'>
              <div className='h-42 col-span-4 grid sm:mr-2 md:grid-cols-6 lg:grid-cols-6'>
                {/* ******************** IMAGE CONTAINER ******************** */}
                <div className='col-span-4 md:col-span-2 lg:col-span-2'>
                  <Link
                  as={`/silver/silver-coins`}
                    href={
                      '/search?searchFrom=advanced&metal=silver&productType=coins&size=50&pageNumber=1'
                    }
                    className='relative block h-32 w-full'
                    passHref
                    prefetch={false}
                  >
                    <Image
                      src='https://res.cloudinary.com/bullionmentor/image/upload/v1679919018/Banners/silver-coins_krsix4.jpg'
                      className='rounded-lg'
                      alt={''}
                      height={210}
                      width={210}
                      loading='lazy'
                    />
                  </Link>
                </div>
                {/* ******************** TEXT REDIRECTION ******************** */}
                <div className='col-span-4 mt-4 md:col-span-4 md:mt-0 lg:col-span-4 lg:mx-auto'>
                  <h3 className='mt-8 text-sm font-semibold hover:text-primary md:mx-2 md:mt-0 md:text-lg'>
                    <Link
                    as={`/silver/silver-coins`}
                      href={
                        '/search?searchFrom=advanced&metal=silver&productType=coins&size=50&pageNumber=1'
                      }
                      passHref
                      prefetch={false}
                    >
                      Silver Coins
                    </Link>
                  </h3>
                  <div className='pt-2 pb-1 text-sm text-slate-600 md:mx-2 md:pb-0 md:text-base'>
                    {silverTextCoins.coins.map((name) => name)}
                    <h4>
                      {silverCoins.map((weight, weightIndex) => (
                        <Link
                          as={`/silver/${weight.weight}`}
                          href={`/search?searchFrom=advanced&metal=Silver&productType=Coins&itemWeight=${weight.weight}&size=50&pageNumber=1`}
                          key={weightIndex}
                          passHref
                          prefetch={false}
                        >
                          <button className='... w-35 mr-4 py-1 leading-4 text-primary underline hover:text-[#0F4463]'>
                            {weight.label}
                          </button>
                        </Link>
                      ))}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
            {/* ******************** SILVER BARS ******************** */}
            <div className='col-span-4 mt-2 md:col-span-6 md:mt-8 lg:col-span-6 lg:mt-0'>
              <div className='h-22 col-span-4 grid md:grid-cols-6 lg:grid-cols-6'>
                {/* ******************** IAMGE CONTAINER ******************** */}
                <div className='col-span-4 md:col-span-2 lg:col-span-2'>
                  <Link
                   as={`/silver/silver-bars`}
                    href={
                      '/search?searchFrom=advanced&metal=silver&productType=bars&size=50&pageNumber=1'
                    }
                    className='relative block h-32 w-full'
                    passHref
                    prefetch={false}
                  >
                    <Image
                      src='https://res.cloudinary.com/bullionmentor/image/upload/Banners/silver-bars_r9wi5b.jpg'
                      alt={''}
                      height={210}
                      width={210}
                      className='rounded-lg md:mt-0 lg:mt-0'
                      loading='lazy'
                    />
                  </Link>
                </div>
                {/* ******************** TEXT REDIRECTION ******************** */}
                <div className='col-span-4 mt-4 md:col-span-4  md:ml-2 md:mt-0 lg:col-span-4'>
                  <h3 className='mt-8 text-sm font-semibold hover:text-primary md:mt-0 md:text-lg lg:mx-auto lg:mt-0'>
                    <Link
                     as={`/silver/silver-bars`}
                      href={
                        '/search?searchFrom=advanced&metal=silver&productType=bars'
                      }
                      passHref
                      prefetch={false}
                    >
                      Silver Bars
                    </Link>
                  </h3>
                  <div className='py-2 pt-2 text-sm text-slate-600 md:text-base'>
                    {silverTextCoins.bars.map((name) => name)}
                    <h4>
                      {silverBars.map((weight, weightIndex) => (
                        <Link
                          as={`/silver/${weight.weight}`}
                          href={`/search?searchFrom=advanced&metal=Silver&productType=Bars&itemWeight=${weight.weight}&size=50&pageNumber=1`}
                          key={weightIndex}
                          passHref
                          prefetch={false}
                        >
                          <button className='... w-30 mr-4 py-1 leading-4 text-primary underline hover:text-[#0F4463]'>
                            {weight.label}
                          </button>
                        </Link>
                      ))}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
            {/* ******************** SILVER Rounds ******************** */}
            <div className='col-span-4 mt-2 md:col-span-6 md:mt-8 lg:col-span-6 lg:mt-0'>
              <div className='h-22 col-span-4 grid md:grid-cols-6 lg:grid-cols-6'>
                {/* ******************** IAMGE CONTAINER ******************** */}
                <div className='col-span-4 md:col-span-2 lg:col-span-2'>
                  <Link
                  as={`/silver/silver-rounds`}
                    href={
                      '/search?searchFrom=advanced&metal=silver&productType=rounds&size=50&pageNumber=1'
                    }
                    className='relative block h-32 w-full'
                    passHref
                    prefetch={false}
                  >
                    <Image
                      src='https://res.cloudinary.com/bullionmentor/image/upload/Banners/silver-rounds-series-banners.webp'
                      alt={''}
                      height={210}
                      width={210}
                      className='rounded-lg md:mt-0 lg:mt-0'
                      loading='lazy'
                    />
                  </Link>
                </div>
                {/* ******************** TEXT REDIRECTION ******************** */}
                <div className='col-span-4 mt-4 md:col-span-4  md:ml-2 md:mt-0 lg:col-span-4'>
                  <h3 className='mt-8 text-sm font-semibold hover:text-primary md:mt-0 md:text-lg lg:mx-auto lg:mt-0'>
                    <Link
                      href={
                        '/search?searchFrom=advanced&metal=silver&productType=rounds&size=50&pageNumber=1'
                      }
                      passHref
                      prefetch={false}
                    >
                      Silver Rounds
                    </Link>
                  </h3>
                  <div className='py-2 pt-2 text-sm text-slate-600 md:text-base'>
                    {silverTextCoins.rounds.map((name) => name)}
                    <h4>
                      {silverRounds.map((weight, weightIndex) => (
                        <Link
                          as={`/silver/${weight.weight}`}
                          href={`/search?searchFrom=advanced&metal=Silver&productType=rounds&itemWeight=${weight.weight}&size=50&pageNumber=1`}
                          key={weightIndex}
                          passHref
                          prefetch={false}
                        >
                          <button className='... w-30 mr-4 py-1 leading-4 text-primary underline hover:text-[#0F4463]'>
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
          {/* ******************** SILVER series ******************** */}
          <div className='mx-auto'>
            <h2 className='mt-24 text-lg font-semibold md:text-xl'>series</h2>
            <SilverSeries />
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
  const title = data.site.silverPage.page;
  const description = data.site.silverPage.description;
  return {
    props: {
      title,
      description,
    }
  };
};

