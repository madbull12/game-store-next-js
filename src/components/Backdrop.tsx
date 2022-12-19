import React from "react";
import { motion } from "framer-motion";

const Backdrop = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute top-0 right-0 bottom-0 left-0 z-[999] bg-[#0007]"
    >
      {children}
    </motion.div>
  );
};

export default Backdrop;
