import Image from "next/image";
import React from "react";
import { IWishlist } from "../../interface";
import { trpc } from "../utils/trpc";

const WishlistCard = ({ wishlist }: { wishlist: IWishlist }) => {
    const utils = trpc.useContext()
  const { mutate: addCart } = trpc.cart.addCart.useMutation({
    onSuccess: () => {
      utils.cart.getCarts.invalidate();
    },
  });
  const { mutate: deleteFromWishlist } =
    trpc.wishlist.deleteFromWishlist.useMutation({
      onSuccess() {
        utils.wishlist.getUserWishlists.invalidate();
      },
    });

  return (
    <div className="neon flex items-center gap-y-4 gap-x-4 rounded-lg bg-primary flex-col md:flex-row p-4 text-white">
      <div className="relative h-44 w-full md:w-36 ">
        <Image
          className="rounded-lg"
          objectFit="cover"
          src={wishlist.image}
          layout="fill"
        />
      </div>
      <div >
        <p >{wishlist.name}</p>
      </div>
      <div className=" md:ml-auto flex flex-col  justify-between">
        <p className="justify-self-end text-white text-center">$ {wishlist.price}</p>
        <div className="flex items-center gap-x-2 flex-col space-y-2 md:flex-row justify-center">
          <button className="whitespace-nowrap rounded-lg bg-secondary px-4 py-2 font-bold text-white">
            Remove
          </button>
          <button className="whitespace-nowrap rounded-lg bg-secondary px-4 py-2 font-bold text-white">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default WishlistCard;
