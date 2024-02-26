import { BiChevronDown } from "react-icons/bi";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { AccordionProps } from "@/interfaces/propsinterfaces";

export default function Accordion({ title, children }: AccordionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      <button
        onClick={() => setExpanded(!expanded)}
        className='flex items-center w-full justify-between text-sm font-medium py-4'
      >
        <p className='text-white'>{title}</p>
        <motion.span
          animate={{
            rotate: expanded ? "180deg" : "0",
          }}
        >
          <BiChevronDown className='text-white w-5 h-5' />
        </motion.span>
      </button>
      <motion.div
        ref={ref}
        initial={{ height: 0, overflow: "hidden" }}
        animate={{ height: !expanded ? 0 : ref?.current?.scrollHeight }}
      >
        {children}
      </motion.div>
    </div>
  );
}
