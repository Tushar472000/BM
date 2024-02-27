import { search } from '@/services/dashboard';
import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { FormEvent, useEffect, useRef, useState } from 'react';
import SearchResults from './SearchResults';
import { MdCancel } from 'react-icons/md';
import useOnClickOutside from '@/hooks/useOnclickOutside';
import SearchSpinner from './Loaders/SearchSpinner';

const  pageSize=12;
const  pageNumber= 1;
export default function Search() {
  const [searchedData, setSearchedData] = useState<Awaited<
    ReturnType<typeof search>
  > | null>();
  const [showSearchedData, setShowSearchedData] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [searchKw, setSearchKw] = useState('');
  const searchResultsRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    handleClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.location.href]);
  useOnClickOutside(searchResultsRef, () => closeSearchResult());
  const closeSearchResult = () => {
    setSearchedData(null);
    setShowSearchedData(false);
  };
  const searchHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    try {
      const { value } = e.target;
      setKeyword(e.target.value);
      setSearchKw(e.target.value);
      if (value)
        if (value.length >= 0 && value.length <= 3) {
          setLoading(false);
          setShowSearchedData(false);
        }
      if (value.length >= 3) {
        setLoading(true);
      }
      if (value.length >= 3) {
        setShowSearchedData(true);
      } else {
        setSearchedData(null);
        setShowSearchedData(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const inputFocusHandler = () => {
    if (
      searchedData &&
      searchedData?.data.searchProducts.length > 0 &&
      showSearchedData
    ) {
      setShowSearchedData(true);
    }
    setShowSearchedData(false);
  };
  const handleClose = () => {
    closeSearchResult();
    setKeyword('');
    setSearchKw('');
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (keyword.trim().length >= 1) {
      router.push(`/search?searchKW=${searchKw}`);
      handleClose();
    }
  };
  useEffect(() => {
    if (keyword.length < 3) {
      setSearchedData(null);
      setShowSearchedData(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchedData]);
  useEffect(() => {
    // Use a timer variable to keep track of the setTimeout
    let timer: NodeJS.Timeout;

    // Function to handle the search API call with debounce behavior
    const handleSearchDebounced = async (query: any) => {
      setLoading(true);
      // Clear any existing timer
      clearTimeout(timer);

      // If the search term is empty, reset the search results and return
      if (!query) {
        setSearchedData(null);
        setShowSearchedData(false);
        return;
      }
      // Set a new timer for the API call after the specified delay (e.g., 500ms)
      timer = setTimeout(async () => {
        const data = await search(query ,pageSize , pageNumber);
        setLoading(false);
        setSearchedData(data);
      }, 2000); // Adjust the delay as needed (e.g., 500ms)
    };
    const query = {
      searchFrom: 'advanced',
      searchKW: keyword
        .replaceAll('%20', ' ')
        .replace('%28', '(')
        .replace('%29', ')'),
      metal: '',
      productType: '',
      itemWeight: '',
      series: '',
      size:pageSize,
      pageNumber:pageNumber
    };

    if (keyword.length >= 3) {
      // Call the debounced searchAPI when the user pauses typing
      handleSearchDebounced(query);
    }
    // Cleanup the timer when the component unmounts
    return () => clearTimeout(timer);
  }, [keyword]);
  
  return (
    <>
      <div className='relative w-full'>
        <form
          onSubmit={handleSubmit}
          onReset={handleClose}
          className='flex w-full justify-between overflow-hidden rounded-full bg-white px-2 py-1 shadow-[0px_3px_3px_rgba(0,0,0,0.16)]'
        >
          <input
            type='text'
            name='search'
            placeholder='Enter Product Name'
            className='w-full pl-4 text-black outline-none'
            value={keyword}
            onFocus={inputFocusHandler}
            onChange={searchHandler}
            autoComplete='off'
          />
          {keyword.length > 0 && (
            <button type='reset' className='cursor-pointer px-2'>
              <MdCancel
                size={26}
                color='#404040'
                className=' hover:text-red-500'
              />
            </button>
          )}
          {keyword.length == 0 && (
            <button
              type='submit'
              className='group relative overflow-hidden rounded-full bg-[#FFAA00] px-3 py-0 text-sm font-medium text-[#0F4463] hover:border-transparent hover:text-white hover:opacity-90 sm:px-4 sm:py-1'
            >
              <span className='absolute top-0 left-0 mb-0 h-0 w-full translate-y-0 transform bg-secondary transition-all duration-300 ease-out group-hover:h-full'></span>
              <span className='relative pr-[5.5px] '>Search</span>
            </button>
          )}
        </form>
        <AnimatePresence>
          {searchedData && searchedData.data.searchProducts.length > 0 ? (
            <SearchResults
              ref={searchResultsRef}
              closeSearchResult={closeSearchResult}
              data={searchedData}
              handleClose={handleClose}
            />
          ) : keyword.length >= 1 && loading === true ? (
            <div className={`md:full absolute inset-x-0 z-40 mx-auto max-h-[28rem] overflow-y-hidden flex w-auto flex-col gap-4 divide-gray-300  rounded-2xl bg-white text-black shadow-xl md:block md:divide-y md:px-4 md:py-0 lg:w-full mt-0.5 md:mt-0.5 lg:mt-0.5`}><SearchSpinner />
              </div>
          ) : searchedData && searchedData.data.searchProducts.length < 1 ? (
            <SearchResults
              ref={searchResultsRef}
              closeSearchResult={closeSearchResult}
              data={searchedData}
              handleClose={handleClose}
            />
          ) : null}
        </AnimatePresence>
      </div>
    </>
  );
}
