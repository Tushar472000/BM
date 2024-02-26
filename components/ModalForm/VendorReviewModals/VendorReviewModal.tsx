import { useState, useEffect, useRef } from "react";
import IconX from "@/components/icons/IconX";
import { createPortal } from "react-dom";
import useEscapeKey from "@/hooks/useEscapeKey";
import useOnClickOutside from "@/hooks/useOnclickOutside";
import Image from "next/image";
import VendorReviewSuccess from "./Success";
import { VendorReviewModalProps } from "@/interfaces/typeinterfaces";

export default function VendorReviewModal({ closeModal }: VendorReviewModalProps) {
    const [formType, setFormType] = useState<"success" | "share">("success");
    const getShare = () => setFormType("share");
    useEscapeKey(closeModal);
    const outsideRef = useRef<HTMLDivElement>(null);
    useOnClickOutside(outsideRef, closeModal);
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.removeAttribute("style");
        };
    }, []);
    return createPortal(
        <div className="fixed inset-0 bg-[rgb(0,0,0,0.6)] backdrop-blur flex justify-center items-center pt-16 lg:pt-24">
            <div className={`relative max-w-3xl flex justify-center p-4 rounded-3xl w-full mx-1 overflow-hidden bg-white 
                ${formType === "success" ? "h-[14rem] md:h-48 mx-2 px-2 my-2"
                    : formType === "share" ? "h-96 sm:h-72 px-4 py-4" : ""}`}>
                <div onClick={closeModal} className="absolute top-4 right-4 p-1 bg-slate-50 hover:bg-slate-100 cursor-pointer">
                    <IconX className="h-5 w-5" />
                </div>
                <div className="hidden md:flex md:h-[30rem] w-56 -mt-4 -ml-5">
                    <Image src="https://res.cloudinary.com/bullionmentor/image/upload/Images-Icons/login-banner.webp" alt="Banner" height={400} width={400} />
                </div>
                {formType === "success" ? (<VendorReviewSuccess setShare={getShare} />) : ""}
            </div>
        </div>,
        document.body
    )
}