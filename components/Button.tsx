type ButtonProps = {
  click: () => void;
  label: string;
};

export default function Button({ label }: ButtonProps) {
  return (
    <button
      type='submit'
      className='group relative my-1 inline-block  w-full overflow-hidden rounded-full bg-primary py-2 text-white '
    >
      <span className='absolute top-0 left-0  mb-0 flex h-0 w-full translate-y-0 transform bg-secondary opacity-90 transition-all duration-300 ease-out group-hover:h-full '></span>
      <span className='relative'> {label}</span>
    </button>
  );
}
