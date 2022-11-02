import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { CartItem } from "../../lib/zustand";

interface IProps {
  item: CartItem;
}
const CartItem = ({ item }: IProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center gap-x-4 "
    >
      <Image
        className="rounded-lg"
        src={item.image}
        objectFit="cover"
        width={50}
        height={50}
      />
      <div className="text-sm text-gray-400 ">
        <p>{item.name}</p>
        <p>${item.price}</p>
      </div>
    </motion.div>
  );
};

export default CartItem;
