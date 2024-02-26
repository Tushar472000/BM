import { FormEvent, useEffect, useState } from 'react';
import FormWrapper from '../FormWrapper';
import { getDealers, rateADealer } from '@/services/spot-prices';
import { TiStarFullOutline } from 'react-icons/ti';
import Input from '../Input';
import { useSelector } from 'react-redux';
import { selectUser } from '@/features/userSlice';
import { validateEmail, validateInput, validateName } from '@/hooks/validators';
import { DealerRatingFormProps } from '@/interfaces/typeinterfaces';

export default function DealerRatingForm({
  getSuccess,
  closeModal
}: DealerRatingFormProps) {
  {
    /* ******************* GET REDUX STATE ******************* */
  }
  const user = useSelector(selectUser);
  {
    /* ******************* STATE MANAGEMENT VARIABLES ******************* */
  }
  const [dealer, setDealer] = useState(0);
  const [dealers, setDealers] =
    useState<Awaited<ReturnType<typeof getDealers>>>();
  const [rating, setRating] = useState(0);
  const [userInfo, setuserInfo] = useState({
    name: '',
    nameError: false,
    email: '',
    emailError: false,
    title: '',
    titleError: false,
    message: '',
    messageError: false
  });
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [messageError, setMessageError] = useState(false);
  const [dealerError, setDealerError] = useState(false);
  const [ratingError, setRatingError] = useState(false);
  {
    /* ******************* GET DEALERS LIST ******************* */
  }
  useEffect(() => {
    const initFetch = async () => {
      try {
        const res = await fetch(`/api/dealers`);
        const isJson = res.headers
          .get('content-type')
          ?.includes('application/json');
        const data: Awaited<ReturnType<typeof getDealers>> | null = isJson
          ? await res.json()
          : null;
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        setDealers(data ?? []);
      } catch (error) {
        console.log(`Something went wrong ${error}`);
      }
    };
    initFetch();
  }, []);
  {
    /* ******************* VALIDATION FUNCTIONS ******************* */
  }
  const validateGuestUser = (
    name: string,
    email: string,
    title: string,
    message: string
  ) => {
    if (
      validateName(name) === 0 ||
      validateName(name) === false ||
      validateEmail(email) === 0 ||
      validateEmail(email) === false ||
      validateInput(title) === false ||
      validateInput(message) === false ||
      rating === 0 ||
      dealer === 0
    ) {
      return false;
    }
  };
  const validateNewGoogleUser = (
    name: string,
    title: string,
    message: string
  ) => {
    if (
      validateName(name) === 0 ||
      validateName(name) === false ||
      validateInput(title) === false ||
      validateInput(message) === false ||
      rating === 0 ||
      dealer === 0
    ) {
      return false;
    }
  };
  const validateRegisteredUser = (title: string, message: string) => {
    if (
      validateInput(title) === false ||
      validateInput(message) === false ||
      rating === 0 ||
      dealer === 0
    ) {
      return false;
    }
  };
  {
    /* ******************* SUBMIT HANDLER ******************* */
  }
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user.isLoggedin === false) {
      if (
        validateGuestUser(
          userInfo.name,
          userInfo.email,
          userInfo.title,
          userInfo.message
        ) === false
      ) {
        if (
          validateEmail(userInfo.email) === 0 ||
          validateEmail(userInfo.email) === false
        ) {
          setEmailError(true);
        }
        if (
          validateName(userInfo.name) === 0 ||
          validateName(userInfo.name) === false
        ) {
          setNameError(true);
        }
        if (validateInput(userInfo.title) === false) {
          setTitleError(true);
        }
        if (validateInput(userInfo.message) === false) {
          setMessageError(true);
        }
        if (dealer === 0) {
          setDealerError(true);
        }
        if (rating === 0) {
          setRatingError(true);
        }
      } else {
        const response = await rateADealer(
          userInfo.name,
          userInfo.email,
          dealer,
          rating,
          userInfo.title,
          userInfo.message
        );
        if (response?.success === true) {
          getSuccess();
        }
      }
    }
    if (user.isLoggedin === true) {
      if (
        validateNewGoogleUser(
          userInfo.name,
          userInfo.title,
          userInfo.message
        ) === false
      ) {
        if (
          validateName(userInfo.name) === 0 ||
          validateName(userInfo.name) === false
        ) {
          setNameError(true);
        }
        if (validateInput(userInfo.title) === false) {
          setTitleError(true);
        }
        if (validateInput(userInfo.message) === false) {
          setMessageError(true);
        }
        if (dealer === 0) {
          setDealerError(true);
        }
        if (rating === 0) {
          setRatingError(true);
        }
      } else {
        const response = await rateADealer(
          userInfo.name,
          user.user.email,
          dealer,
          rating,
          userInfo.title,
          userInfo.message
        );
        if (response?.success === true) {
          getSuccess();
        }
      }
    }
    if (user.isLoggedin === true && user.user.name) {
      if (validateRegisteredUser(userInfo.title, userInfo.message) === false) {
        if (
          validateName(userInfo.name) === 0 ||
          validateName(userInfo.name) === false
        ) {
          setNameError(true);
        }
        if (validateInput(userInfo.title) === false) {
          setTitleError(true);
        }
        if (validateInput(userInfo.message) === false) {
          setMessageError(true);
        }
        if (dealer === 0) {
          setDealerError(true);
        }
        if (rating === 0) {
          setRatingError(true);
        }
      } else {
        const response = await rateADealer(
          user.user.name,
          user.user.email,
          dealer,
          rating,
          userInfo.title,
          userInfo.message
        );
        if (response?.success === true) {
          getSuccess();
        }
      }
    }
  };
  return (
    <div className='h-full w-full'>
      <FormWrapper
        title='Rate a dealer'
        description='Your review is valuable'
        footer=''
      >
        <form
          className='-mt-3 flex flex-col overflow-clip'
          onSubmit={submitHandler}
        >
          {/* ******************* DEALER RATING CONTAINER ******************* */}
          <div className='grid h-24 grid-cols-2 gap-4'>
            {/* ******************* DEALER NAME INPUT ******************* */}
            <div className='flex h-fit flex-col'>
              {/* ******************* DEALER NAME LABEL ******************* */}
              <span className='mt-2 flex flex-row items-center align-middle text-[0.9rem] text-dark-black lg:text-base'>
                <label htmlFor='name'>Dealer name</label>
                <p className='text-red-600'>*</p>
              </span>
              {/* ******************* DEALER NAME INPUT ******************* */}
              <select
                className='overflow-y-scroll rounded-full border border-gray-300 px-4 py-1.5 text-[0.9rem] text-dark-grey outline-none focus:border-primary'
                value={dealer}
                onChange={(e) => setDealer(parseInt(e.target.value))}
              >
                <option value={0}>Select a dealer</option>
                {dealers?.map((values: any, index: number) => {
                  return (
                    <option value={values?.id} key={index}>
                      {values.aliasName}
                    </option>
                  );
                })}
              </select>
              <p
                className={
                  dealerError === true
                    ? 'flex justify-end text-xs text-red-600 lg:text-sm'
                    : 'hidden'
                }
              >
                {dealer === 0 ? 'Dealer is required' : null}
              </p>
            </div>
            {/* ******************* DEALER RATING INPUT ******************* */}
            <div className='flex h-fit flex-col'>
              {/* ******************* DEALER RATING LABEL ******************* */}
              <span className='mt-2 flex flex-row items-center align-middle text-[0.9rem] text-dark-black lg:text-base'>
                <label htmlFor='name'>Dealer rating</label>
                <p className='text-red-600'>*</p>
              </span>
              {/* ******************* DEALER RATING INPUT ******************* */}
              <div className='flex items-end'>
                {[...Array(5)].map((star, index) => {
                  const ratingValue = index + 1;
                  return (
                    <div key={index}>
                      <label className='flex flex-row'>
                        <input
                          type='radio'
                          name='rating'
                          className='hidden'
                          value={ratingValue}
                          onClick={() => setRating(ratingValue)}
                          onChange={() => {
                            setRating(ratingValue);
                          }}
                        />
                        <TiStarFullOutline
                          fill={ratingValue <= rating ? '#EAB308' : 'gray'}
                          className='fill-yello mt-1 h-6 w-6 cursor-pointer text-gray-300 dark:text-gray-500 md:mt-0 md:h-10 md:w-10'
                        />
                      </label>
                    </div>
                  );
                })}
              </div>
              <p
                className={
                  ratingError === true
                    ? 'flex justify-end text-xs text-red-600 lg:text-sm'
                    : 'hidden'
                }
              >
                {rating === 0 ? 'Rating is required' : null}
              </p>
            </div>
          </div>
          {/* ******************* NAME INPUT CONTAINER ******************* */}
          <div
            className={
              user.isLoggedin === true && user.user.name
                ? 'hidden'
                : user.isLoggedin === true && !user.user.name
                ? '-mt-5 grid h-28 grid-cols-1 gap-5'
                : user.isLoggedin === false
                ? '-mt-5 grid h-28 grid-cols-2 gap-5'
                : ''
            }
          >
            {/* ******************* NAME INPUT CONTAINER ******************* */}
            <div
              className={
                user.isLoggedin === true && user.user.name
                  ? 'hidden'
                  : 'flex h-24 w-full flex-col'
              }
            >
              <Input
                label='Name'
                placeholder='eg: John Doe'
                value={userInfo.name}
                onChange={(e) =>
                  setuserInfo({ ...userInfo, name: e.target.value })
                }
              />
              <p
                className={
                  nameError === true
                    ? 'flex justify-end text-xs text-red-600 lg:text-sm'
                    : 'hidden'
                }
              >
                {validateName(userInfo.name) === 0
                  ? 'Name is required'
                  : validateName(userInfo.name) === false
                  ? 'Please enter a valid name'
                  : null}
              </p>
            </div>
            {/* ******************* EMAIL INPUT CONTAINER ******************* */}
            <div
              className={
                user.isLoggedin === true
                  ? 'hidden'
                  : 'flex h-24 w-full flex-col'
              }
            >
              <Input
                label='Email'
                placeholder='eg:johndoe@gmail.com'
                value={userInfo.email}
                onChange={(e) =>
                  setuserInfo({ ...userInfo, email: e.target.value })
                }
              />
              <p
                className={
                  emailError === true
                    ? 'flex justify-end text-xs text-red-600 lg:text-sm'
                    : 'hidden'
                }
              >
                {validateEmail(userInfo.email) === 0
                  ? 'Email is required'
                  : validateEmail(userInfo.email) === false
                  ? 'Please enter a valid email'
                  : null}
              </p>
            </div>
          </div>
          {/* ******************* REVIEW TITLE CONTAINER ******************* */}
          <div className='-mt-4 flex h-24 w-full flex-col sm:-mt-6'>
            <Input
              label='Title'
              placeholder='eg: Best prices online'
              value={userInfo.title}
              onChange={(e) =>
                setuserInfo({ ...userInfo, title: e.target.value })
              }
            />
            <p
              className={
                titleError === true
                  ? 'flex justify-end text-xs text-red-600 lg:text-sm'
                  : 'hidden'
              }
            >
              {validateInput(userInfo.title) === false
                ? 'Review title is required'
                : null}
            </p>
          </div>
          {/* ******************* REVIEW TEXT CONTAINER ******************* */}
          <div className='-mt-5 flex h-28 flex-col sm:-mt-6 lg:-mt-3'>
            <span className='mt-2 flex flex-row items-center align-middle text-[0.9rem] text-dark-black lg:text-base'>
              <label htmlFor='message'>Message</label>
              <p className='text-red-600'>*</p>
            </span>
            <textarea
              id='noscroll'
              placeholder='Leave a comment'
              cols={25}
              rows={2}
              className='overflow-y-scroll rounded-xl border border-gray-300 px-4 py-3 text-[0.9rem] text-dark-grey outline-none focus:border-primary'
              value={userInfo.message}
              onChange={(e) =>
                setuserInfo({ ...userInfo, message: e.target.value })
              }
            />
            <p
              className={
                messageError === true
                  ? 'flex justify-end text-xs text-red-600 lg:text-sm'
                  : 'hidden'
              }
            >
              {validateInput(userInfo.message) === false
                ? 'Message is required'
                : null}
            </p>
          </div>
          <button
            type='submit'
            className='group relative inline-block overflow-hidden rounded-full bg-primary  p-1 text-white lg:-mt-1 lg:p-1 xl:mt-0.5 xl:p-1.5'
          >
            <span className='absolute top-0 left-0  mb-0 flex h-0 w-full translate-y-0 transform bg-secondary opacity-90 transition-all duration-300 ease-out group-hover:h-full '></span>
            <span className='relative '>Submit Review</span>
          </button>
        </form>
      </FormWrapper>
    </div>
  );
}
