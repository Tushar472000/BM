import useOnClickOutside from "@/hooks/useOnclickOutside";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import IconX from "../../icons/IconX";
import Image from "next/image";
import ErrorModal from "./error";
import SuccessModal from "./success";
import { AlertModalProps } from "@/interfaces/typeinterfaces";

export default function AlertModal({ closeModal, alertType }: AlertModalProps) {
    const outsideRef = useRef<HTMLDivElement>(null);
    useOnClickOutside(outsideRef, closeModal);
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.removeAttribute("style");
        };
    }, []);
    return createPortal(
        <div className="fixed inset-0 bg-[rgb(0,0,0,0.6)] backdrop-blur flex items-center justify-center pt-14">
            <div ref={outsideRef} className={`relative max-w-3xl flex justify-center h-72 px-4 py-4 bg-white rounded-3xl w-full mx-2 overflow-hidden`}>
                <div className="top-4 right-2 bg-slate-50 hover:bg-slate-100 md:p-1 absolute p-1 cursor-pointer" onClick={closeModal}>
                    <IconX className="w-5 h-5" />
                </div>
                <div className="md:flex h-[35rem] hidden w-56 -mt-4 -ml-5">
                    <Image height={400} width={400} src='https://res.cloudinary.com/bullionmentor/image/upload/Images-Icons/login-banner.webp' alt="Banner" loading='lazy'/>
                </div>
                {alertType === "error" ? (<ErrorModal />)
                    : alertType === "success" ? (<SuccessModal />)
                        : ""}
            </div>
        </div>
        , document.body);
}