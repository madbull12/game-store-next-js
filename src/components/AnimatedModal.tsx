import React, { useRef } from "react";
import useOnClickOutside from "../../hooks/useOutsideClick";
import { useSearchModal } from "../../lib/zustand";
import Backdrop from "./Backdrop";
import Search from "./Search";
import { AnimatePresence, motion } from "framer-motion";

const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

const AnimatedModal = () => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { setOpenModal } = useSearchModal();

  useOnClickOutside(modalRef, () => {
    setOpenModal(false);
  });
  return (

      <Backdrop>
        <motion.div
          variants={dropIn}
          initial="hidden"
          animate="visible"
          exit="exit"
          ref={modalRef}
          className="mx-auto mt-44 max-w-xs rounded-lg bg-secondary p-4"
        >
          <Search />
        </motion.div>
      </Backdrop>
  );
};

export default AnimatedModal;
