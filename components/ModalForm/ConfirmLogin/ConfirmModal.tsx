import useOnClickOutside from '@/hooks/useOnclickOutside';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import useEscapeKey from '@/hooks/useEscapeKey';
import { RegisterLoginModal } from '..';
import ConfirmModalForm from './ConfirmModalForm';
import { ConfirmModalProps } from '@/interfaces/typeinterfaces';

export default function ConfirmModal({
  closeModal,
  productId
}: ConfirmModalProps) {
  const [formType, setFormType] = useState<'login' | 'modal'>('modal');
  const outsideRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(outsideRef, closeModal);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.removeAttribute('style');
    };
  }, []);
  const getLoginForm = () => setFormType('login');
  useEscapeKey(closeModal);
  return createPortal(
    <div className='fixed inset-0 flex items-center justify-center bg-[rgb(0,0,0,0.5)] pt-20 backdrop-blur lg:pt-28'>
      <div className={formType === 'login' ?
        "max-w-3xl w-full justify-center px-6 lg:px-0 md:px-0 md:py-0 sm:px-0 sm:py-0 lg:py-0 mx-2 sm:mx-6 lg:h-[31rem] md:h-[29rem] bg-white flex rounded-3xl overflow-hidden relative" :
        "max-w-4xl w-max bg-white h-36 rounded-3xl mx-2 px-4 pt-4 lg:pt-6"}
      >
        {
          formType === "login" ?
            (
              <RegisterLoginModal closeModal={closeModal} productId={productId} />
            ) :
            (
              <ConfirmModalForm closeModal={closeModal} getLoginForm={getLoginForm} />
            )
        }
      </div>
    </div>,
    document.body
  );
}
