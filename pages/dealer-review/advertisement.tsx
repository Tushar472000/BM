/* eslint-disable react-hooks/rules-of-hooks */
import FormWrapper from '@/components/ModalForm/FormWrapper';
import { validateEmail, validateInput, validateName } from '@/hooks/validators';
import { DealersReview } from '@/interfaces/typeinterfaces';
import { getDealersReviews, rateADealer } from '@/services/spot-prices';
import React, { FormEvent, useEffect, useState } from 'react';
import { TiStarFullOutline } from 'react-icons/ti';
import Input from '@/components/ModalForm/Input';
import useToggle from '@/hooks/useToggle';
import { useSelector } from 'react-redux';
import { selectUser } from '@/features/userSlice';
import VendorReviewModal from '@/components/ModalForm/VendorReviewModals/VendorReviewModal';
import { advertisementProps } from '@/interfaces/typeinterfaces';


export default function Advertisement({ dealer, code }: advertisementProps) {
  const [fullName, setName] = useState('');
  const [nameError, setNameError] = useState(false);
  const [emailId, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [reviewText, setTitle] = useState('');
  const [reviewTextError, setReviewTextError] = useState(false);
  const [reviewHeader, setHead] = useState('');
  const [reviewHeaderError, setReviewHeaderError] = useState(false);
  const [rating, setRating] = useState(0);
  const [ratingError, setRatingError] = useState(false);
  const [ratingChanged, setRatingChanged] = useState(false);
  const [isSuccessModal, toggleSuccessModal] = useToggle();
  const [success, setSuccess] = useState(false);
  const [dealerData, setDealerData] = useState<DealersReview>();
  const bmUser = useSelector(selectUser);
  useEffect(() => {
    const initFetch = async () => {
      await getDealersReviews(code).then((res) => {
        setDealerData(res)
      })
    }
    initFetch();
  }, [])
  const validateGuestUser = (
    name: string,
    email: string,
    title: string,
    text: string
  ) => {
    if (
      validateName(name) === false ||
      validateName(name) === 0 ||
      validateEmail(email) === false ||
      validateEmail(email) === 0 ||
      validateInput(title) === false ||
      validateInput(text) === false ||
      !rating
    ) {
      return false;
    } else {
      return true;
    }
  };

  const validateNewGoogleUser = (name: string, title: string, text: string) => {
    if (
      validateName(name) === false ||
      validateName(name) === 0 ||
      validateInput(title) === false ||
      validateInput(text) === false ||
      !rating
    ) {
      return false;
    } else {
      return true;
    }
  };
  const validateRegisteredUser = (title: string, text: string) => {
    if (
      validateInput(title) === false ||
      validateInput(text) === false ||
      !rating
    ) {
      return false;
    } else {
      return true;
    }
  };

  /* ******************* SUBMIT HANDLER FUNCTION ******************* */

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (bmUser.isLoggedin === false) {
      if (
        validateGuestUser(fullName, emailId, reviewHeader, reviewText) === false
      ) {
        setNameError(true);
        setEmailError(true);
        setReviewHeaderError(true);
        setReviewTextError(true);
        setRatingError(true);
      } else {
        const response = await rateADealer(
          fullName,
          emailId,
          dealerData?.id as number,
          rating,
          reviewHeader,
          reviewText
        );
        if (response?.success === true) {
          toggleSuccessModal();
          setSuccess(true)
          setNameError(false);
          setEmailError(false);
          setReviewHeaderError(false);
          setReviewTextError(false);
          setRatingError(false);
          setName('');
          setEmail('');
          setTitle('');
          setHead('');
          setRating(0);
        }
      }
    } else if (bmUser.isLoggedin === true && !bmUser.user.name) {
      if (validateNewGoogleUser(fullName, reviewHeader, reviewText) === false) {
        setNameError(true);
        setReviewHeaderError(true);
        setReviewTextError(true);
        setRatingError(true);
      } else {
        const response = await rateADealer(
          fullName,
          bmUser.user.email,
          dealerData?.id as number,
          rating,
          reviewHeader,
          reviewText
        );
        if (response?.success === true) {
          toggleSuccessModal();
          setSuccess(true);
          setNameError(false);
          setReviewHeaderError(false);
          setReviewTextError(false);
          setRatingError(false);
          setName('');
          setEmail('');
          setTitle('');
          setHead('');
          setRating(0);
        }
      }
    } else {
      if (validateRegisteredUser(reviewHeader, reviewText) === false) {
        setReviewHeaderError(true);
        setReviewTextError(true);
        setRatingError(true);
      } else {
        const response = await rateADealer(
          bmUser.user.name,
          bmUser.user.email,
          dealerData?.id as number,
          rating,
          reviewHeader,
          reviewText
        );
        if (response?.success === true) {
          toggleSuccessModal();
          setSuccess(true);
          setReviewHeaderError(false);
          setReviewTextError(false);
          setRatingError(false);
          setName('');
          setEmail('');
          setTitle('');
          setHead('');
          setRating(0);
        }
      }
    }
  };
  useEffect(() => {
    if (success === true) {
      setTimeout(() => setSuccess(false), 4000)
    }
  }, [success])
  return (
    <div className='mt-4 h-auto  rounded-2xl border-gray-200 bg-white py-4 px-2 shadow-md shadow-slate-300  md:col-span-6 md:mt-4 md:p-4 lg:col-span-4 lg:mt-12 lg:p-4'>
      <FormWrapper title='Your review is valuable' description='' footer=''>
        <form
          className='flex w-full flex-col sm:w-full md:w-full lg:w-full'
          onSubmit={submitHandler}
        >
          {/* ******************** RATING ******************** */}
          <span className='-mb-5 grid grid-cols-1 items-center gap-3 lg:-mb-4 lg:h-24'>
            <div className='flex h-full w-full flex-col gap-1 lg:-mt-1'>
              <span className='flex flex-row items-center pt-2 align-middle text-sm text-dark-black lg:text-base'>
                <label htmlFor='name'>Dealer rating</label>
                <p className='text-red-600'>*</p>
              </span>
              <div className='mb-4 flex items-end'>
                {[...Array(5)].map((star, index) => {
                  const ratingValue = index + 1;
                  return (
                    <div key={index}>
                      <div className='h-10'>
                        <label className='flex flex-row'>
                          <input
                            type='radio'
                            name='rating'
                            className='hidden'
                            value={ratingValue}
                            onClick={() => setRating(ratingValue)}
                            onChange={(e) => {
                              setRating(ratingValue);
                              setRatingChanged(true);
                              setRatingError(false);
                            }}
                          />
                          <TiStarFullOutline
                            fill={ratingValue <= rating ? '#EAB308' : 'gray'}
                            className='fill-yello h-10 w-10 cursor-pointer text-gray-300 dark:text-gray-500'
                          />
                        </label>
                      </div>
                    </div>
                  );
                })}
              </div>
              {ratingError === true ? (
                <p
                  className={
                    !rating
                      ? '-mt-4 mb-2 text-right text-sm text-red-600 lg:-mt-4'
                      : 'invisible'
                  }
                >
                  {!rating ? 'Rating is required' : null}
                </p>
              ) : null}
            </div>
          </span>
          {/* ******************** NAME & EMAIL ******************** */}
          {bmUser.isLoggedin === false ? (
            <div className='col-span-2 h-fit gap-2'>
              {/******************* NAME INPUT *****************/}
              <div className='flex h-24 w-auto flex-col'>
                <Input
                  label='Name'
                  placeholder='eg: John Doe'
                  value={fullName}
                  onChange={(e) => {
                    setName(e.target.value);
                    setNameError(false);
                  }}
                />
                <p
                  className={`flex justify-end text-xs lg:text-sm ${nameError === true ? 'text-red-600' : 'hidden'
                    }`}
                >
                  {validateName(fullName) === 0
                    ? 'Name is required'
                    : validateName(fullName) === false
                      ? 'Please enter a valid name'
                      : null}
                </p>
              </div>
              {/******************* EMAIL INPUT *****************/}
              <div className='flex h-24 w-full flex-col'>
                <Input
                  label='Email'
                  placeholder='eg: johndoe@gmail.com'
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError(false);
                  }}
                  value={emailId}
                />
                <p
                  className={`flex justify-end text-xs lg:text-sm ${emailError === true ? 'text-red-600' : 'hidden'
                    }`}
                >
                  {validateEmail(emailId) === 0
                    ? 'Email is required'
                    : validateEmail(emailId) === false
                      ? 'Please enter a valid email'
                      : null}
                </p>
              </div>
            </div>
          ) : bmUser.isLoggedin === true && !bmUser.user.name ? (
            <div className='flex h-24 w-auto flex-col'>
              <Input
                label='Name'
                placeholder='eg: John Doe'
                onChange={(e) => {
                  setName(e.target.value);
                  setNameError(false);
                }}
                value={fullName}
              />
              <p
                className={
                  nameError === true
                    ? 'flex justify-end text-xs text-red-600 lg:text-sm'
                    : 'hidden'
                }
              >
                {validateName(fullName) === 0
                  ? 'Name is required'
                  : validateName(fullName) === false
                    ? 'Please enter a valid name'
                    : null}
              </p>
            </div>
          ) : null}
          {/* ******************** REVIEW TITLE INPUT ******************** */}
          <div className='flex h-24 w-full flex-col'>
            <Input
              label='Title'
              placeholder='eg: Best Prices Online'
              onChange={(e) => {
                setTitle(e.target.value);
                setReviewTextError(false);
              }}
              value={reviewText}
            />
            <p
              className={
                reviewTextError === true
                  ? 'flex justify-end text-xs text-red-600 lg:text-sm'
                  : 'hidden'
              }
            >
              {validateInput(reviewText) === false
                ? 'Review title is required'
                : null}
            </p>
          </div>
          {/* ******************** REVIEW TEXT INPUT ******************** */}
          <div className='flex h-28 flex-col'>
            <span className='mt-2 flex flex-row items-center align-middle text-[0.9rem] text-dark-black lg:text-base'>
              <label htmlFor='message'>Message</label>
              <p className='text-red-600'>*</p>
            </span>
            <textarea
              id='noscroll'
              placeholder='Leave a comment...'
              cols={25}
              rows={2}
              className='overflow-y-scroll rounded-xl border border-gray-300 px-4 py-3 text-[0.9rem] text-dark-grey outline-none focus:border-primary'
              onChange={(e) => {
                setHead(e.target.value);
                setReviewHeaderError(false);
              }}
              value={reviewHeader}
            />
            <p
              className={
                reviewHeaderError === true
                  ? 'flex justify-end text-xs text-red-600 lg:text-sm'
                  : 'hidden'
              }
            >
              {validateInput(reviewHeader) === false
                ? 'Message is required'
                : null}
            </p>
          </div>
          <button
            type='submit'
            className='group relative inline-block overflow-hidden rounded-full bg-primary  py-2 px-5 text-sm font-normal text-white md:mb-1 lg:text-base'
          >
            <span className='absolute top-0 left-0  mb-0 flex h-0 w-full translate-y-0 transform bg-secondary opacity-90 transition-all duration-300 ease-out group-hover:h-full '></span>
            <span className='relative '>Submit Review</span>
          </button>
        </form>
      </FormWrapper>
      {success === true && <VendorReviewModal closeModal={() => setSuccess(false)} />}
    </div>
  );
}
