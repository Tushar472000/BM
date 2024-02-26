import IconX from './icons/IconX';
import { ToastMessageProps } from '@/interfaces/typeinterfaces';

export default function ToastMessage({
  message,
  closeMessage,
  alertState
}: ToastMessageProps) {
  return (
    <div
      className={`flex w-full flex-row items-center justify-between rounded border-l-4 ${
        alertState === true ? 'border-l-[#B70000] ' : 'border-l-[#226D42]'
      } ${alertState === true ? 'bg-[#FFEBEB]' : 'bg-[#EBFFF4] '} px-1.5 py-3`}
    >
      <div className='flex flex-row items-center gap-0.5'>
        <p
          className={`text-sm leading-6 ${
            alertState === true ? 'text-[#B70000]' : 'text-[#226D42]'
          } md:text-sm lg:text-base`}
        >
          {message}
        </p>
      </div>
      <button onClick={closeMessage}>
        <IconX
          className={`h-5 w-5 ${
            alertState === true ? 'text-[#B70000]' : 'text-[#226D42]'
          }`}
        />
      </button>
    </div>
  );
}
