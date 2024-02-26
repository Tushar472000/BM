import FormWrapper from './FormWrapper';
import Input from './Input';
import { FormEvent, useEffect, useRef, useState } from 'react';
import useOnClickOutside from '@/hooks/useOnclickOutside';
import { forgotpassword } from '@/services/spot-prices';
import { validateEmail } from '@/hooks/validators';
import { useRouter } from 'next/router';
import { ResetPasswordFormProps } from '@/interfaces/typeinterfaces';

export default function ResetPasswordForm({
  closeModal,
  getLoginForm,
  setReset
}: ResetPasswordFormProps) {
  const [state, setState] = useState<'idle' | 'loading' | 'error' | 'success'>(
    'idle'
  );
  const outsideRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(outsideRef, closeModal);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.removeAttribute('style');
    };
  }, []);
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [click, setClick] = useState(false);
  const [error, setError] = useState(false);
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (
        !email ||
        validateEmail(email) === false ||
        validateEmail(email) === 0
      ) {
        setClick(true);
      } else {
        const res = await forgotpassword(email);
        if (res.success === true) {
          setReset();
          router.push(`?data=${encodeURIComponent(email)}`);
        } else {
          setClick(true);
          setError(true);
        }
      }
    } catch {
      (err: { message: any }) => alert(err.message);
    }
  };
  return (
    <div className='h-full w-full'>
      <FormWrapper
        title='Reset password'
        description='Enter Registered e-mail to reset password'
        footer={
          <>
            <hr />
            <div className='flex flex-col gap-2'>
              <span className='flex w-full flex-row items-center justify-center text-sm lg:mt-3 lg:text-base'>
                <p className='text-dark-black'>
                  Don&apos;t want to reset password?
                </p>
                &nbsp;
                <span
                  className='cursor-pointer text-primary underline hover:text-dark-black'
                  onClick={getLoginForm}
                >
                  Login
                </span>
              </span>
            </div>
          </>
        }
      >
        <form
          onSubmit={submitHandler}
          className='-mt-2 mb-2 flex flex-col gap-0.5'
        >
          {/******************** EMAIL INPUT ********************/}
          <div className='flex h-24 flex-col'>
            <Input
              label='Email'
              placeholder='eg: johndoe@gmail.com'
              onChange={(e) => {
                setEmail(e.target.value);
                setClick(false);
              }}
            />
            <p
              className={`flex justify-end text-xs lg:text-sm ${
                click === true ? 'text-red-600' : 'hidden'
              }`}
            >
              {validateEmail(email) === 0
                ? 'This Field is Required'
                : validateEmail(email) === false
                ? 'Please enter a valid email'
                : error === true
                ? 'This Email Id is not Registered'
                : null}
            </p>
          </div>
          <button
            className='my-1 w-full rounded-full bg-primary py-2 text-white hover:border-transparent hover:bg-opacity-80'
            type='submit'
          >
            Submit
          </button>
        </form>
      </FormWrapper>
    </div>
  );
}
