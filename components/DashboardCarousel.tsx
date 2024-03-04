import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import { addProdBuyClicksLog } from '@/services/spot-prices';
import { useSelector } from 'react-redux';
import { Suspense, useEffect, useMemo, useState } from 'react';
import { selectUser } from '@/features/userSlice';
import { DashboardCarouselProps } from '@/interfaces/propsinterfaces';

export default function DashboardCarousel({ images }: DashboardCarouselProps) {
  const [productName, setProductName] = useState('');
  const [vendorName, setVendorName] = useState('');
  const [customerId, setCustomerId] = useState(0);
  const user = useSelector(selectUser);
  useEffect(() => {
    setCustomerId(user.isLoggedin ? user.user.id : 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const addProduct = async (imageForVenderId: any) => {
    await addProdBuyClicksLog(
      productName,
      vendorName,
      customerId,
      imageForVenderId
    );
  };
  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    autoplay: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <>
      <Head>
        <link rel='preload' as='image' href={images[0].mobileImageurl}></link>
        <link rel='preload' as='image' href={images[1].mobileImageurl}></link>
        <link rel='preload' as='image' href={images[0].imagePath}></link>
      </Head>
      <Suspense
        fallback={
          <section className='relative h-40 w-full bg-gray-400 sm:h-44 md:mt-2 md:h-40 lg:h-60 xl:h-80'></section>
        }
      >
        <Slider {...settings}>
          {images.map((image, index) => (
            <section key={index} aria-hidden='true'>
              <div className='relative mt-4 flex h-40 w-full overflow-hidden rounded-lg sm:h-44 sm:object-cover md:mt-2 md:h-40 lg:h-60 xl:h-80'>
                <Link
                  target='_blank'
                  href={image.eventRedirectiveUrl}
                  passHref
                  prefetch={false}
                  onClick={() => addProduct(image.imageForVenderId)}
                >
                  <Image
                    className='hidden sm:block'
                    fill
                    src={image.imagePath}
                    alt={image.imageName}
                    priority={true}
                    loading='eager'
                  />

                  <Image
                    className='block sm:hidden'
                    fill
                    src={image.mobileImageurl}
                    alt={image.imageName}
                    priority={true}
                    loading='eager'
                    quality={60}
                  />
                </Link>
              </div>
            </section>
          ))}
        </Slider>
      </Suspense>
    </>
  );
}
