import React,{ useState } from "react";
import { BiSearch } from "react-icons/bi";
import Profile from "./Profile";
import Search from "./Search";
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { useCartItem, useCartMenu } from "../../lib/zustand";
const Header = () => {
  const { cartItems } = useCartItem();
  const { openCartMenu } = useCartMenu();
  return (
    <div className="ml-56 mt-2 mr-4 gap-x-8 flex items-center justify-between">
      <Search />
      <Profile />
      <div className="relative">
        <AiOutlineShoppingCart className="text-white text-xl cursor-pointer" onClick={openCartMenu} />
        <span className="absolute text-xs place-items-center grid -top-2 -right-2 w-4 h-4 rounded-full text-white bg-[#bc13fe]">
          {cartItems.length}
        </span>
      </div>
    </div>
  );
};

export default Header;
