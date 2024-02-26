import { selectUser, updateName } from '@/features/userSlice';
import { FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../ModalForm/Input';
import {
  validateAccountDetails,
  validateInput,
  validateName,
  validatePin
} from '@/hooks/validators';
import {
  GetCustomerDetails,
  changePersonalDetail
} from '@/services/spot-prices';
import ToastMessage from '../ToastMessage';

export default function PersonalDetails() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState(false);
  const [street, setStreet] = useState('');
  const [streetError, setStreetError] = useState(false);
  const [state, setState] = useState('');
  const [stateError, setStateError] = useState(false);
  const [city, setCity] = useState('');
  const [cityError, setCityError] = useState(false);
  const [zipcode, setZipcode] = useState('');
  const [zipcodeError, setZipcodeError] = useState(false);
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [alertState, setAlertState] = useState(false);
  const email = user.user.email;
  const id = user.user.id;
  const token = user.user.token;
  const getUserDetails = async () => {
    if (user.user.email) {
      const response = await GetCustomerDetails(user.user.email);
      if (response.data.name) {
        setName(response.data.name);
      }
      if (response.data.streetAddress) {
        setStreet(response.data.streetAddress);
      }
      if (response.data.state) {
        setState(response.data.state);
      }
      if (response.data.city) {
        setCity(response.data.city);
      }
      if (response.data.pincode) {
        setZipcode(response.data.pincode);
      }
    }
  };
  const resetHandler = () => {
    getUserDetails();
  };
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateName(name) === 0 || validateName(name) === false) {
      setNameError(true);
    }
    if (validateInput(street) === false || street.length > 50) {
      setStreetError(true);
    }
    if (validateName(state) === 0 || validateName(state) === false) {
      setStateError(true);
    }
    if (validateName(city) === 0 || validateName(city) === false) {
      setCityError(true);
    }
    if (validatePin(zipcode) === 0 || validatePin(zipcode) === false) {
      setZipcodeError(true);
    }
    if (validateAccountDetails(name, street, state, city, zipcode) === true) {
      const response = await changePersonalDetail(
        user.user.email,
        name,
        street,
        state,
        city,
        zipcode
      );
      setShowMessage(true);
      setMessage(response.data);
      if (response.success === true) {
        setAlertState(false);
        dispatch(
          updateName({ name: name, email: email, id: id, token: token })
        );
        setName(user.user.name);
        setTimeout(() => {
          window.location.reload();
          setShowMessage(false);
        }, 4000);
      }
      if (response.success === false) {
        setAlertState(true);
        setTimeout(() => setShowMessage(false), 4000);
      }
    }
  };
  useEffect(() => {
    getUserDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className='flex w-full flex-col gap-2 rounded-lg px-3 py-6 shadow-lg lg:w-4/5'>
      {/* ******************* HEADER ******************* */}
      <span className='flex flex-col gap-0.5'>
        <h1 className='semibold relative w-full text-lg font-medium md:text-2xl'>
          Update account information
        </h1>
        {showMessage && (
          <ToastMessage
            message={message}
            closeMessage={() => setShowMessage(false)}
            alertState={alertState}
          />
        )}
      </span>
      {/* ******************* ACCOUNT INFORMATION FORM ******************* */}
      <form onReset={resetHandler} onSubmit={submitHandler}>
        {/* ******************* NAME & EMAIL CONTAINER ******************* */}
        <span className='grid h-44 w-full grid-rows-2 lg:h-20 lg:grid-cols-2 lg:gap-2'>
          {/* ******************* NAME INPUT ******************* */}
          <span className='flex w-full flex-col'>
            <Input
              label='Name'
              placeholder='eg: John Doe'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <p
              className={
                nameError === true
                  ? 'text-right text-xs text-red-600 lg:text-sm'
                  : 'hidden'
              }
            >
              {validateName(name) === 0
                ? 'Name is required'
                : validateName(name) === false
                  ? 'Please enter a valid name'
                  : null}
            </p>
          </span>
          {/* ******************* EMAIL UPDATE ******************* */}
          <span className='-mt-2 w-full lg:-mt-0'>
            <div className='flex flex-col gap-1'>
              <span className='mt-2 flex flex-row items-center align-middle text-[0.9rem] text-dark-black lg:text-base'>
                <label htmlFor='name'>Email</label>
                <p className='text-red-600'>*</p>
              </span>
              <input
                value={user.user.email}
                className='cursor-not-allowed rounded-full border border-gray-300 px-4 py-3 text-[0.9rem] text-dark-grey outline-none focus:border-primary'
                disabled
              />
            </div>
          </span>
        </span>
        {/* ******************* STREET ADDRESS CONTAINER ******************* */}
        <span className='-mt-3 flex h-20 w-full flex-col lg:mt-1.5'>
          <Input
            label='Street address'
            placeholder="eg: 22 Baker's Street"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
          />
          <p
            className={
              streetError === true
                ? 'text-right text-xs text-red-600 lg:text-sm'
                : 'hidden'
            }
          >
            {validateInput(street) === false
              ? 'Street address is required'
              : street.length > 50 ? "Street address cannot exceed 50 characters" : null}
          </p>
        </span>
        {/* ******************* STATE, CITY, ZIP CODE CONTAINER ******************* */}
        <span className='grid w-full grid-rows-3 gap-2 lg:mt-2 lg:h-20 lg:grid-cols-3'>
          {/* ******************* STATE INPUT ******************* */}
          <span className='flex h-20 w-full flex-col lg:h-auto'>
            <Input
              label='State'
              placeholder='eg: California'
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
            <p
              className={
                stateError === true
                  ? 'text-right text-xs text-red-600 lg:text-sm'
                  : 'hidden'
              }
            >
              {validateName(state) === 0
                ? 'State is required'
                : validateName(state) === false
                  ? 'Please enter a valid state'
                  : null}
            </p>
          </span>
          {/* ******************* CITY INPUT ******************* */}
          <span className='flex h-20 w-full flex-col lg:h-auto'>
            <Input
              label='City'
              placeholder='eg: San Francisco'
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <p
              className={
                cityError === true
                  ? 'text-right text-xs text-red-600 lg:text-sm'
                  : 'hidden'
              }
            >
              {validateName(city) === 0
                ? 'City is required'
                : validateName(city) === false
                  ? 'Please enter a valid city'
                  : null}
            </p>
          </span>
          {/* ******************* ZIPCODE INPUT ******************* */}
          <span className='flex h-20 w-full flex-col lg:h-auto'>
            <Input
              label='Zipcode'
              placeholder='eg: 94016-9415'
              value={zipcode}
              onChange={(e) => setZipcode(e.target.value)}
            />
            <p
              className={
                zipcodeError === true
                  ? 'text-right text-xs text-red-600 lg:text-sm'
                  : 'hidden'
              }
            >
              {validatePin(zipcode) === 0
                ? 'Zipcode is required'
                : validatePin(zipcode) === false
                  ? 'Please enter a valid zipcode'
                  : null}
            </p>
          </span>
        </span>
        {/* ******************* SUBMIT & RESET BUTTON ******************* */}
        <span className='mt-4 flex flex-row items-center justify-end gap-2 lg:mt-6'>
          <button
            type='submit'
            className='group relative inline-block overflow-hidden rounded-full bg-primary px-4 py-1.5 text-white'
          >
            <span className='absolute top-0 left-0  mb-0 flex h-0 w-full translate-y-0 transform bg-secondary opacity-90 transition-all duration-300 ease-out group-hover:h-full '></span>
            <span className='relative '>Submit</span>
          </button>
          <button
            type='reset'
            className='group relative inline-block overflow-hidden rounded-full bg-dark-grey px-4 py-1.5 text-white hover:text-dark-black'
          >
            <span className='absolute top-0 left-0  mb-0 flex h-0 w-full translate-y-0 transform bg-white opacity-90 transition-all duration-300 ease-out group-hover:h-full '></span>
            <span className='relative '>Cancel</span>
          </button>
        </span>
      </form>
    </div>
  );
}
