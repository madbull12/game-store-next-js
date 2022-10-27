import React from "react";
import { motion, MotionValue, useSpring } from "framer-motion";

const ProgressBar = ({ progress }: { progress: MotionValue<number> }) => {
    const scaleX = useSpring(progress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
      });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 z-50 rounded-full  left-0 right-0 h-1 origin-[0%]  transform bg-[#d05aff]"
    ></motion.div>
  );
};

export default ProgressBar;
