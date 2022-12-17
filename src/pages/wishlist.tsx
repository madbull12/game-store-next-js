import React from "react";
import { trpc } from "../utils/trpc";
import { motion } from "framer-motion";
import GameList from "../components/GameList";
import { IGame, IWishlist } from "../../interface";
import WishlistCard from "../components/WishlistCard";
import Body from "../components/Body";
const WishlistPage = () => {
  const { data: wishlists } = trpc.wishlist.getUserWishlists.useQuery();
  console.log(wishlists);

  const titleVariants = {
    hidden: {
      opacity: 0,
      x: 50,
    },
    visible: {
      opacity: 1,
      x: 0,
    },
  };

  return (
    <Body>
      <motion.h1
        initial="hidden"
        animate="visible"
        variants={titleVariants}
        className="mt-4 mr-4 mb-4 text-end text-4xl font-black capitalize text-white"
      >
        Wishlist
      </motion.h1>
      <div className="space-y-4">
        {wishlists?.map((wishlist: IWishlist) => (
          <WishlistCard wishlist={wishlist} />
        ))}
      </div>
    </Body>
  );
};

export default WishlistPage;
