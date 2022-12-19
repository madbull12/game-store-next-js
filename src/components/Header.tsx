import React,{ useState } from "react";
import { BiSearch } from "react-icons/bi";
import Profile from "./Profile";
import Search from "./Search";
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { useCartItem, useCartMenu } from "../../lib/zustand";
import { trpc } from "../utils/trpc";
import { useSession } from "next-auth/react";
const Header = () => {
  const { data:cartItems } = trpc.cart.getCarts.useQuery();
  const { status } = useSession();
  const { openCartMenu } = useCartMenu();
  return (
    <div className="pl-44 sm:pl-60 mt-2 mr-4 gap-x-8 flex items-center justify-between">
      <Search />
      <Profile />
      <div className="relative">
        <AiOutlineShoppingCart className="text-white hover:text-[#bc13fe] text-xl cursor-pointer" onClick={openCartMenu} />
        {status === "authenticated" ? (
      <span className="absolute text-xs place-items-center grid -top-2 -right-2 w-4 h-4 rounded-full text-white bg-[#bc13fe]">
        {cartItems?.length}
       </span>
        ): null
        }
  
      </div>
    </div>
  );
};

export default Header;
