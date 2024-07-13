'use client'

import { motion } from "framer-motion";

interface IProps {
    title: string,
    description: string
}
const Info = ({ title, description }: IProps) => {
    const textVariants = {
        hidden: { opacity: 0, x: -200 },
        visible: { opacity: 1, x: 0, transition: { duration: 1 } }
    };
    const text2Variants = {
        hidden: { opacity: 0, x: 200 },
        visible: { opacity: 1, x: 0, transition: { duration: 1 } }
    };

    return <>
        <div className="pb-4">
            <motion.h1 variants={textVariants}
                initial="hidden"
                animate="visible" className="font-bold text-2xl md:text-4xl lg:text-6xl uppercase">{title}</motion.h1>
            <motion.p variants={text2Variants}
                initial="hidden"
                animate="visible" className='my-2 line-clamp-6 text-default-600 font-medium text-tiny md:text-lg text-wrap '>{description}</motion.p>
        </div>
    </>;
};

export default Info;