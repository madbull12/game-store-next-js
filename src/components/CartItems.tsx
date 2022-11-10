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
import { trpc } from "../utils/trpc";
import Loader from "./Loader";
import { useSession } from "next-auth/react";

const CartItems = () => {
  // const { cartItems } = useCartItem();
  const { data:session,status } = useSession();
  const { data:cartItems,isLoading } = trpc.cart.getCarts.useQuery();
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

  const handleCheckout = async () => {
    const stripe = await getStripe();
    const res = await fetch("/api/create-stripe-session", {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartItems),
      method: "POST",
    });

    console.log(res);
    const data = await res.json();
    console.log(data?.id);
    await stripe?.redirectToCheckout({ sessionId: data?.id });
  };

  if(isLoading) return <Loader />
  return (
    <motion.div
      initial={{ right: -50, opacity: 0 }}
      animate={isOpen ? "open" : "hidden"}
      exit="hidden"
      variants={variants}
      ref={menu}
      className="fixed right-0 top-0 z-50 flex min-h-screen w-72 flex-col space-y-4 bg-secondary p-4"
    >
      <IoMdClose
        className="cursor-pointer self-end text-xl text-white "
        onClick={closeCartMenu}
      />
      <>
        {status === "authenticated" ? (
          <>
            {cartItems?.length === 0 ? (
              <h1 className="text-4xl text-white font-semibold">No carts</h1>
              ) : (
                <>
                  <div className="space-y-4">
                    {cartItems?.map((item) => (
                      <CartItem item={item} key={v4()} />
                    ))}
                  </div>
                  <button
                    className="rounded-lg bg-[#bc13fe] px-4 py-2 text-white"
                    onClick={handleCheckout}
                  >
                    Buy
                  </button>
                </>
              )}
          </>
        ):(
          <h1 className="text-2xl text-white font-bold">Please login first!</h1>
        )}
      </>
   
      
    </motion.div>
  );
};

export default CartItems;
