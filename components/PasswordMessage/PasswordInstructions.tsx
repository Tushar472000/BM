import { validatePassword } from '@/hooks/validators';
import { useState } from 'react';
import { IoMdInformationCircle } from 'react-icons/io';
import { PasswordInstructionsProps } from '@/interfaces/typeinterfaces';

export default function PasswordInstructions({
  errorState,
  password,
  prevPassword
}: PasswordInstructionsProps) {
  const [showMessage, setShowMessage] = useState(false);
  return (
    <div
      className={`${
        errorState === true
          ? 'flex flex-col items-center justify-end gap-1'
          : 'hidden'
      }`}
    >
      <span className='flex w-full flex-row items-center justify-end gap-0.5'>
        <p className='text-xs text-red-600 lg:text-sm'>
          {validatePassword(password) === 0
            ? 'Password is required'
            : validatePassword(password) === false
            ? 'Password is too weak'
            : prevPassword?.match(password)
            ? 'Previous passwords cannot be used'
            : ''}
        </p>
        {validatePassword(password) !== true ? (
          <span
            className='cursor-pointer'
            onMouseEnter={() => setShowMessage(true)}
            onMouseLeave={() => setShowMessage(false)}
          >
            <IoMdInformationCircle size={18} fill='#181818' />
          </span>
        ) : (
          <span> </span>
        )}
      </span>
      {showMessage && (
        <span className='z-40 flex h-fit flex-col rounded bg-[#707575] py-3 px-2 text-xs text-white shadow-lg transition duration-150 ease-in-out lg:text-sm'>
          <p>
            Password must contain atleat 8 characters. It must include atleast 1
            uppercase letter, 1 lowercase letter, 1 digit and 1 special symbol:
            !@#$%&_-
          </p>
        </span>
      )}
    </div>
  );
}
