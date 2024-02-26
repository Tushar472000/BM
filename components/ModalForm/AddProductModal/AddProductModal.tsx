import IconX from '@/components/icons/IconX';
import { selectUser } from '@/features/userSlice';
import useEscapeKey from '@/hooks/useEscapeKey';
import useOnClickOutside from '@/hooks/useOnclickOutside';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import FormWrapper from '../FormWrapper';
import { BsSearch } from 'react-icons/bs';
import { toCurrency } from '@/utils/utilities';
import { HiPlusCircle } from 'react-icons/hi';
import { Product } from '@/services/spot-prices';
import { SearchResult } from '@/interfaces/propsinterfaces';
import AddProductSpinner from '@/components/Loaders/AddProductSpinner';
import queryString from 'query-string';
import { addProduct } from '@/services/observations';
import { AddProductModalProps } from '@/interfaces/typeinterfaces';
import { search } from '@/services/dashboard';

export default function AddProductModal({
  closeModal,
  products
}: AddProductModalProps) {
  const user = useSelector(selectUser);
  {
    /* ******************** REFS & CLOSE HANDLERS ******************** */
  }
  const outsideref = useRef<HTMLDivElement>(null);
  const handleClose = () => {
    closeModal();
    window.location.reload();
  };
  useOnClickOutside(outsideref, handleClose);
  useEscapeKey(handleClose);
  {
    /* ******************** STATE MANAGEMENT VARIABLES ******************** */
  }
  const [observationData, setObservationData] = useState<
    Product[] | SearchResult[] | any
  >();
  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('');
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(false);
  const [addStatus, setAddStatus] = useState(false);
  {
    /* ******************** USE EFFECT HOOK CALLS ******************** */
  }
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    setTitle('Recommended list');
    setObservationData(products);
    return () => {
      document.body.removeAttribute('style');
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  {
    /* ******************** DEBOUNCE SEARCH HANDLER ******************** */
  }
  let  pageSize: 100;
 let  pageNumber: 1;
  useEffect(() => {
    let timer: NodeJS.Timeout;
    let messageTimer: NodeJS.Timeout;
    const handleSearchDebounced = async (query: any) => {
      setLoading(true);
      clearTimeout(timer);
      clearTimeout(messageTimer);
      timer = setTimeout(async () => {
        const data = await search(query ,pageSize ,pageNumber).then((data) => {
           if (data.success === true) {
                setLoading(false);
              }
              return data;
        });
        if (data.data.countOfProducts.noOfItems > 0 && keyword.length >= 3) {
          setObservationData(data.data.searchProducts);
          setMessage('');
          setTitle('Search results');
        } else {
          setObservationData(products);
          setTitle('Recommended list');
          if(keyword.length >= 4 )
          {
            setMessage('No results found');
          } else {
            setMessage('');
          }
        }
      }, 2500);
    };
    const query = {
      "searchFrom": "advanced",
      "searchKW": keyword.replaceAll("%20"," ").replace("%28","(").replace("%29",")"),
      "metal": "",
      "productType": "",
      "itemWeight": "",
      "series": "",
      "size":pageSize,
      "pageNumber": pageNumber,
    }

    if (keyword.length > 2) {
      handleSearchDebounced(query);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword]);
  {
    /* ******************** SEARCH HANDLER ******************** */
  }
  const searchHandler = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = (e.target as HTMLInputElement).value;
    setKeyword(value);
    if (value.length <= 2) {
      setObservationData(products);
      setTitle('Recommended list');
      setMessage('');
      setLoading(false);
    }
  };
  {
    /* ******************** SEARCH SUBMIT HANDLER ******************** */
  }
  const searchSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (keyword.trim().length < 3) {
      setObservationData(products);
      setTitle('Recommended list');
      setMessage('');
    } else {
      const query = queryString.stringify({
        searchFrom: 'homepage',
        searchKW: keyword,
        size:16,
        pageNumber:1
      });
      const data = search(query ,pageSize ,pageNumber).then((data: any) => {
        if (data.data.countOfProducts.noOfItems > 0 && keyword.length >= 3) {
          setObservationData(data.data.searchProducts);
            setTitle('Search list');
        }
        if (data.data.countOfProducts.noOfItems < 1) {
          setObservationData(products);
          setAddStatus(false);
          setTitle('Recommended list');
          if(keyword.length >= 4 )
          {
            setMessage('No results found');
          } else {
            setMessage('');
          }  
          setLoading(false);      
        }
      });
    }
  };
  {
    /* ******************** SUBMIT HANDLER ******************** */
  }
  const submitHandler = async (productId: number, productName: string) => {
    const response = await addProduct(productId, user.user.id, user.user.token);
    if (response === true) {
      setAddStatus(true);
      setMessage(`${productName} successfully added to observation list`);
      setTimeout(() => {
        setMessage('');
      }, 4000);
    } else {
      setAddStatus(false);
      setMessage(`${productName} already exist in observation list`);
      setTimeout(() => {
        setMessage('');
      }, 4000);
    }
  };
  return createPortal(
    <div className='fixed inset-0 flex items-center justify-center bg-[rgb(0,0,0,0.6)] pt-16 shadow-md backdrop-blur lg:pt-24'>
      <div
        ref={outsideref}
        className='relative mx-2 flex h-[28rem] w-full max-w-3xl justify-center overflow-hidden rounded-3xl bg-white px-4 py-4'
      >
        {/* ******************** CLOSE ICON BUTTON ******************** */}
        <div
          className='absolute top-4 right-2 cursor-pointer bg-slate-50 p-1 hover:bg-slate-100'
          onClick={handleClose}
        >
          <IconX className='h-4 w-4' />
        </div>
        {/* ******************** BANNER IMAGE ******************** */}
        <div className='-mt-4 -ml-5 hidden h-[28rem] w-56 md:flex'>
          <Image
            height={400}
            width={400}
            src='https://res.cloudinary.com/bullionmentor/image/upload/Images-Icons/login-banner.webp'
            alt='Banner'
          />
        </div>
        {/* ******************** MODAL CONTENT ******************** */}
        <FormWrapper
          title='Add products to observation'
          description=''
          footer=''
        >
          <div className='flex flex-col justify-start text-dark-black'>
            {/* ******************** SEARCH INPUT CONTAINER ******************** */}
            <form
              className='flex w-full flex-row items-center gap-2'
              onSubmit={searchSubmitHandler}
            >
              {/* ******************** SEARCH INPUT FIELD CONTAINER ******************** */}
              <div className='flex flex-col gap-1'>
                {/* ******************** INPUT LABEL ******************** */}
                <span className='mt-2 flex flex-row items-center align-middle text-[0.9rem] text-dark-black lg:text-base'>
                  <label htmlFor='name'>Product name</label>
                </span>
                {/* ******************** SEARCH INPUT FIELD ******************** */}
                <input
                  placeholder='eg: American eagle'
                  className='rounded-full border border-gray-300 px-4 py-3 text-[0.9rem] text-dark-grey outline-none focus:border-primary'
                  onKeyUp={searchHandler}
                />
              </div>
              {/* ******************** SEARCH SUBMIT BUTTON ******************** */}
              <button
                type='submit'
                className='mt-8 rounded-full bg-primary px-2 py-2 text-white'
              >
                <BsSearch />
              </button>
            </form>
            {loading === true ? (
              <AddProductSpinner />
            ) : (
              <>
                {/* ******************** MESSAGE & TITLE INPUT CONTAINER ******************** */}
                <div className='mt-1.5 flex flex-col gap-0'>
                  <span
                    className={`flex justify-center text-sm ${
                      addStatus === true ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {message}
                  </span>
                  <span className='text-base font-normal'>{title}</span>
                </div>
                {/* ******************** PRODUCT GRID CONTAINER ******************** */}
                <div className='flex h-56 w-full overflow-y-hidden bg-white md:h-60'>
                  {/* ******************** PRODUCT INFORMATION CONTAINER ******************** */}
                  <div
                    className='mt-1 grid h-full w-full grid-cols-1 justify-center gap-2 overflow-y-scroll p-2 sm:grid-cols-2'
                    id='noscroll'
                  >
                    {observationData?.map((values: any, index: number) => {
                      return (
                        <div
                          className='grid h-20 grid-cols-5  items-center  gap-2 rounded-md px-2 py-2 shadow-md'
                          key={values.productId}
                        >
                          {/* ******************** PRODUCT IMAGE ******************** */}
                          <Image
                            src={values.imageUrl}
                            alt={values.productName}
                            height={80}
                            width={80}
                            loading='lazy'
                          />
                          {/* ******************** PRODUCT INFO CONTAINER ******************** */}
                          <div className='flex w-max flex-col gap-0'>
                            {/* ******************** PRODUCT NAME ******************** */}
                            <span className='block w-full text-[0.9rem] font-semibold'>
                              {' '}
                              {values.productName.slice(0, 20)}...
                            </span>
                            {/* ******************** DEALER NAME ******************** */}
                            <span className='text-sm font-medium text-[#656565]'>
                              {values.dealers}
                            </span>
                            {/* ******************** CHEAPEST PRICE ******************** */}
                            <span className='text-sm font-semibold text-primary'>
                              As low as {toCurrency(values.cheapestPrice)}
                            </span>
                          </div>
                          {/* ******************** PRODUCT INFO CONTAINER ******************** */}
                          <div
                            className='relative ml-24 cursor-pointer sm:ml-28'
                            onClick={() =>
                              submitHandler(
                                values.productId,
                                values.productName
                              )
                            }>
                            <HiPlusCircle size={30} fill={'#E49E2F'} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>
        </FormWrapper>
      </div>
    </div>,
    document.body
  );
}
