import Link from 'next/link';
import { Suspense } from 'react';
import { featCardProps
 } from '@/interfaces/typeinterfaces';
export default function DescText() {
  const arr = [
    {
      id: 1,
      title: 'Comprehensive Price Comparison',
      description: [
        <p key={1}>
          Easily compare prices of bullion coins, bars, and rounds from various
          trusted dealers to find the best deals available.
        </p>
      ]
    },
    {
      id: 2,
      title: 'Personalized Observation List',
      description: [
        <p key={2}>
          Create your own{' '}
          <Link
            href='/observations'
            target='_blank'
            className='font-medium text-blue-500 decoration-2 underline-offset-4 hover:underline'
            prefetch={false}
          >
            Observation list
          </Link>{' '}
          to monitor specific bullion products of interest, enabling you to
          track their prices and market movement closely.
        </p>
      ]
    },
    {
      id: 3,
      title: 'Extensive Catalog',
      description: [
        <p key={3}>
          Explore an extensive catalog with a diverse selection of{' '}
          <Link
            href='/gold'
            target='_blank'
            className='font-medium text-blue-500 decoration-2 underline-offset-4 hover:underline'
            prefetch={false}
          >
            Gold
          </Link>
          ,{' '}
          <Link
            href='/silver'
            target='_blank'
            className='font-medium text-blue-500 decoration-2 underline-offset-4 hover:underline'
            prefetch={false}
          >
            Silver
          </Link>
          , and other precious metals, ensuring you have a wide range of options
          to choose from.
        </p>
      ]
    },
    {
      id: 4,
      title: 'User-Friendly Interface',
      description: [
        <p key={4}>
          Enjoy a user-friendly platform that makes navigating and searching for
          specific bullion products quick and effortless.
        </p>
      ]
    },
    {
      id: 5,
      title: 'Dealer Reviews and Ratings',
      description: [
        <p key={5}>
          Benefit from comprehensive dealer reviews and ratings from fellow
          users to make confident and reliable purchasing decisions.
        </p>
      ]
    }
  ];
  return (
    <Suspense>
      <section className='container mx-auto '>
        <p className='mt-8 text-lg font-semibold text-dark-black md:text-xl'>
          Welcome to BullionMentor!
          <br />
        </p>
        <p className='text-xs text-gray-500 md:text-base '>
          Your Price Comparison Expertise for Bullion Investments.
        </p>
        <p className='text-xs text-gray-500 md:text-base'>
          By comparing prices and professional insights, you can take control of
          your bullion assets. With our cutting-edge technology, you&apos;ll
          receive the best deal from{' '}
          <Link
            href='/dealer-review'
            target='_blank'
            className='font-medium text-blue-500 decoration-2 underline-offset-4 hover:underline'
            prefetch={false}
          >
            Reputable Dealers
          </Link>{' '}
          based on real-time quotes. Explore our comprehensive listings and
          discover the most competitive prices on precious metals, all in one
          convenient place.
        </p>
        <br />
        <p className='text-lg font-semibold text-dark-black md:text-xl'>
          Key features
          <br />
        </p>
        <div className='mt-3 grid grid-cols-1 gap-x-4 gap-y-6 lg:grid-cols-2'>
          {arr.map((values: any, index: number) => {
            return (
              <FeatCard
                title={values.title}
                description={values.description}
                key={index}
              />
            );
          })}
        </div>
        <p className='pt-3 text-xs text-gray-500 md:text-base'>
          Investing in precious metals can be stressful, but with Bullion Mentor
          ,you can effortlessly get in charge of your investments. Trust us to
          be your partner in bullion investments!
        </p>
      </section>
    </Suspense>
  );
}
export function FeatCard({ title, description }: featCardProps) {
  return (
    <div className='flex flex-col rounded-xl px-5 pb-5 leading-6 shadow-[0px_3px_3px_rgba(0,0,0,0.16)]'>
      <span className='mb-1 block h-1 w-16 bg-primary'></span>
      <span className='text-xs font-semibold text-dark-black md:text-lg'>
        {title}
      </span>
      <span className='text-xs text-gray-500 md:text-base'>{description}</span>
    </div>
  );
}
