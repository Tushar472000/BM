import { Button } from '@material-tailwind/react';
import { ConfirmModalFormProps } from '@/interfaces/typeinterfaces';

export default function ConfirmModalForm({
  closeModal,
  getLoginForm
}: ConfirmModalFormProps) {
  return (
    <div className='flex flex-col gap-3'>
      <div>
        <p className='font-semibold leading-6 text-dark-black'>
          Please login to add product to observation
        </p>
      </div>
      <div className='flex flex-row gap-3'>
        <Button
          onClick={() => getLoginForm()}
          className='group relative inline-block overflow-hidden rounded-full bg-primary px-4 py-2 text-base font-normal text-white  '
        >
          <span className='absolute top-0 left-0  mb-0 flex h-0 w-full translate-y-0 transform bg-secondary opacity-90 transition-all duration-300 ease-out group-hover:h-full '></span>
          <span className='relative '>Login</span>
        </Button>
        <Button
          onClick={() => closeModal()}
          className='group relative inline-block overflow-hidden rounded-full bg-[#333333] px-4 py-2 text-base font-normal text-white hover:text-secondary-dark '
        >
          <span className='absolute top-0 left-0  mb-0 flex h-0 w-full translate-y-0 transform bg-white opacity-90 transition-all duration-300 ease-out group-hover:h-full '></span>
          <span className='relative '>Cancel</span>
        </Button>
      </div>
    </div>
  );
}
