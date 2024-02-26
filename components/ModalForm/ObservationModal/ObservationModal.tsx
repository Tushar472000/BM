import { createPortal } from "react-dom";
import useOnClickOutside from "@/hooks/useOnclickOutside";
import { useEffect, useRef } from "react";
import IconX from "../../icons/IconX";
import useEscapeKey from "@/hooks/useEscapeKey";
import ObservationError from "./ObservationError";
import ObservationSuccess from "./ObservationSuccess";
import Image from "next/image";
import { ObservationModalProps } from "@/interfaces/typeinterfaces";

export default function ObservationModal({ closeModal, alertState }: ObservationModalProps) {
    const outsideRef = useRef<HTMLDivElement>(null);
    useOnClickOutside(outsideRef, closeModal);
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.removeAttribute("style");
        };
    }, []);
    useEscapeKey(closeModal);
    return createPortal(
        <div className="fixed inset-0 bg-[rgb(0,0,0,0.5)] backdrop-blur flex justify-center items-center pt-16">
            <div className="relative flex max-w-2xl w-full md:w-[33rem] h-[14rem] mx-2 bg-white rounded-3xl" ref={outsideRef}>
                <button onClick={closeModal} className="absolute right-4 top-6 bg-slate-50 hover:bg-slate-100 rounded-md">
                    <IconX className="h-5 w-5" />
                </button>
                <Image
                    height={400}
                    width={400}
                    src="https://res.cloudinary.com/bullionmentor/image/upload/Images/BBD-side-banner_jd0qtr.jpg"
                    alt="Banner image"
                    className="invisible w-0 md:visible md:w-36 md:h-[14rem] rounded-l-3xl" loading='lazy'/>
                {alertState === "error" ? (
                    <ObservationError closeModal={closeModal} />
                ) : <ObservationSuccess closeModal={closeModal} />}
            </div>
        </div>,
        document.body
    )
}