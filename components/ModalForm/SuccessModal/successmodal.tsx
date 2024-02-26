import useEscapeKey from "@/hooks/useEscapeKey";
import useOnClickOutside from "@/hooks/useOnclickOutside";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import IconX from "../../icons/IconX";
import FormWrapper from "../FormWrapper";
import Image from "next/image";
import { SuccessModalProps } from "@/interfaces/typeinterfaces";

export default function SuccessModal({ closeModal }: SuccessModalProps) {
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
        <div className='fixed inset-0 bg-[rgb(0,0,0,0.6)] backdrop-blur flex items-center justify-center pt-14 lg:pt-24'>
            <div ref={outsideRef} className="max-w-2xl lg:max-w-4xl h-[16rem] sm:h-[15rem] md:h-[14rem] w-full lg:w-max md:w-auto lg:mx-2 mx-2 justify-center align-middle bg-white flex rounded-3xl overflow-hidden relative">
                <button onClick={closeModal} className="absolute top-4 right-4 bg-slate-50 hover:bg-slate-100 transition-colors rounded-md p-2">
                    <IconX className="h-5 w-5" />
                </button>
                <div className="w-80 h-4xl hidden sm:flex md:flex sm:h-6xl md:h-6xl sm:w-72 md:w-72 lg:flex">
                    <Image src="https://res.cloudinary.com/bullionmentor/image/upload/Images/BBD-side-banner_jd0qtr.jpg" alt="Banner" height={100} width={100} loading='lazy'/>
                </div>
                <div className="container -ml-14 w-[120%] sm:-ml-48 sm:w-full md:-ml-48 md:w-full lg:-ml-48 lg:w-full">
                    <FormWrapper title="Review Submitted" description="" footer="">
                        <div className='ml-7 flex w-full flex-col items-center gap-5 sm:w-full md:w-full lg:w-full'>
                            <Image src="https://res.cloudinary.com/bullionmentor/image/upload/Images-Icons/person-showing-thumb_vzk9xa.png" className="h-24 w-24" alt="Image" height={100} width={100} loading='lazy'/>
                            <span className='text-xl font-bold text-primary'>
                                Thanks for your review!
                            </span>
                        </div>
                    </FormWrapper>
                </div>
            </div>
        </div>,
        document.body
    )
}