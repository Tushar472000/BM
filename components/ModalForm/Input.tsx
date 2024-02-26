import { DetailedHTMLProps, InputHTMLAttributes } from "react";

export default function Input({
  label,
  ...props
}: DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & { label: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-dark-black lg:text-base flex flex-row items-center mt-2 text-[0.9rem] align-middle">
        <label htmlFor="name">{label}</label>
        <p className="text-red-600">*</p>
      </span>
      <input
        autoComplete="off"
        className="border border-gray-300 focus:border-primary outline-none px-4 py-3 rounded-full text-dark-grey text-[0.9rem]"
        {...props}
      />
    </div>
  );
}
