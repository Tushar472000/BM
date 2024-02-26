import { FormWrapperProps } from "@/interfaces/typeinterfaces";

export default function FormWrapper({
  title,
  description,
  children,
  footer,
}: FormWrapperProps) {
  return (
    <div className="sm:py-8 w-full px-1 py-6 lg:-mt-3 xl:mt-0">
      <span className="bg-primary w-28 block h-1 mb-1 -mt-5"></span>
      <h3 className="text-dark-black mb-1 text-[1.2rem] leading-6 sm:text-[1.35rem] font-semibold">{title}</h3>
      <p className="text-dark-grey text-[0.8rem] sm:text-[0.9rem] -mt-[0.1rem] mb-2">{description}</p>
      {children}
      <div className="flex flex-col justify-center text-center">{footer}</div>
    </div>
  );
}
