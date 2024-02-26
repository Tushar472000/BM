import Image from "next/image"
import FormWrapper from "../FormWrapper"

export default function SuccessModal() {
    return (
        <div className="w-full h-full">
            <FormWrapper title="Contact us" description="Your request was successfully submitted" footer="">
                <div className="flex flex-col justify-center">
                    <div className="flex justify-center">
                        <Image src="https://res.cloudinary.com/bullionmentor/image/upload/Images-Icons/mail-and-tick_m23cxz.png" alt="Banner" height={120} width={120} />
                    </div>
                    <span className="text-base sm:text-[1.35rem] text-primary font-semibold text-center">Thanks for contacting us!</span>
                    <span className="text-sm sm:text-[0.9rem] text-dark-black font-normal text-center">We will get back to you soon</span>
                </div>
            </FormWrapper>
        </div>
    )
}