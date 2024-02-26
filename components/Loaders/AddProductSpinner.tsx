import { motion } from 'framer-motion';
import { BounceLoader } from 'react-spinners';

export default function AddProductSpinner() {
    return (
        <motion.div
            initial={{
                opacity: 0
            }}
            animate={{
                opacity: 1,
                transition: {
                    duration: 0.15
                }
            }}
            exit={{
                opacity: 0,
                transition: {
                    duration: 0.15
                }
            }}
            className='h-full w-full'
        >
            <div className='flex w-auto justify-center gap-2 p-2 shadow-md md:gap-0 md:px-0 md:shadow-none'>
                <BounceLoader
                    color="#E49E2F"
                    cssOverride={{}}
                    speedMultiplier={1}
                    size={70}
                />
            </div>
        </motion.div>
    )
}