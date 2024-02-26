import Image from 'next/image';
import aboutdata from '@/services/menu';
import { solutions, goal } from '@/services/menu';
import {
  Card,
  CardHeader,
  CardBody,
  Typography
} from '@material-tailwind/react';
import data from '@/data';
import Head from 'next/head';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

export default function About({title , description ,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const about = aboutdata('about');
  const work  = aboutdata('work');
  const aboutData = data.site.about;
  const ogTag = data.OGTags.home;
  const canonicalUrl = data.WEBSITEUrl + '/about';
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property='og:type' content={ogTag.type} />
        <meta property='og:url' content={canonicalUrl} key={canonicalUrl} />
        <link rel='canonical' href={canonicalUrl} />=
      </Head>
      <div className='text-dark-black'>
        <div className='absolute mb-96 h-20 w-full bg-gradient-to-b from-secondary-dark via-white to-white'></div>
        <div className='container mx-auto mb-5'>
          <div className='flex'>
            <div className='w-full md:w-3/4 xl:w-3/4'>
              {about.map((value, i) => (
                <div key={value.id}>
                  <h1 className='semibold relative mt-7 w-full pt-5 text-xl font-medium md:mt-10 md:text-2xl'>
                    {value.heading}
                  </h1>
                  <div className='mt-5 text-sm leading-3 md:text-sm lg:text-base'>
                    {value.paragraphs.map((paragraphs) => paragraphs)}
                  </div>
                </div>
              ))}
            </div>
            <div className='mt-24 hidden w-1/4 md:block lg:mt-16 xl:inline-grid xl:pl-8'>
              <Image
                src='https://res.cloudinary.com/bullionmentor/image/upload/Images-Icons/About-us_qathx6.png'
                alt={''}
                height={250}
                width={250}
                className=''
                loading='lazy'
              ></Image>
            </div>
          </div>
        </div>{' '}
        <div>
        <div className='mt-2 bg-center bg-cover object-contain md:object-scale-down lg:mt-4' style={{backgroundImage: "url('https://res.cloudinary.com/bullionmentor/image/upload/Images/goals-bg1_tkpzh5.webp')"}}>
  <div className='container mx-auto flex'>
    <div className='md:3/6 mt-5 mb-10 w-[100%] sm:w-[62%]'>
      {work.map((value, i) => (
        <div key={value.id}>
          <h3 className='semibold mt-1 text-xl font-medium md:mt-5 md:text-xl'>
            {value.heading}
          </h3>
          <div className='mt-5 text-sm md:text-sm lg:text-base'>
            {value.paragraphs.map((paragraphs) => paragraphs)}
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

          <div className='container mx-auto my-2'>
            <div className='mt-4 text-center lg:mt-4 '>
              {goal.map((value) => (
                <div key={value.id}>
                  <h4 className='semibold mt-4 text-xl font-medium md:mt-10 md:text-2xl'>
                    {value.heading}
                  </h4>
                  <div className='mt-5 text-sm md:text-sm lg:text-base'>
                    {value.paragraphs.map((paragraphs) => paragraphs)}
                  </div>
                </div>
              ))}
            </div>
            <h3 className='semibold mt-4 text-center text-xl font-medium md:mt-10 md:text-2xl'>
              Our solutions
            </h3>
            <div className='mt-4 grid grid-cols-4 gap-6 lg:grid-cols-6 lg:gap-12 xl:grid-cols-12'>
              {solutions.map((value) => (
                <div className='col-span-2 xl:col-span-3' key={value.label}>
                  <Card className='sm:h-45 lg:w-4/4 h-44 w-auto px-1 pb-1 lg:h-44'>
                    <CardHeader
                      floated={false}
                      className='mx-auto mt-4 rounded-full shadow-none md:mt-3'
                    >
                      <Image
                        src={value.image}
                        alt={''}
                        height={80}
                        width={80}
                        className='md:h-24 md:w-auto'
                        loading='lazy'
                      />
                    </CardHeader>
                    <CardBody className='mt-0 text-center sm:mt-5'>
                      <Typography
                        variant='h6'
                        color='blue-gray'
                        className=' text-sm font-medium md:text-sm'
                      >
                        {value.label}
                      </Typography>
                    </CardBody>
                  </Card>
                </div>
              ))}
            </div>
            <h5 className='-mb-2 pt-12 text-center text-lg font-medium'>
              Say goodbye to the headache of bullion shopping, and say hello to
              BullionMentor!
            </h5>
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
  const title = data.site.about.page;
  const description = data.site.about.description;
  return {
    props: {
      title,
      description,
    }
  };
};
