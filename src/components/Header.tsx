import React,{ useState } from "react";
import { BiSearch } from "react-icons/bi";
import Profile from "./Profile";
import Search from "./Search";
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { useCartItem, useCartMenu, useSearchModal } from "../../lib/zustand";
import { trpc } from "../utils/trpc";
import { useSession } from "next-auth/react";
import useMediaQuery from "../../hooks/useMediaQuery";
import { useRouter } from "next/router";
const Header = () => {
  const { data:cartItems } = trpc.cart.getCarts.useQuery();
  const { status } = useSession();
  const router = useRouter();
  const { openCartMenu } = useCartMenu();
  const isNotMobile = useMediaQuery('(min-width: 768px)')
  const { setOpenModal } = useSearchModal();
  if(router.pathname==="/auth/signin") return null;

  return (
    <div className="pl-20 xs:pl-32 sm:pl-44 md:pl-60 mt-2 mr-4 gap-x-2 sm:gap-x-4 md:gap-x-8 flex items-center justify-between">
      {isNotMobile ? <Search /> : (
        <button onClick={()=>setOpenModal(true)} className="rounded-full bg-secondary text-lg xs:text-xl    p-2 text-white">
          <BiSearch />
        </button>
      )}
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
