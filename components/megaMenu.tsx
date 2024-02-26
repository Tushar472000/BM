import { motion
} from "framer-motion";
import { MegaMenuProps } from "@/interfaces/propsinterfaces";

export default function MegaMenu({ children, ...rest }: MegaMenuProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
        transition: {
          duration: 0.15,
        },
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.15,
        },
      }}
      className='absolute top-full -left-1/2 lg:left-[42px] 2xl:left-16 z-50 w-max -translate-x-1/2 rounded-md bg-secondary-dark py-4 shadow-lg'
    >
      {children}
    </motion.div>
  );
}
