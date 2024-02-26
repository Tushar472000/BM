import { IconMenuProps } from "@/interfaces/propsinterfaces";

export default function IconMenu({ ...props }: IconMenuProps) {
  return (
    <svg {...props} viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
      <path d='M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z' />
    </svg>
  );
}
