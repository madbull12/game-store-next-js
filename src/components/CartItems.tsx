import React, { useRef } from "react";
import { IoMdClose } from "react-icons/io";
import { useCartItem, useCartMenu } from "../../lib/zustand";
import { v4 } from "uuid";
import Image from "next/image";
import useOnClickOutside from "../../hooks/useOutsideClick";
import { AnimatePresence, motion } from "framer-motion";
import CartItem from "./CartItem";

const CartItems = () => {
  const { cartItems } = useCartItem();
  const { closeCartMenu, isOpen } = useCartMenu();
  const menu = useRef<HTMLDivElement>(null);
  const variants = {
    open: {
      right: 0,
      opacity: 1,
    },
    hidden: {
      right: -50,
      opacity: 0,
    },
  };
  useOnClickOutside(menu, () => {
    closeCartMenu();
  });
  return (
        <motion.div
          initial={{ right: -50, opacity: 0 }}
          animate={isOpen ? "open" : "hidden"}
          exit="hidden"
          variants={variants}
          ref={menu}
          className="fixed right-0 top-0 z-50 flex min-h-screen w-72 flex-col bg-secondary p-4"
        >
          <IoMdClose
            className="cursor-pointer self-end text-xl text-white "
            onClick={closeCartMenu}
          />
          <div className="space-y-4">
            {cartItems.map((item) => (
                <CartItem item={item}  key={v4()}/>
              
            ))}
          </div>
        </motion.div>
  );
};

export default CartItems;
