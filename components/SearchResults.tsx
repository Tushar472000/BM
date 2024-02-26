import Image from 'next/image';
import Link from 'next/link';
import { forwardRef, Ref, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { IoIosPricetags } from 'react-icons/io';
import { BiCart } from 'react-icons/bi';
import useToggle from '@/hooks/useToggle';
import RequestProductModal from './ModalForm/RequestProduct/RequestProductModal';
import { useClickAway } from 'react-use';
import { addProdBuyClicksLog } from '@/services/spot-prices';
import { useSelector } from 'react-redux';
import { selectUser } from '@/features/userSlice';
import { SearchResultsProps } from '@/interfaces/propsinterfaces';

function SearchResults(
  { data, closeSearchResult, handleClose }: SearchResultsProps,
  ref: Ref<HTMLDivElement>
) {
  const [requestProductModal, toggleRequestProductModal] = useToggle();
  const outsideRef = useRef(null);
  useClickAway(outsideRef, () => closeSearchResult());
  const toggleModal = () => {
    toggleRequestProductModal();
  };
  data?.data?.searchProducts.map((value: any) => {
    console.log(`Search Be Like /${value.shortName}`);
  });

  const [customerId, setCustomerId] = useState(0);
  const user = useSelector(selectUser);

  useEffect(() => {
    if (user.isLoggedin === false) {
      setCustomerId(0);
    } else {
      setCustomerId(user.user.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addProduct = async (
    productName: string,
    dealers: string,
    dealerId: number
  ) => {
    await addProdBuyClicksLog(productName, dealers, customerId, dealerId);
  };
  return (
    <>
      {requestProductModal === false && (
        <motion.div
          ref={ref}
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1,
            transition: {
              duration: 0.15
            }
          }}
          exit={{
            opacity: 0,
            transition: {
              duration: 0.15
            }
          }}
          className={`rounded:2xl overflow-y-scroll' id='searchresult absolute inset-x-0 z-40 mx-auto mt-0.5 flex max-h-[28rem] w-full flex-col gap-4 divide-gray-300 overflow-y-scroll rounded-2xl  bg-white text-black shadow-2xl sm:w-full md:mt-0.5 md:block md:w-full md:divide-y md:rounded-2xl md:px-4 md:py-0 lg:mt-0.5 lg:w-full`}
          id='searchresult'
        >
          {data?.data?.searchProducts?.map((resultItem: any) => (
            <div
              className='flex w-auto justify-between gap-2 p-2 shadow-md sm:gap-2 md:gap-3 md:px-0 md:shadow-none lg:gap-2'
              key={resultItem.productId}
            >
              {/*----------------------------- Image and Product Link ------------------------------*/}
              <div className='flex'>
                <div className='relative mr-1  h-16 w-14 flex-shrink-0 flex-grow-0 overflow-hidden md:mr-3'>
                  <Image
                    className='object-contain'
                    fill
                    src={resultItem.imageUrl}
                    alt={resultItem.productName}
                    loading='lazy'
                  />
                </div>
                <div className='flex w-fit flex-col md:w-fit lg:w-fit xl:w-fit'>
                  <Link
                    className='text-sm font-semibold decoration-2 underline-offset-1 line-clamp-1 hover:underline'
                    href={`/${resultItem.shortName}`}
                    onClick={handleClose}
                    passHref
                    prefetch={false}
                  >
                    {resultItem.productName}
                  </Link>
                  <p className='w-14 p-1 text-xs sm:w-fit md:w-fit lg:w-fit xl:w-fit'>
                    {resultItem.dealers}
                  </p>
                  <p className='font-size:0.9rem text-xs font-semibold text-primary'>
                    As low as{' '}
                    {Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD'
                    }).format(resultItem.cheapestPrice)}
                  </p>
                </div>
              </div>
              {/*-------------------------------- Product Compare and Buy Buttons -------------------------------*/}
              <div className='flex-2 flex items-center gap-2'>
                <div className='hidden gap-2 rounded-full lg:flex'>
                  <Link
                    target={'_blank'}
                    href={`/${resultItem.shortName}`}
                    onClick={handleClose}
                    passHref
                    prefetch={false}
                    className='group relative inline-flex w-full items-center justify-center overflow-hidden rounded-full bg-primary px-5 py-2 font-medium text-white '
                  >
                    <span className='absolute top-0 left-0  mb-0 flex h-0 w-full translate-y-0 transform bg-secondary opacity-90 transition-all duration-300 ease-out group-hover:h-full '></span>
                    <span className='relative '>Compare</span>
                  </Link>
                  <Link
                    target={'_blank'}
                    href={resultItem.competitorProductUrl}
                    prefetch={false}
                    onClick={() =>
                      addProduct(
                        resultItem.productName,
                        resultItem.dealers,
                        resultItem.dealerId
                      )
                    }
                    className='group relative inline-flex w-full items-center justify-center overflow-hidden rounded-full border-2 border-black  py-2 px-5 text-center font-medium text-[#303030] hover:border-secondary hover:text-white'
                  passHref>
                    <span className='absolute top-0 left-0  mb-0 flex h-0 w-full translate-y-0 transform bg-secondary opacity-90 transition-all duration-300 ease-out group-hover:h-full '></span>
                    <span className='relative '>Buy</span>
                  </Link>
                </div>
                <div className='flex gap-1 lg:hidden'>
                  <Link
                    className='flex h-10 w-10 items-center justify-center rounded-full bg-primary'
                    href={`/${resultItem.shortName}`}
                    passHref
                    prefetch={false}
                  >
                    <IoIosPricetags className='h-5 w-5 fill-white' />
                  </Link>
                  <Link
                    href={resultItem.competitorProductUrl}
                    className='flex h-10 w-10 items-center justify-center rounded-full bg-black'
                    passHref
                    prefetch={false}
                  >
                    <BiCart
                      className='flex h-5 w-5 items-center justify-center rounded-full fill-white'
                      onClick={() =>
                        addProduct(
                          resultItem.productName,
                          resultItem.dealers,
                          resultItem.dealerId
                        )
                      }
                    />
                  </Link>
                </div>
              </div>
            </div>
          ))}

          {/*--------------------------------- No result found ---------------------------*/}
          {data?.data?.searchProducts?.length < 1 && (
            <div className='flex w-auto justify-between gap-2 p-2 shadow-md md:gap-0 md:px-0 md:shadow-none'>
              <div className='w-full py-2 text-center'>
                <span className='font-semibold text-primary'>
                  Oops! No results found.
                </span>
                <p className='text-sm text-[#656565] '>
                  The product you are searching for isn&apos;t available at the
                  moment. Please try some time later or try another product.
                </p>
                <div className='mt-3'>
                  <span
                    className='mt-8 cursor-pointer rounded-full bg-primary px-3 py-2 text-white'
                    onClick={() => toggleModal()}
                  >
                    Request product
                  </span>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      )}
      {requestProductModal && (
        <RequestProductModal
          handleClose={handleClose}
          closeModal={toggleRequestProductModal}
        />
      )}
    </>
  );
}

export default forwardRef(SearchResults);
