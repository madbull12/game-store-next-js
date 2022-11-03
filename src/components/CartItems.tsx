import React, { useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useCartItem, useCartMenu } from "../../lib/zustand";
import { v4 } from "uuid";
import Image from "next/image";
import useOnClickOutside from "../../hooks/useOutsideClick";
import { AnimatePresence, motion } from "framer-motion";
import CartItem from "./CartItem";
import getStripe from "../utils/get-stripejs";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";

const CartItems = () => {
  const { cartItems } = useCartItem();
  const [loading, setLoading] = useState(false);
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

  const handleCheckout = async()=>{
    const stripe = await getStripe();
    const res = await fetch("/api/create-stripe-session",{
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(cartItems),
        method:"POST"
    });

    console.log(res)
    const data = await res.json();
    console.log(data?.id)
    await stripe?.redirectToCheckout({ sessionId:data?.id })
}
  return (
        <motion.div
          initial={{ right: -50, opacity: 0 }}
          animate={isOpen ? "open" : "hidden"}
          exit="hidden"
          variants={variants}
          ref={menu}
          className="fixed right-0 top-0 z-50 flex min-h-screen w-72 flex-col bg-secondary p-4 space-y-4"
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
          <button className="bg-[#bc13fe] rounded-lg text-white px-4 py-2" onClick={handleCheckout}>Buy</button>
        </motion.div>
  );
};

export default CartItems;
