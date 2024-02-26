import { FormEvent, useState } from 'react';
import ToastMessage from '../ToastMessage';
import { cleanString, validatePassword } from '@/hooks/validators';
import { updatePassword } from '@/services/spot-prices';
import useToggle from '@/hooks/useToggle';
import Modal from '../ModalForm/Modal';
import PasswordInstructions from '../PasswordMessage/PasswordInstructions';
import { useSelector } from 'react-redux';
import { selectUser } from '@/features/userSlice';

export default function UpdatePassword() {
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfPassword, setShowConfPassword] = useState(false);
  const [message, setMessage] = useState('Details updated successfully');
  const [showMessage, setShowMessage] = useState(false);
  const [error, setError] = useState(false);
  const [alertState, setAlertState] = useState(false);
  const [isRegisterModal, toggleModalReggister] = useToggle();
  const user = useSelector(selectUser);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      validatePassword(password) === 0 ||
      validatePassword(confPassword) === 0 ||
      validatePassword(confPassword) === false ||
      password.match(confPassword)
    ) {
      setError(true);
    } else {
      if (user.user.email) {
        const response = await updatePassword(
          user.user.email,
          password,
          confPassword
        );
        if (response.success === true) {
          setAlertState(false);
          setMessage(
            'Password updated successfully. Please login to Bullion Mentor with updated password'
          );
          setShowMessage(true);
          setTimeout(() => {
            setShowMessage(false);
            if (showMessage === false) {
              window.location.reload();
            }
          }, 4000);
        } else if (response.success === false) {
          setAlertState(true);
          setMessage(response.data);
          setShowMessage(true);
          setTimeout(() => setShowMessage(false), 4000);
        }
      }
    }
  };
  const closeMessage = () => {
    setShowMessage(false);
  };
  return (
    <div className='flex-col rounded-lg px-3 py-6 shadow-lg'>
      {/* ******************* HEADER ******************* */}
      <span className='flex flex-col gap-0.5'>
        <h1 className='semibold relative w-full text-lg font-medium md:text-2xl'>
          Update Password
        </h1>
        {showMessage && (
          <ToastMessage
            message={message}
            closeMessage={closeMessage}
            alertState={alertState}
          />
        )}
      </span>
      {/* ******************* UPDATE PASSWORD FORM ******************* */}
      <form onSubmit={handleSubmit}>
        {/* ******************* PASSWORD & CONFIRM PASSWORD INPUT CONTAINER ******************* */}
        <span className='flex flex-col py-2 lg:gap-3'>
          {/* ******************* PASSWORD INPUT CONTAINER ******************* */}
          <div className='flex h-24 flex-col md:h-20'>
            {/* ******************* LABEL ******************* */}
            <span className='mt-2 flex flex-row items-center align-middle text-[0.9rem] text-dark-black lg:text-base'>
              <label>Current Password</label>
              <p className='text-red-600'>*</p>
            </span>
            {/* ******************* PASSWORD INPUT ******************* */}
            <div className='flex items-center justify-center rounded-full border border-gray-300 px-4 py-3 align-middle outline-none focus-within:border-primary sm:text-[15px] md:text-[15px]'>
              <input
                className='w-11/12 border-none text-[0.9rem] text-dark-grey outline-none'
                type={showPassword ? 'text' : 'password'}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder='Minimum 8 characters'
              />
              {/* ******************* PASSWORD ICON ******************* */}
              <span
                className='cursor-pointer outline-none'
                onClick={() => setShowPassword(!showPassword)}
              >
                <span>
                  {showPassword ? (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='#4D4D4D'
                      className='h-6 w-6'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88'
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='#4D4D4D'
                      className='h-6 w-6'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z'
                      />
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                      />
                    </svg>
                  )}
                </span>
              </span>
            </div>
            {/* ******************* ERROR MESSAGE ******************* */}
            <p
              className={
                error === true
                  ? 'text-right text-xs text-red-600 lg:text-sm'
                  : 'hidden'
              }
            >
              {cleanString(password).length === 0
                ? 'Current password is required'
                : ''}
            </p>
          </div>
          {/* ******************* CONFIRM PASSWORD INPUT CONTAINER ******************* */}
          <div className='flex h-24 flex-col'>
            {/* ******************* LABEL ******************* */}
            <span className='mt-2 flex flex-row items-center align-middle text-[0.9rem] text-dark-black lg:text-base'>
              <label>New Password</label>
              <p className='text-red-600'>*</p>
            </span>
            {/* ******************* CONFIRM PASSWORD INPUT ******************* */}
            <div className='flex items-center justify-center rounded-full border border-gray-300 px-4 py-3 align-middle outline-none focus-within:border-primary sm:text-[15px] md:text-[15px]'>
              <input
                className='w-11/12 border-none text-[0.9rem] text-dark-grey outline-none'
                type={showConfPassword ? 'text' : 'password'}
                value={confPassword}
                onChange={(e) => {
                  setConfPassword(e.target.value);
                }}
                placeholder='Minimum 8 characters'
              />
              {/* ******************* PASSWORD ICON ******************* */}
              <span
                className='cursor-pointer outline-none'
                onClick={() => setShowConfPassword(!showConfPassword)}
              >
                <span>
                  {showConfPassword ? (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='#4D4D4D'
                      className='h-6 w-6'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88'
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='#4D4D4D'
                      className='h-6 w-6'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z'
                      />
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                      />
                    </svg>
                  )}
                </span>
              </span>
            </div>
            {/* ******************* ERROR MESSAGE ******************* */}
            <PasswordInstructions
              errorState={error}
              password={confPassword}
              prevPassword={password}
            />
          </div>
        </span>
        <button
          type='submit'
          className='group relative mt-4 inline-block overflow-hidden rounded-full bg-primary px-5 py-1.5 text-white'
        >
          <span className='absolute top-0 left-0  mb-0 flex h-0 w-full translate-y-0 transform bg-secondary opacity-90 transition-all duration-300 ease-out group-hover:h-full '></span>
          <span className='relative '>Update</span>
        </button>
      </form>
      {isRegisterModal && <Modal closeModal={toggleModalReggister} />}
    </div>
  );
}
