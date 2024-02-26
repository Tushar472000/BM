import Link from "next/link";
import React from "react";

export default function aboutdata(data:string) 
{ 
  const about = [
    {
      id: 1,
      heading: 'About us',
      paragraphs: [
        <div key={1}>
          <p className='text-sm leading-5 text-slate-600 md:text-base'>
            At BullionMentor, we pride ourselves on simplifying your search for
            top-notch deals and the lowest prices on precious metals. We
            understand that finding the right dealer and price can be a daunting
            task, so we serve you with an extensive analysis of the rates and
            finest sales events of Gold and Silver Bullion from credible and
            esteemed dealers. With BullionMentor, we aim to put you in the
            driver&apos;s seat of your precious metal investments. In addition,
            you can access an exclusive feature like the Observation List and
            track prices by logging in to our platform.
          </p>
          <br />
          <p className='text-sm leading-5 text-slate-600 md:text-base'>
            With our cutting-edge technology, we scan the websites of over 20
            top online{' '}
            <Link
              href='/dealer-review'
              target='_blank'
              className='font-semibold text-blue-500'
              prefetch={false}
            >
              &nbsp;bullion dealers&nbsp;
            </Link>
            to periodically bring you the current price status for more than 100
            popular bullion products.
          </p>
          <br />
          <p className='text-sm leading-5 text-slate-600 md:text-base'>
            At BullionMentor, we cut through the noise and showcase Bullion
            prices in a transparent and streamlined manner, allowing you to
            quickly find the most affordable option for the gold or
            <Link
              href='/silver'
              target='_blank'
              className='font-semibold text-blue-500'
              prefetch={false}
            >
              &nbsp;silver bullion&nbsp;
            </Link>
            items you&apos;re looking to buy.
          </p>
          <br />
          <p className='text-sm leading-5 text-slate-600 md:text-base'>
            Our platform allows you to effortlessly browse through an array of
            excellent deals to get the most value for your hard-earned money. So
            whether you&apos;re a seasoned investor or a newcomer to the bullion
            world, we&apos;ve got you covered.
          </p>
          <br />
          <p className='text-sm leading-5 text-slate-600 md:text-base'>
            Furthermore, We recognize the value of monitoring prices and closely
            checking investment bullion. That&apos;s why we&apos;ve created a
            seamless user experience that allows you to log in and add products
            of your liking to your&nbsp;
            <Link
              href='/observations'
              target='_blank'
              className='font-semibold text-blue-500'
              prefetch={false}
            >
              observation list
            </Link>
            . This feature empowers you to stay informed and up-to-date with the
            latest prices, so you can make informed decisions and maximize your
            gains.
          </p>
          <br />
          <p className='text-sm leading-5 text-slate-600 md:text-base'>
            So join our family of savvy investors and start your journey toward
            financial prosperity today!
          </p>
        </div>
      ]
    }
  ];
  const work = [
    {
      id: 2,
      heading: 'What do we do?',
      paragraphs: [
        <div key={2}>
          <p className='text-sm leading-5 text-slate-600 md:text-base'>
            At BullionMentor, we take the hassle out of your precious metal
            investments. Our platform is your one-stop shop for finding the most
            competitive prices on bullion without the frustration of scouring
            multiple dealer websites or decoding daily price changes.
          </p>
          <br />
          <p className='text-sm leading-5 text-slate-600 md:text-base'>
            We harness the power of cutting-edge technology to provide you with
            access to the most up-to-date pricing data on over 170 popular
            bullion products and much more. Our advanced system scans more than
            20 reputable dealers, so you can be assured that you are receiving
            accurate and comprehensive information.
          </p>
          <p className='text-sm leading-5 text-slate-600 md:text-base'>
            After gathering the latest pricing data, we present the information
            in an easily comparable format. This system enables you to swiftly
            and efficiently assess which dealer offers the best deal on the
            silver or gold bullion you desire to purchase, saving you valuable
            time and effort. So whether you&apos;re in the market for American
            Silver Eagles or{' '}
            <Link
              href='/gold/gold-bars'
              target='_blank'
              className='font-semibold text-blue-500'
              prefetch={false}
            >
              gold bars
            </Link>
            , we&apos;ve got you covered.
          </p>
        </div>
      ]
    }
  ];
  return (data === 'about'? about: work)
}
export const goal = [
  {
    id: 3,
    heading: "Bullion Mentor's Goal",
    paragraphs: [
      <div key={3}>
        <p className='text-sm text-slate-600 md:text-base'>
          At{' '}
          <Link
            href='/'
            target='_blank'
            className='font-semibold text-blue-500'
            prefetch={false}
          >
            BullionMentor.com
          </Link>
          , we aim to be the premier supplier of precise and current bullion
          valuations, which allows customers to make educated buying choices.
          By furnishing live bullion pricing evaluations for precious metals,
          we enable precious metal purchasers with the aptitude to make astute
          purchasing decisions.
        </p>
        <br />
        <p className='text-sm leading-5 text-slate-600 md:text-base'>
          We want to be a one-stop platform for all things bullion, providing
          real-time retail pricing data hourly and daily, melt values, silver
          and gold spot price information, and incredible deals and top
          dealers.
        </p>
      </div>
    ]
  }
];
export const solutions = [
  {
    image:
      'https://res.cloudinary.com/bullionmentor/image/upload/Images-Icons/sales-and-discounts_ey55cj.png',
    label: 'Explore the Bullion World sales and discounts.'
  },
  {
    image:
      'https://res.cloudinary.com/bullionmentor/image/upload/Images-Icons/Compare-Prices_qz9ek2.png',
    label: 'Compare Bullion Prices'
  },
  {
    image:
      'https://res.cloudinary.com/bullionmentor/image/upload/Images-Icons/Track-Prices_qz7pq7.png',
    label: 'Track Prices by Observation List'
  },
  {
    image:
      'https://res.cloudinary.com/bullionmentor/image/upload/Images-Icons/Request-Products_xa8stt.png',
    label: 'Request Products for Price Comparison'
  }
];
export const silverCoins = [
    {
      label: '1 oz Silver',
      weight: '1-oz-silver-coins'
    },
    {
      label: '2 oz Silver',
      weight: '2-oz-silver-coins'
    },
    {
      label: '5 oz Silver',
      weight: '5-oz-silver-coins'
    },
    {
      label: '10 oz Silver',
      weight: '10-oz-silver-coins'
    }
  ];
  export const silverBars = [
    {
      label: '1 oz Silver',
      weight: '1-oz-silver-bars'
    },
    {
      label: '5 oz Silver',
      weight: '5-oz-silver-bars'
    },
    {
      label: '10 oz Silver',
      weight: '10-oz-silver-bars'
    },
    {
      label: '100 oz Silver',
      weight: '100-oz-silver-bars'
    },
    {
      label: '100 Gram Silver',
      weight: '100-gram-silver-bars'
    },
    {
      label: '250 Gram Silver',
      weight: '250-gram-silver-bars'
    },
    {
      label: '500 Gram Silver',
      weight: '500-gram-silver-bars'
    },
    {
      label: '1 Kilo Silver',
      weight: '1-kilo-silver-bars'
    }
  ];
  export const silverRounds = [
    {
      label: '1 oz Silver',
      weight: '1-oz-silver-rounds'
    },
    {
      label: '1/2 oz Silver',
      weight: '1-2-oz-silver-rounds'
    },
    {
      label: '1/4 oz Silver',
      weight: '1-4-oz-silver-rounds'
    },
    {
      label: '1/10 oz Silver',
      weight: '1-10-oz-silver-rounds'
    },
    {
      label: '2 oz Silver',
      weight: '2-oz-silver-rounds'
    },
    {
      label: '5 oz Silver',
      weight: '5-oz-silver-rounds'
    }
  ];
  export const series: {
    label: string;
    image: string;
    code: string;
  }[] = [
    {
      label: 'American Silver Eagle Coins',
      code: 'american-silver-eagle-coins',
      image:
        'https://res.cloudinary.com/bullionmentor/image/upload/Banners/silver-eagle-series_dqulyn.jpg'
    },
    {
      label: 'Canadian Silver Maple Leaf Coins',
      code: 'candian-maple-leaf-silver-coins',
      image:
        'https://res.cloudinary.com/bullionmentor/image/upload/Banners/silver-maple-series_ig4zjz.jpg'
    },
    {
      label: 'Austrian Silver Philharmonic Coins',
      code: 'austrian-philiharmonic-silver-coin',
      image:
        'https://res.cloudinary.com/bullionmentor/image/upload/Banners/silver-philharmonic-series_rwcowz.jpg'
    },
    {
      label: 'Australian Silver Kangaroo Coins',
      code: 'australian-kangaroo-silver-coin',
      image:
        'https://res.cloudinary.com/bullionmentor/image/upload/Banners/silver-kangaroo-series_l3wzqy.jpg'
    },
    {
      label: 'Perth Lunar Series III',
      code: 'australian-lunar-series-3',
      image:
        'https://res.cloudinary.com/bullionmentor/image/upload/Banners/silver-lunar-series_y7pznf.jpg'
    },
    {
      label: 'Perth Kookaburra Coins',
      code: 'australian-kookaburra-silver-coin',
      image:
        'https://res.cloudinary.com/bullionmentor/image/upload/Banners/2023-Silver-Perth-Kookaburra-1-oz-BU_qg3ajw.jpg'
    },
    {
      label: 'British Britannia Silver Coins',
      code: 'silver-britannia-coin',
      image:
        'https://res.cloudinary.com/bullionmentor/image/upload/Banners/silver-britannia-series_zoubaa.jpg'
    },
    {
      label: "Noah's Ark Silver Coin",
      code: 'noahs-ark-silver-coin',
      image:
        'https://res.cloudinary.com/bullionmentor/image/upload/Banners/2023-Armenia-Noah_s-Ark-Silver-BU-1oz_yiyqor.jpg'
    },
    {
      label: 'South African Silver Krugerrand Coins',
      code: 'silver-krugerrand-coin',
      image:
        'https://res.cloudinary.com/bullionmentor/image/upload/Banners/silver-Krugerrand-series_umvewq.jpg'
    }
  ];

 export const goldseries: {
    label: string;
    image: string;
    code: string;
  }[] = [
    {
      label: 'American Gold Eagle Coins',
      code: 'american-gold-eagle-coin',
      image:
        'https://res.cloudinary.com/bullionmentor/image/upload/Banners/gold-eagle-series_ffvnnh.jpg'
    },
    {
      label: 'Canadian Gold Maple Leaf Coins',
      code: 'canadian-gold-maple-leaf-coin',
      image:
        'https://res.cloudinary.com/bullionmentor/image/upload/Banners/gold-maple-series_rx0qzt.jpg'
    },
    {
      label: 'Austrian Gold Philharmonic Coins',
      code: 'austrian-philharmonic-gold-coin',
      image:
        'https://res.cloudinary.com/bullionmentor/image/upload/Banners/gold-philharmonic-series_epkfmv.jpg'
    },
    {
      label: 'Australian Gold Kangaroo Coins',
      code: 'australian-kangaroo-gold-coin',
      image:
        'https://res.cloudinary.com/bullionmentor/image/upload/Banners/gold-kangaroo-series_d0avp3.jpg'
    },
    {
      label: 'Perth Lunar Series III',
      code: 'perth-gold-lunar-coins',
      image:
        'https://res.cloudinary.com/bullionmentor/image/upload/Banners/gold-lunar-series_gnwqul.jpg'
    },
    {
      label: 'American Gold Buffalo Coins',
      code: 'american-buffalo-gold-coin',
      image:
        'https://res.cloudinary.com/bullionmentor/image/upload/Banners/2023-Gold-1-oz-America-Buffalo-BU_dmk47i.jpg'
    },
    {
      label: 'British Britannia Gold Coins',
      code: 'britannia-gold-coin',
      image:
        'https://res.cloudinary.com/bullionmentor/image/upload/Banners/gold-britannia-series_yatgnx.jpg'
    },
    {
      label: 'Mexican Gold Libertad Coins',
      code: 'mexican-gold-libertad-coins',
      image:
        'https://res.cloudinary.com/bullionmentor/image/upload/Banners/2022-mexico-Tenth-oz-gold-libertad-bu_efch08.jpg'
    },
    {
      label: 'South African Gold Krugerrand Coins',
      code: 'krugerrand-gold-coin',
      image:
        'https://res.cloudinary.com/bullionmentor/image/upload/Banners/gold-krugerrand-series_a7fyde.jpg'
    }
  ];

 export const goldCoins = [
    {
      label: '1 oz Gold',
      weight: '1-oz-gold-coins'
    },
    {
      label: '1/2 oz Gold',
      weight: '1-2-oz-gold-coins'
    },
    {
      label: '1/4 oz Gold',
      weight: '1-4-oz-gold-coins'
    },
    {
      label: '1/10 oz Gold',
      weight: '1-10-oz-gold-coins'
    }
  ];
  export const goldBars = [
    {
      label: '1 oz Gold',
      weight: '1-oz-gold-bars'
    },
    {
      label: '10 oz Gold',
      weight: '10-oz-gold-bars'
    },
    {
      label: '1 Gram Gold',
      weight: '1-gram-gold-bars'
    },
    {
      label: '5 Gram Gold',
      weight: '5-gram-gold-bars'
    },
    {
      label: '10 Gram Gold',
      weight: '10-gram-gold-bars'
    },
    {
      label: '50 Gram Gold',
      weight: '50-gram-gold-bars'
    },
    {
      label: '100 Gram Gold',
      weight: '100-gram-gold-bars'
    },
    {
      label: '250 Gram Gold',
      weight: '250-gram-gold-bars'
    },
    {
      label: '500 Gram Gold',
      weight: '500-gram-gold-bars'
    }
  ];