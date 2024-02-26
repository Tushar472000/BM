import { resetPassword } from '@/services/spot-prices';
import Image from 'next/image';
import { FormEvent } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import ToastMessage from '@/components/ToastMessage';
import { validateInput, validatePassword } from '@/hooks/validators';
import { RegisterLoginModal } from '@/components/ModalForm';
import useToggle from '@/hooks/useToggle';
import PasswordInstructions from '@/components/PasswordMessage/PasswordInstructions';

export default function Reset() {
  const [showPassword, setShowPassword] = useState(false);
  const [alertState, setAlertState] = useState(false);
  const [message, setMessage] = useState(
    'Success! Your password has been updated.'
  );
  const [showconfirmPass, setShowconfirmPass] = useState(false);
  const [confirmPass, setconfirmPass] = useState('');
  const [newPass, setnewPass] = useState('');
  const [click, setClick] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showError, setShowError] = useState(false);
  const [isOpenModalRegister, toggleModalRegister] = useToggle();
  const router = useRouter();
  const param1 = router.query.resetToken;
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (
        validatePassword(newPass) === false ||
        validatePassword(newPass) === 0 ||
        validateInput(newPass) === false
      ) {
        setClick(true);
      } else if (newPass !== confirmPass) {
        setShowError(true);
      } else {
        const response = await resetPassword(param1 as string, confirmPass);
        if (response.success === true) {
          setAlertState(false);
          setMessage('Success! Your password has been updated.');
          setShowMessage(true);
          setTimeout(() => {
            setShowMessage(false);
            toggleModalRegister();
          }, 2000);
        } else if (response.success === false) {
          setShowError(true);
          setAlertState(true);
          setMessage('Password Reset Failed!');
          setShowMessage(true);
        }
      }
    } catch {
      (err: { message: any }) => alert(err.message);
    }
  };
  const closeMessage = () => {
    setShowMessage(false);
  };
  return (
    <>
      <div className='z-0 w-full text-dark-black'>
        <div className='h-48 w-full bg-gradient-to-b from-secondary to-white'>
          <header className='container mx-auto pt-10 text-[1.35rem] font-semibold text-white md:mt-2'>
            New Password
          </header>
        </div>
        <div className='container mx-auto mb-10'>
          <div className='-mt-28 flex h-[30rem] w-full flex-row gap-3 rounded-3xl bg-white shadow-xl'>
            {/**************** LEFT SIDE IMAGE **************/}
            <div className='hidden w-full flex-col justify-center lg:flex'>
              <div className='w-280 hidden md:flex md:h-[30rem]'>
                <Image
                  src='https://res.cloudinary.com/bullionmentor/image/upload/Images/square-banner.webp'
                  alt='Banner'
                  className='rounded-l-3xl'
                  height={480}
                  width={800}
                />
              </div>
            </div>
            {/**************** DIVIDER **************/}
            {/**************** Reset Password FORM **************/}
            <div className='mx-5 my-2 h-full w-full'>
              <div className='flex flex-col py-3 text-dark-black'>
                {showMessage && (
                  <ToastMessage
                    message={message}
                    closeMessage={closeMessage}
                    alertState={alertState}
                  />
                )}
                <h1 className='semibold relative mt-2 w-full pt-5 text-xl font-medium md:mt-10 md:text-2xl'>
                  New Password
                </h1>
                {/***************** INTRODUCTION *****************/}
                <h2 className='semibold text-sm font-medium md:text-base'>
                  Fill the following details to set new password
                </h2>
              </div>
              <form
                onSubmit={handleSubmit}
                className='-mt-2 mb-2 flex flex-col gap-0.5'
              >
                {/**************** New Password **************/}
                <div className='flex h-24 flex-col'>
                  <span className='mt-2 flex flex-row items-center align-middle text-[0.9rem] text-dark-black lg:text-base'>
                    <label>New Password</label>
                    <p className='text-red-600'>*</p>
                  </span>
                  <div className='flex items-center justify-center rounded-full border border-gray-300 px-4 py-3 align-middle outline-none focus-within:border-primary sm:text-[15px] md:text-[15px]'>
                    <input
                      className='w-11/12 border-none text-[0.9rem] text-dark-grey outline-none'
                      type={showPassword ? 'text' : 'password'}
                      onChange={(e) => {
                        setnewPass(e.target.value);
                      }}
                      placeholder='Enter new password'
                    />
                    {/**************** PASSWORD ICON ****************/}
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
                  <PasswordInstructions errorState={click} password={newPass} />
                </div>
                {/**************** Confirm Password **************/}
                <div className='flex h-24 flex-col'>
                  <span className='mt-2 flex flex-row items-center align-middle text-[0.9rem] text-dark-black lg:text-base'>
                    <label>Confirm Password</label>
                    <p className='text-red-600'>*</p>
                  </span>
                  <div className='flex items-center justify-center rounded-full border border-gray-300 px-4 py-3 align-middle outline-none focus-within:border-primary sm:text-[15px] md:text-[15px]'>
                    <input
                      className='w-11/12 border-none text-[0.9rem] text-dark-grey outline-none'
                      type={showconfirmPass ? 'text' : 'password'}
                      onChange={(e) => {
                        setconfirmPass(e.target.value);
                      }}
                      placeholder='Enter new password'
                    />
                    {/**************** PASSWORD ICON ****************/}
                    <span
                      className='cursor-pointer outline-none'
                      onClick={() => setShowconfirmPass(!showconfirmPass)}
                    >
                      <span>
                        {showconfirmPass ? (
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
                  <p
                    className={`flex justify-end text-xs lg:text-sm ${
                      click === true || showError === true
                        ? 'text-red-600'
                        : 'hidden'
                    }`}
                  >
                    {validateInput(confirmPass) === false
                      ? 'Please confirm your new password'
                      : showError && (newPass !== confirmPass) === true
                      ? 'Password Does not match'
                      : null}
                  </p>
                </div>
                <div className='w-11/12 md:w-full '>
                  <button
                    type='submit'
                    className='my-1 w-full rounded-full bg-primary py-3 text-white hover:border-transparent hover:bg-opacity-80'
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {isOpenModalRegister && (
        <RegisterLoginModal closeModal={toggleModalRegister} />
      )}
    </>
  );
}
