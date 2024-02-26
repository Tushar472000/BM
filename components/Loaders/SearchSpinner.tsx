import { motion } from 'framer-motion';
import { BounceLoader } from 'react-spinners';

export default function SearchSpinner() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className=' flex justify-center items-center mx-2 my-2 '
        >
            <div className='mx-2 my-2 justify-center items-center'>
                <BounceLoader
                    color="#E49E2F"
                    size={50}
                />
            </div>
        </motion.div>
    );
}
