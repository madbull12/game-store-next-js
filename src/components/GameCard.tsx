import Image from "next/image";
import React from "react";
import { IGame, IGenre, IParentPlatform, IPlatform } from "../../interface";
import { motion } from "framer-motion";
import {
  RiGlobalLine,
  RiWindowsFill,
  RiAndroidFill,
  RiPlaystationFill,
  RiXboxFill,
  RiAppleFill,
} from "react-icons/ri";
import { SiIos, SiLinux, SiNintendoswitch } from "react-icons/si";
import { v4 } from "uuid";
import moment from "moment";

import useHover from "../../hooks/useHover";
import Link from "next/link";
import { useCartItem, useCartMenu } from "../../lib/zustand";

interface IProps {
  game: IGame;
}

const platformIcons: Record<string, React.ReactNode> = {
  web: <RiGlobalLine />,
  pc: <RiWindowsFill />,
  android: <RiAndroidFill />,
  ios: <SiIos />,
  playstation: <RiPlaystationFill />,
  xbox: <RiXboxFill />,
  mac: <RiAppleFill />,
  linux: <SiLinux />,
  nintendo: <SiNintendoswitch />,
};

const GameCard = ({ game }: IProps) => {
  const [hoverRef,isHovering] = useHover<HTMLDivElement>();
  const { addCartItem,cartItems } = useCartItem();
  const { openCartMenu } = useCartMenu();

  const cardVariants = {
    hidden:{
      opacity:0,
      Y:-5
    },
    visible:{
      opacity:1,
      y:0
    }
  }

  const addToCart = async(e:React.SyntheticEvent) => {
    e.stopPropagation();
    let cart = {
      image:game.background_image,
      name:game.name,
      price:(game?.ratings_count / 150).toFixed(2),
      id:v4()
    }

    await addCartItem(cart)
    openCartMenu()
    console.log(cartItems);



  }

  const variants = {
    visible:{
      opacity:1,
      height:"auto"
    },
    hidden :{
      opacity:0,
      height:0
    }
  }

  return (
    <Link href={`/game/${game.id.toString()}`}>
      <motion.div
      className="cursor-pointer neon border-none rounded-2xl bg-secondary text-white "
      whileHover={{ scale: 1.05 }}
      // variants={cardVariants}
      whileTap={{ scale: 0.95 }}
      initial={{
        opacity:0,
        y:-5
      }}
      whileInView={{
        y:0,
        opacity:1
      }}
      viewport={{ once: true }}
      transition={{
        type: "spring",
        stiffness: 110,
        damping: 10
      }}

      
      
    >
      <div className=" relative h-[250px] w-full overflow-hidden rounded-2xl">
        {game?.background_image !== null ? (
          <Image src={game.background_image} className="object-cover" layout="fill" />

        ):null}
      </div>
      <div className="space-y-2 px-4 py-2" ref={hoverRef}>
        <div className="flex flex-wrap items-center gap-2 gap-x-2 ">
          {game?.parent_platforms?.map(({ platform }) => (
            <div key={v4()} title={platform.name}>
              {platformIcons[platform.slug]}
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <motion.button whileHover={{ scale:1.1,color:"#bc13fe" }} onClick={addToCart}>
            Add to cart
          </motion.button>
          <p>${(game?.ratings_count / 150).toFixed(2)}</p>
        </div>
        <h1 className="text-2xl font-bold">{game?.name}</h1>
        <motion.div
          variants={variants}
          initial="hidden"
          className="space-y-2 divide-y divide-gray-700 text-xs"
          animate={isHovering ? "visible" : "hidden"}
        >
          <div className="flex items-center justify-between pt-2  text-gray-400">
            <p>Release Date: </p>
            <p>{moment(game?.released).format("LL")}</p>
          </div>
          <div className="flex items-center justify-between pt-2  text-gray-400">
            <p>Genres: </p>
            <div className="flex items-center gap-x-2">
              {game?.genres.map((genre: IGenre) => (
                <p>{genre?.name}</p>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between pt-2 text-gray-400">
            <p>Rating </p>
            <p>{game?.rating}</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
    </Link>
    
  );
};

export default GameCard;
