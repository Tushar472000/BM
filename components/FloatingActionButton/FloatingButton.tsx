import { FormEvent, useRef, useState } from "react"
import { FaEnvelope } from "react-icons/fa"
import FormWrapper from "../ModalForm/FormWrapper"
import useEscapeKey from "@/hooks/useEscapeKey"
import IconX from "../icons/IconX"
import Input from "../ModalForm/Input"
import { validateEmail, validateInput, validateName } from "@/hooks/validators"
import { contact } from "@/services/spot-prices"
import useOnClickOutside from "@/hooks/useOnclickOutside"
import Image from "next/image"
import { FloatingFormProps } from "@/interfaces/typeinterfaces";

export default function FloatingButton() {
    const [showForm, setShowForm] = useState(false)
    return <>
        {showForm === true ?
            <FloatingForm closeForm={() => setShowForm(false)} />
            : <div className="fixed bottom-1 right-2 flex p-3 bg-primary rounded-full shadow-2xl z-10 cursor-pointer" onClick={() => setShowForm(true)}>
                <FaEnvelope fill="#fff" size={25} />
            </div>
        }
    </>
}
export function FloatingForm({ closeForm }: FloatingFormProps) {
    const outsideRef = useRef<HTMLDivElement>(null);
    useOnClickOutside(outsideRef, closeForm);
    useEscapeKey(closeForm)
    const [user, setUser] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [nameError, setNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [messageError, setMessageError] = useState(false);
    const [success, setSuccess] = useState(false);
    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateName(user.name) === 0 || validateName(user.name) === false || validateEmail(user.email) === 0 || validateEmail(user.email) === false || validateInput(user.message) === false) {
            if (validateName(user.name) === 0 || validateName(user.name) === false) {
                setNameError(true);
            }
            if (validateEmail(user.email) === 0 || validateEmail(user.email)) {
                setEmailError(true)
            }
            if (validateInput(user.message) === false) {
                setMessageError(true)
            }
        } else {
            const res = await contact(user.name, user.email, user.message);
            if (res === true) {
                setSuccess(true)
            }
        }
    }
    return (
        <div className="fixed right-2 bottom-2 z-10 flex items-center justify-center pt-16 lg:pt-24">
            <div className="relative flex w-72 lg:w-80 h-auto justify-center bg-white shadow-xl px-4 py-4 rounded-lg" ref={outsideRef}>
                {/* ******************** CLOSING BUTTON ******************** */}
                <div className='absolute top-4 right-1 cursor-pointer bg-slate-50 p-1 hover:bg-slate-100 rounded' onClick={closeForm}>
                    <IconX className="h-4 w-4" />
                </div>
                {/* ******************** CONTACT FORM ******************** */}
                <FormWrapper title="Leave us a message" description="" footer="">
                    {success === false ?
                        <form onSubmit={submitHandler}>
                            {/* ******************** NAME INPUT ******************** */}
                            <div className="flex flex-col gap-0.5 h-20">
                                <Input label="Name" placeholder="eg: John Doe" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} />
                                <p className={nameError === true ? "flex justify-end text-xs lg:text-sm text-red-600" : "hidden"}>
                                    {validateName(user.name) === 0 ? "Name is required" : validateName(user.name) === false ? "Please enter a valid name" : null}
                                </p>
                            </div>
                            {/* ******************** EMAIL INPUT ******************** */}
                            <div className="flex flex-col gap-0.5 h-20">
                                <Input label="Email" placeholder="eg:johndoe@gmail.com" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
                                <p className={emailError === true ? "flex justify-end text-xs lg:text-sm text-red-600" : "hidden"}>
                                    {validateEmail(user.email) === 0 ? "Email is required" : validateEmail(user.email) === false ? "Please enter a valid email" : null}
                                </p>
                            </div>
                            {/* ******************** MESSAGE INPUT ******************** */}
                            <div className="flex flex-col gap-0.5 h-28">
                                {/* ******************** INPUT LABEL ******************** */}
                                <span className='mt-2 flex flex-row items-center align-middle text-[0.9rem] text-dark-black lg:text-base'>
                                    <label htmlFor='message'>Message</label>
                                    <p className='text-red-600'>*</p>
                                </span>
                                <textarea
                                    id="noscroll"
                                    className='overflow-y-scroll rounded-xl border border-gray-300 px-4 py-3 text-[0.9rem] text-dark-grey outline-none focus:border-primary'
                                    placeholder="Message"
                                    value={user.message}
                                    onChange={(e) => setUser({ ...user, message: e.target.value })}
                                    cols={25}
                                    rows={2}></textarea>
                                <p className={messageError === true ? "flex justify-end text-xs lg:text-sm text-red-600" : "hidden"}>{validateInput(user.message) === false ? "Message is required" : null}</p>
                            </div>
                            <div className="flex justify-end">
                                <button className="px-4 py-1.5 bg-primary text-white rounded-full" type="submit">Submit</button>
                            </div>
                        </form>
                        : <div className="relative flex flex-col justify-center items-center">
                            <Image src="https://res.cloudinary.com/bullionmentor/image/upload/Images-Icons/mail-and-tick_m23cxz.png" height={80} width={80} alt="Banner" loading='lazy'/>
                            <span className="text-base sm:text-[1.35rem] text-primary font-semibold text-center">Thanks for contacting us!</span>
                            <span className="text-sm sm:text-[0.9rem] text-dark-black font-normal text-center">We will get back to you soon</span>
                        </div>}
                </FormWrapper>
            </div>
        </div>
    )
}