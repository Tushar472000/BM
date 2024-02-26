import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { TextClamperProps } from "@/interfaces/propsinterfaces";

export default function TextClamper({
  showButton,
  children,
  className = "",
  initialHeight = 65,
  desc
}: TextClamperProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (desc?.length as number > 150) {
      setShow(true)
    } else {
      setShow(false)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
      <motion.div
        ref={ref}
        className={`${className} ${isExpanded ? "line-clamp-none" : "line-clamp-4"
          }`}
        initial={{
          height: initialHeight,
        }}
        animate={{
          height: isExpanded ? ref.current?.scrollHeight : initialHeight,
        }}
      >
        {children}
      </motion.div>
      {show === true && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className=' text-[0.7rem]  md:text-sm text-primary underline font-semibold absolute right-6'
        >
        </button>
      )}
    </>
  );
}
