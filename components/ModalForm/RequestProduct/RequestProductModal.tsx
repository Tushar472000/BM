import { useEffect, useRef, useState } from 'react';
import useEscapeKey from '@/hooks/useEscapeKey';
import useOnClickOutside from '@/hooks/useOnclickOutside';
import { createPortal } from 'react-dom';
import IconX from '../../icons/IconX';
import ErrorModal from './error';
import RequestProductForm from './RequestProductForm';
import RequestSuccess from './requestSuccess';
import Image from 'next/image';
type RequestProductModalFormProps = {
  closeModal: () => void;
  handleClose?: () => void;
};
export default function RequestProductModal({
  closeModal,
  handleClose
}: RequestProductModalFormProps) {
  const handleCloseModal = () => {
    if (handleClose !== undefined) {
      handleClose();
    } else {
      closeModal();
    }
  };
  const outsideRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(outsideRef, handleCloseModal);
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.removeAttribute('style');
    };
  }, []);
  const [formType, setFormType] = useState<
    'requestForm' | 'requestSuccess' | 'error'
  >('requestForm');
  const getRequestForm = () => setFormType('requestForm');
  const getSuccess = (product?: string) => setFormType('requestSuccess');
  const getError = () => setFormType('error');
  useEscapeKey(handleCloseModal);
  return createPortal(
    <div className='fixed inset-0 z-50 mt-1 flex items-center justify-center bg-[rgb(0,0,0,0.6)] pt-16 backdrop-blur lg:pt-24'>
      <div
        ref={outsideRef}
        className={`relative flex max-w-3xl justify-center px-4 py-4 ${
          formType === 'requestForm'
            ? 'h-[30.7rem] lg:h-[32rem]'
            : formType === 'requestSuccess'
            ? 'h-80 lg:h-72'
            : formType === 'error'
            ? 'h-80 lg:h-72'
            : ''
        } mx-2 w-full overflow-hidden rounded-3xl bg-white`}
      >
        <div
          onClick={
            handleClose !== undefined ? () => handleClose() : () => closeModal()
          }
          className='absolute top-4 right-4 cursor-pointer bg-slate-50 transition-colors hover:bg-slate-100  hover:text-red-600'
        >
          <IconX className='h-5 w-5' />
        </div>
        <div className='-mt-4 -ml-5 hidden h-[35rem] w-56 md:flex'>
          <Image
            height={400}
            width={400}
            src='https://res.cloudinary.com/bullionmentor/image/upload/Images-Icons/login-banner.webp'
            alt='Banner'
          />
        </div>
        {formType === 'requestForm' ? (
          <RequestProductForm getSuccess={getSuccess} getError={getError} />
        ) : formType === 'requestSuccess' ? (
          <RequestSuccess />
        ) : formType === 'error' ? (
          <ErrorModal getRequestForm={getRequestForm} />
        ) : (
          ''
        )}
      </div>
    </div>,
    document.body
  );
}
