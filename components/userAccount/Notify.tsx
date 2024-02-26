import { useState } from "react";
import ToggleSwitch from "../ToggleSwitch";

export default function Notify() {
    const [toggle, setToggle] = useState(true);
    return (
        <div className='flex flex-col rounded-lg px-3 py-6 shadow-lg'>
            {/* ******************* HEADER ******************* */}
            <h1 className='semibold relative w-full text-lg font-medium md:text-2xl'>
                Notification settings
            </h1>
            {/* ******************* TOGGLE SWITCH ******************* */}
            <span className='flex flex-row items-center justify-between'>
                <p className='text-sm leading-6 md:text-sm lg:text-base'>
                    Notify via email
                </p>
                <ToggleSwitch onChange={() => setToggle(!toggle)} checked={toggle} />
            </span>
        </div>
    )
}