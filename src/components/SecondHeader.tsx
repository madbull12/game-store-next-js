import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { BiLeftArrow } from "react-icons/bi";
import useMediaQuery from "../../hooks/useMediaQuery";
const SecondHeader = ({ title }: { title: string }) => {
  const titleVariants = {
    hidden: {
      opacity: 0,
      x: 50,
    },
    visible: {
      opacity: 1,
      x: 0,
    },
  };
  const variants = {
    initial: {
      x: -1000,
      opacity: 0,
    },
    animate: {
      x: 0,
      opacity: 1,
    },
    exit: {
      opacity: 0,

      x: 1200,
    },
  };
  const router = useRouter();
  const small = useMediaQuery("(min-width:640px)");

  return (
    <div className="my-6 flex items-center justify-between px-4 gap-x-2">
      <motion.button
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{
          type: "string",
          damping: 10,
          stifness: 200,
        }}
        onClick={() => router.back()}
        className=" flex items-center gap-x-2 text-base text-white xs:text-lg sm:text-2xl"
      >
        <BiLeftArrow />
        {small ? <p>Back</p> : null}
      </motion.button>
      <motion.h1
        initial="hidden"
        animate="visible"
        variants={titleVariants}
        className="text-lg truncate font-black capitalize text-white xs:text-xl sm:text-3xl md:text-5xl"
      >
        {title}
      </motion.h1>
    </div>
  );
};

export default SecondHeader;
