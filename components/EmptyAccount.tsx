import useToggle from "@/hooks/useToggle"
import Image from "next/image";
import { RegisterLoginModal } from "./ModalForm";
export default function EmptyAccount() {
    const [isLoginModalOpen, toggleLoginModal] = useToggle();
    return (
        <div className='lg:mx-32 p-2 rounded-lg shadow-md'>
            <div className='bg-opacity-60 sm:h-40 md:h-60 flex justify-center h-32 bg-white rounded'>
                <Image
                    src='https://res.cloudinary.com/bullionmentor/image/upload/Images-Icons/no-products_ydi7jw.webp'
                    className='object-fill w-full h-full'
                    alt='Banner'
                    height={400}
                    width={1800}
                />
            </div>
            <div className='text-dark-black md:pb-10 flex flex-col gap-1 px-2 py-4 pb-4 mt-2 text-sm text-center'>
                <p className='font-semibold font-size:1.5rem'>Hey There,</p>
                <p className='font-semibold font-size:1rem'>
                    You must be logged in to access this page!
                </p>
                <button onClick={toggleLoginModal} className='font-normal text-sm w-fit bg-primary px-4 py-2 mx-auto mt-2 text-white rounded-full'>
                    Login
                </button>
            </div>
            {isLoginModalOpen && <RegisterLoginModal closeModal={toggleLoginModal} />}
        </div>
    )
}