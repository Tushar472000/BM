import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getDealerSponsors } from '@/services/spot-prices';

export default function AdsSlotCarousel() {
  const [sponsors, setSponsors] = useState<
    Awaited<ReturnType<typeof getDealerSponsors>>
  >([]);
  const [error, setError] = useState('');
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');

  useEffect(() => {
    const initFetch = async () => {
      setStatus('loading');
      try {
        const res = await fetch(`/api/sponsors`);

        const isJson = res.headers
          .get('content-type')
          ?.includes('application/json');

        const data: Awaited<ReturnType<typeof getDealerSponsors>> | null =
          isJson ? await res.json() : null;

        if (!res.ok) {
          throw new Error(res.statusText);
        }

        setSponsors(data ?? []);
        setStatus('success');
      } catch (error) {
        setError((error as Error)?.message || 'Api Error');
        setStatus('error');
      }
    };

    initFetch();
  }, []);

  return (
    <>
      {status === 'error' ? (
        <p className='text-red flex h-56 w-full items-center justify-center rounded-xl bg-red-50 text-red-600 '>
          {error}
        </p>
      ) : status === 'loading' ? (
        <div className='h-56 w-full animate-pulse rounded-xl bg-gray-200'></div>
      ) : (
        <Slider
          dots={false}
          autoplay={true}
          slidesToShow={1}
          infinite
        >
          {sponsors.map((sponsor) => (
            <div key={sponsor.id}>
              <div className='relative h-56 w-full overflow-hidden rounded-xl'>
                <Image
                  src={sponsor.imageUrl}
                  alt={sponsor.name}
                  fill
                  sizes='(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw'
                  className='h-auto w-full object-cover'
                  loading='lazy'
                />
              </div>
            </div>
          ))}
        </Slider>
      )}
    </>
  );
}
