import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IPlatform } from "../../interface";

interface IProps {
  platform: IPlatform;
}
const PlatformCard = ({ platform }: IProps) => {
  return (
    <div className="h-72 w-full rounded-lg ">
      <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg">
        <Image
          layout="fill"
          src={platform?.image_background}
          objectFit="cover"
        />
        <div className="platform-gradient absolute  bottom-0 left-0 right-0 h-full w-full"></div>
        <div className="relative flex w-full flex-col items-center p-4">
          <h1 className="text-xl font-bold text-white  ">{platform.name}</h1>
          <div className="flex w-full items-center justify-between border-b border-gray-500 pb-2">
            <p className="font-semibold text-white">Popular items</p>
            <p className="text-sm text-gray-400">
              {platform.games_count.toLocaleString()}
            </p>
          </div>
            {platform.games.slice(0,3).map((game) => (
              <div className="flex w-full items-center justify-between text-sm pt-1 ">
                <Link href={`/game/${game.id}`}>
                  <p className="cursor-pointer text-white underline">
                    {game.name}
                  </p>
                </Link>
                <p className="text-gray-400">{game.added}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default PlatformCard;
