import Spinner from '@/components/Spinner';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getBlogDetails } from '@/services/spot-prices';
import axios from 'axios';
import data from '@/data';

const Blog = ({
  title , description ,
  blogData
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const { code } = router.query;

  const formattedPath = router.asPath.replace(`/blogs?.Title = ${code}`, '');
  const canonicalUrl = data.WEBSITEUrl + formattedPath;

  const [blogs, setblogs] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');
  const [error, setError] = useState('');

  useEffect(() => {
    setTimeout(() => setLoading(false));
    const initFetch = async () => {
      setStatus('loading');
      try {
        const res = await axios.get(
          `${
            process.env.BASE_URL
          }/api/BestBullionDeals/GetBlogDetails?Title=${code?.toString()}`
        );
        setblogs(res.data.data);
        setStatus('success');
      } catch (error) {
        setError((error as Error)?.message || 'Api Error');
        setStatus('error');
      }
    };
    initFetch();
  }, [code]);
  
  function wordCount(text: string) {
    if (text === null) {
      return 0;
    }
    return text.trim().split(/\s+/).length;
  }
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  if (!blogs) {
    return <Spinner />;
  } else {
    return (
      <>
        <Head>
          <title>{title}</title>
          <meta property='og:url' content={canonicalUrl} key={canonicalUrl} />
          <link rel='canonical' href={canonicalUrl} />
        </Head>

        <div className='grid-col container mx-auto grid h-full w-full'>
          <div className='container mx-auto mt-16 grid max-w-[1400px] grid-cols-12 gap-0 text-dark-black sm:gap-4 md:mt-10'>
            <div className='col-span-12 md:col-span-8'>
              <span className='grid-col grid gap-1'>
                <span className='h-full w-full'>
                  <Image
                    src={blogData?.image ?? ''}
                    alt={blogData?.title}
                    height={800}
                    width={800}
                    className='rounded-md lg:w-full'
                    loading='lazy'
                  />
                </span>
                {/*-------------------------- Blog Content Start --------------------- */}
                {/* ------ heading ------- */}
                <header
                  className='pt-5 text-lg font-semibold text-primary md:text-2xl md:font-medium'
                  // dangerouslySetInnerHTML={{ __html: blogs?.title }}
                >
                  <h1>{blogData?.title}</h1>
                </header>
                <section className='pt-4 text-xs font-bold italic text-[#5c5b5b]'>
                  <h6>
                    By BullionMentor on{' '}
                    {new Intl.DateTimeFormat('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    }).format(new Date(blogData.publishdate))}
                  </h6>
                </section>
                {/* ----- sub-heading and paragraph ----- */}

                <div
                  id='innerText'
                  className='pt-2 text-justify text-[0.95rem] leading-[1.4rem] text-[#5c5b5b]'
                  dangerouslySetInnerHTML={{ __html: blogData?.description }}
                >
                  
                </div>

                {/*-------------------------- Blog Content End --------------------- */}
              </span>
            </div>
            {/* --------------------- Blog Side Card------------------- */}
            <div className='col-span-12 mt-4 md:col-span-4 md:mt-0'>
              <div className='container rounded-md pb-4 shadow-md shadow-slate-300'>
                <Image
                  src={blogData?.image ?? ''}
                  alt={blogData?.title}
                  height={800}
                  width={800}
                  className='rounded-md p-4 lg:w-full'
                  loading='lazy'
                />
                <div className='px-2'>
                  <header className='text-md pt-2 font-semibold text-primary'>
                    <h5>{blogData?.title}</h5>
                  </header>
                  <section className='font-muted pt-4 text-xs font-bold italic text-[#5c5b5b]'>
                    <h6>
                      By BullionMentor on{' '}
                      {new Intl.DateTimeFormat('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      }).format(new Date(blogData.publishdate))}
                    </h6>
                  </section>
                  <p
                    className='pt-2 text-justify text-sm leading-[1.4rem] text-[#5c5b5b]'
                    dangerouslySetInnerHTML={{
                      __html:
                        blogData && wordCount(blogData?.description) <= 29
                          ? blogData?.description
                          : blogData?.description.slice(0, 500) + '...'
                    }}
                  ></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};
export default Blog;

export const getServerSideProps: GetServerSideProps<{
  title: any;
  description: any;
  blogData: Awaited<ReturnType<typeof getBlogDetails>>;
}> = async (res) => {
  const code = res.params?.code as string;
  const blogData = await getBlogDetails(code as string);
  const title = blogData.metatitle;
  const description = blogData.metaDescription
  return {
    props: {
      title , description ,
      blogData: blogData
    }
  };
};
