import { IconAddProps } from "@/interfaces/propsinterfaces";

export default function IconAdd({ ...props }: IconAddProps) {
  return (
    <svg {...props} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
      <path d='M12 5v14M5 12h14' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  );
}
