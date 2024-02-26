import { ToggleSwitchProps } from "@/interfaces/propsinterfaces";

export default function ToggleSwitch({
  checked = false,
  onChange,
  label,
}: ToggleSwitchProps) {
  return (
    <label className='flex items-center space-x-2 cursor-pointer'>
      {label && (
        <span className='font-medium text-xs md:text-base'>{label}</span>
      )}

      <div className='relative'>
        <input
          type='checkbox'
          className='sr-only'
          checked={checked}
          onChange={onChange}
        />
        <div
          className={`w-12 h-6 bg-white border  rounded-full shadow-inner ${
            checked ? "border-primary" : "border-gray-500"
          }`}
        ></div>
        <div
          className={`${
            checked ? "bg-primary" : "bg-gray-700"
          } absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full transition-transform duration-200 ${
            checked ? "translate-x-6 ml-0.5" : "translate-x-0.5"
          }`}
        ></div>
      </div>
    </label>
  );
}
