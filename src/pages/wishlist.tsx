import React from "react";
import { trpc } from "../utils/trpc";
import { motion } from "framer-motion";
import GameList from "../components/GameList";
import { IGame, IWishlist } from "../../interface";
import WishlistCard from "../components/WishlistCard";
import Body from "../components/Body";
import { useRouter } from "next/router";
import { BiLeftArrow } from "react-icons/bi";
import useMediaQuery from "../../hooks/useMediaQuery";
import SecondHeader from "../components/SecondHeader";
import { v4 } from 'uuid'
const WishlistPage = () => {
  const { data: wishlists } = trpc.wishlist.getUserWishlists.useQuery();
  console.log(wishlists);

  const router = useRouter();


  const small = useMediaQuery("(min-width:640px)");

  return (
    <Body>
      <SecondHeader title={"Wishlist"} />        

      <div className="space-y-4">
        {wishlists?.map((wishlist: IWishlist) => (
          <WishlistCard key={v4()} wishlist={wishlist} />
        ))}
      </div>
    </Body>
  );
};

export default WishlistPage;
