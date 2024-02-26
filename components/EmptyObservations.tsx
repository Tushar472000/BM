import useToggle from '@/hooks/useToggle';
import ConfirmModal from './ModalForm/ConfirmLogin/ConfirmModal';
import Head from 'next/head';
import data from '@/data';
import AddProductModal from './ModalForm/AddProductModal/AddProductModal';
import Image from 'next/image';
import { Button } from '@material-tailwind/react';
import { useSelector } from 'react-redux';
import { selectUser } from '@/features/userSlice';

export default function EmptyObservations({ products }: any) {
  const observationData = data.site.observation;
  const ogTag = data.OGTags.home;
  const canonicalUrl = data.WEBSITEUrl + '/observations';
  const [isLoginModalOpen, toggleLoginModal] = useToggle();
  const [productModal, toggleProductModal] = useToggle();
  const user = useSelector(selectUser);
  return (
    <>
      <Head>
        <title>{observationData.page}</title>
        <link rel='canonical' href={canonicalUrl} />
        <link
          rel='preload'
          as='image'
          href='https://res.cloudinary.com/bullionmentor/image/upload/Images-Icons/no-products_ydi7jw.webp'
        />
      </Head>
      <div className='rounded-lg p-2 shadow-md lg:mx-32'>
        <div className='hidden h-32 justify-center rounded bg-white bg-opacity-60 sm:h-40 md:block md:h-60'>
          <Image
            src='https://res.cloudinary.com/bullionmentor/image/upload/Images-Icons/no-products_ydi7jw.webp'
            className='h-full w-full object-fill'
            alt='Banner'
            height={400}
            width={1000}
          />
        </div>
        <div className='flex h-32 justify-center rounded bg-white bg-opacity-60 sm:h-40 md:hidden md:h-60'>
          <Image
            src='https://res.cloudinary.com/bullionmentor/image/upload/Images/no-products-mob.webp'
            className='h-full w-full object-fill'
            alt='Banner'
            height={400}
            width={800}
          />
        </div>
        <div className='mt-2 flex flex-col gap-1 px-2 py-4 pb-4 text-center text-sm text-dark-black md:pb-10'>
          <p className='font-size:1.5rem font-semibold'>Hey There,</p>
          <p className='font-size:1rem font-semibold'>
            No products are added in Observation List!
          </p>
          <p className='font-size:1rem'>
            Observation list help you to keep a track on the price of the
            products you are most interested in
          </p>
          <Button
            onClick={() =>
              user.isLoggedin === false
                ? toggleLoginModal()
                : toggleProductModal()
            }
            className='group relative mx-auto mt-2 inline-block w-fit overflow-hidden rounded-full  bg-primary px-3 py-2  text-sm font-normal text-white'
          >
            <span className='absolute top-0 left-0  mb-0 flex h-0 w-full translate-y-0 transform bg-secondary opacity-90 transition-all duration-300 ease-out group-hover:h-full '></span>
            <span className='relative '>Add Products</span>
          </Button>
        </div>
        {isLoginModalOpen && <ConfirmModal closeModal={toggleLoginModal} />}
        {productModal && (
          <AddProductModal
            closeModal={toggleProductModal}
            products={products}
          />
        )}
      </div>
    </>
  );
}
