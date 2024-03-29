import Image from "next/legacy/image";
import Link from "next/link";
import React from "react";
import { BiUser } from "react-icons/bi";
import { IPlatform, IPlatformData } from "../../interface";
import { motion } from "framer-motion";
import { v4 } from 'uuid'
import { useRouter } from "next/router";
interface IProps {
  platform: IPlatformData;
}
const PlatformCard = ({ platform }: IProps) => {
  const router = useRouter();
  return (
    <Link href={`/games?${router.pathname === "/genres" ? `genres=${platform.slug}` : `platform=${platform.id}`}`}>
      <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="h-72 w-full rounded-lg cursor-pointer"
    >
      <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg">
        <div>
          <Image
            layout="fill"
            src={platform?.image_background}
            objectFit="cover"
          />
        </div>
     
        <div className="platform-gradient absolute  bottom-0 left-0 right-0 h-full w-full"></div>
        <div className="relative flex w-full flex-col items-center p-4">
          <h1 className=" text-lg md:text-xl font-bold text-white truncate w-full ">{platform.name}</h1>
          <div className="flex w-full gap-x-1 sm:gap-x-2 text-sm md:text-base items-center justify-between border-b border-gray-500 pb-2">
            <p className="font-semibold text-white truncate ">Popular items</p>
            <p className="text-sm text-gray-400">
              {platform.games_count.toLocaleString()}
            </p>
          </div>
          {platform.games.slice(0, 3).map((game) => (
            <div className="flex w-full items-center gap-x-1 sm:gap-x-2 justify-between pt-1 text-[8px] xs:text-xs md:text-sm " key={v4()}>
              <Link href={`/game/${game.id}`}>
                <p className="cursor-pointer text-white underline truncate">
                  {game.name}
                </p>
              </Link>
              <div className="flex items-center gap-x-1 text-gray-400">
                <p>{game.added}</p>
                <BiUser />
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
    </Link>
    
  );
};

export default PlatformCard;
