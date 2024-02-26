import useOnClickOutside from "@/hooks/useOnclickOutside";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import useEscapeKey from "@/hooks/useEscapeKey";
import { ConfirmLogoutProps } from "@/interfaces/typeinterfaces";

export default function ConfirmLogout({ closeModal, logout }: ConfirmLogoutProps) {
    const outsideRef = useRef<HTMLDivElement>(null);
    useOnClickOutside(outsideRef, closeModal);

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.removeAttribute("style");
        };
    }, []);
    useEscapeKey(closeModal)
    return createPortal(
        <>
            <div className="fixed inset-0 bg-[rgb(0,0,0,0.6)] backdrop-blur flex items-center justify-center pt-14 lg:pt-24">
                <div
                    className="w-2xl lg:w-1/3 justify-center px-4 py-4 lg:px-0 lg:h-32 lg:py-0 sm:px-0 sm:py-0 md:px-0 md:py-0 h-32 sm:h-24 md:h-32 sm:mx-4 md:mx-4 mx-2 bg-white flex rounded-3xl overflow-hidden relative"
                    ref={outsideRef}>
                    <div className="flex flex-col w-full mr-4 ml-0 sm:ml-4 sm:mt-4 lg:mt-4">
                        <span className="text-lg lg:text-xl text-dark-black text-center font-semibold">Are you sure you want to logout?</span>
                        <div className="flex flex-row mt-5 lg:mt-6 md:mt-8 justify-center gap-4">
                            <button onClick={closeModal} className="text-white bg-gray-500 px-4 py-2 rounded-full -mt-4">
                                No
                            </button>
                            <button onClick={logout} className="text-white bg-primary px-4 py-2 rounded-full -mt-4">
                                Yes, Logout
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </>, document.body
    )
}