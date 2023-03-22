import React from "react";
import { motion } from "framer-motion";
import Image from "next/legacy/image";
import { CartItem, useCartItem } from "../../lib/zustand";
import { BsFillTrashFill } from "react-icons/bs";
import useHover from "../../hooks/useHover";
import { trpc } from "../utils/trpc";
import { QueryClient, useQueryClient } from "@tanstack/react-query";

interface IProps {
  item: CartItem;
}
const CartItem = ({ item }: IProps) => {
  const utils = trpc.useContext();
  
  const queryClient = useQueryClient();
  const [hoverRef, isHovering] = useHover<HTMLDivElement>();
  const { mutate:removeCartItem } = trpc.cart.deleteCart.useMutation({
    onMutate: () => {
      utils.cart.getCarts.cancel();
      const optimisticUpdate = utils.cart.getCarts.getData();
      if (optimisticUpdate) {
        utils.cart.getCarts.setData(optimisticUpdate);
      }
    },
    onSettled: () => {
      utils.cart.getCarts.invalidate();
    },
  });
  // const { removeCartItem } = useCartItem();
  const handleDelete = ()=>{
    removeCartItem({
      cartId:item.id
    })
  }
  return (
    <motion.div
      ref={hoverRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity:0 }}
      className="flex w-full items-center gap-x-4 cursor-pointer"
    >
      <Image
        className="rounded-lg"
        src={item.image}
        objectFit="cover"
        width={50}
        height={50}
      />
      <div className="flex flex-col relative text-sm text-gray-400">
        <p>{item.name}</p>
        <p>${item.price}</p>
        {isHovering && (
          <div className="absolute bottom-0 right-0 ">
            <BsFillTrashFill onClick={handleDelete} />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default CartItem;
