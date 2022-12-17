import React from "react";
import { trpc } from "../utils/trpc";
import { motion } from "framer-motion";
import GameList from "../components/GameList";
import { IGame } from "../../interface";
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
    <div>
      <motion.h1
        initial="hidden"
        animate="visible"
        variants={titleVariants}
        className="mt-4 mr-4  text-end text-4xl font-black capitalize text-white"
      >
        Wishlist
      </motion.h1>
    </div>
  );
};

export default WishlistPage;
