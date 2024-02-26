import { Fragment } from 'react';
import data from '../data';
import Head from 'next/head';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

const faqData = data.site.faq;
const ogTag = data.OGTags.home;
const canonicalUrl = data.WEBSITEUrl + '/faq';

const faqdata = [
  {
    question: 'What is the Bullion Mentor?',
    answer:
      "We compile a list of websites that sell gold and silver coins, compare their prices, and help you to get the Best Deal on your products in one place. Although it's time-consuming, it helps users to  choose the right product at their convenience."
  },
  {
    question: 'How Bullion Mentor Compare Prices?',
    answer:
      'Bullion Mentor keeps a track on the prices of the most popular silver, gold and Platinum Bullion Dealers. This helps all the Bullion Buyers to choose the best and the lowest price from the trusted Bullion source. We use different tools that help us to compare prices and present the Best pricing to the Bullion buyers.'
  },
  {
    question: 'How do we Decide which dealer to list?',
    answer:
      'Bullion Mentor observes all the Bullion dealers present online and keeps tracks on their customer experience and Bullion listing. We also use different parameters were we decide whether to list dealers or not.'
  },
  {
    question: 'What is Bullion Mentor Request a Product?',
    answer:
      'Request a product is an option created by Bullion Mentor were users can request a Bullion of which they want to compare pricing from the most popular dealers which will help buyers to buy the bullion at lowest premium possible.'
  },
  {
    question: 'What is the Observation List in Bullion Mentor?',
    answer:
      "Bullion Mentor created a segment named 'Observation List' were a bullion buyer can select desired bullions and add to the observation list and keep the track on the comparing prices and when the right time comes can buy the observed bullion at lowest premium."
  },
  {
    question: 'How can you get Best Deals suggestion from Bullion Mentor?',
    answer:
      "Getting best deals suggestions from Bullion Mentor is as easy as it gets. Buyer just needs to subscribe to the website and we'll provide the buyer the best deals by comparing pricing from all dealers."
  },
  {
    question: 'What is the spot price?',
    answer:
      "The spot price is the term used to describe the price at which a commodity and precious metals directly follow their spot price (moving up and down throughout the day, such as a company's stock price)."
  }
];

export default function FAQ({title , description ,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property='og:type' content={ogTag.type} />
        <meta property='og:url' content={canonicalUrl} key={canonicalUrl} />
        <link rel='canonical' href={canonicalUrl} />

        {faqdata.map((item, index) => (
          <script async defer
            key={index}
            type='application/ld+json'
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'FAQPage',

                mainEntity: [
                  {
                    '@type': 'Question',
                    name: item.question,
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: item.answer
                    }
                  }
                ]
              })
            }}
          />
        ))}
      </Head>
      <div className='z-0 text-dark-black'>
        <div className='absolute mb-96 h-20 w-full bg-gradient-to-b from-secondary-dark via-white to-white'></div>

        <div className='container mx-auto'>
          <div className='flex'>
            <div className='w-full md:w-3/4 xl:w-3/4'>
              <h1 className='semibold relative mt-7 md:mt-10 w-full pt-5 text-xl font-medium md:text-2xl'>
                FAQ
              </h1>
            </div>
          </div>
          <Fragment>
            {faqdata.map((value, i) => (
              <div className='' key={i}>
                <div className=''>
                  <div className='shadow-#808080 p-4 shadow-md'>
                    <div
                      className={
                        'z-20 border-none bg-white px-2 pb-0 text-left text-base font-semibold text-dark-black md:text-lg lg:text-lg'
                      }
                    >
                      {value.question}
                    </div>
                    <div className='z-20 bg-white px-2 pt-0 text-base  md:text-base text-slate-600'>
                      {value.answer}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Fragment>
        </div>
      </div>
    </>
  );
}


export const getServerSideProps: GetServerSideProps<{
  title: any;
  description: any;
}> = async () => {
  const title = faqData.page;
  const description = faqData.description;
  return {
    props: {
      title,
      description,
    }
  };
};
