import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { BiMenuAltLeft } from "react-icons/bi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IGameResp, IGenre } from "../../interface";
import fetchData from "../../rawg/fetchData";
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
import { platform } from "os";
const Sidebar = () => {
  const platformIcons = [{
    id:4,
    name:"PC",
    icon:<RiWindowsFill />
  },{
    id:18,
    name:"Playstation 4",
    icon:<RiPlaystationFill />
  },{
    id:1,
    name:"Xbox One",
    icon: <RiXboxFill />
  },{
    id:7,
    name:"Nintendo Switch",
    icon: <SiNintendoswitch />
  },
 {
    id:3,
    name:"IOS",
    icon: <SiIos />
  },
  {
    id:21,
    name:"Android",
    icon: <RiAndroidFill />
  }]

  const {
    data: genres,
    isLoading,
    refetch,
    isFetching,
  } = useQuery<IGenre>(
    ["fetchGenres"],
    () => fetchData(`https://api.rawg.io/api/genres?`),
    {
      refetchOnWindowFocus: false,
      staleTime: 1000000,
    }
  );

  console.log(genres);
  const [showAll, setShowAll] = useState(false);

  return (
    <aside className="fixed min-h-screen z-50 w-56 bg-secondary p-4 ">
      <div className="flex items-center justify-between text-white">
        <Link href="/">
          <p className="cursor-pointer text-2xl  font-black ">NXTGAME.</p>
        </Link>
        <BiMenuAltLeft className="cursor-pointer text-2xl" />
      </div>
      <ul className="mt-8 space-y-3 ">
        <li className="text-2xl font-semibold text-white">
          <Link href="/">HOME</Link>
        </li>
        <div className="rounded-thumb h-44 space-y-2 overflow-y-scroll overflow-x-hidden scrollbar-thin  scrollbar-thumb-[#bc13fe]">
          <h1 className="cursor-pointer text-2xl font-semibold text-white">
            Genres
          </h1>

          {genres?.results
            .slice(0, showAll ? genres.results.length : 3)
            .map((genre) => (
              <li className="cursor-pointer text-sm text-gray-400 px-2">
                <Link href={`/games?genres=${genre.slug}`}>
                  <motion.div
                    whileHover={{
                      scale: 1.05,
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-x-2 text-white"
                  >
                    <Image
                      src={genre.image_background}
                      width={40}
                      height={40}
                      objectFit="cover"
                      className="rounded-lg"
                    />
                    <p>{genre.name}</p>
                  </motion.div>
                </Link>
              </li>
            ))}
          <button
            onClick={() => setShowAll(!showAll)}
            className="flex animate-pulse items-center gap-x-2 text-gray-400"
          >
            <span className="rounded-lg bg-primary p-2  text-2xl">
              {showAll ? (
                <IoIosArrowUp className="text-2xl " />
              ) : (
                <IoIosArrowDown />
              )}
            </span>
            <p>{showAll ? "Hide" : "Show all"}</p>
          </button>
        </div>
        <li className="text-2xl font-semibold text-white">
          <Link href={`/platforms`}>
                Platforms
          </Link>
        </li>
        <div className="space-y-2">
          {platformIcons.map((platform)=>(
            <li className="cursor-pointer text-white text-lg">
              <Link href={`/games?platform=${platform.id}`}>
                <div className="flex items-center gap-x-2">
                  <span className="text-2xl">
                  {platform.icon}

                  </span>
                  <p >{platform.name}</p>
                </div>
              </Link>
            </li>
          ))}
        </div>
      </ul>
    </aside>
  );
};

export default Sidebar;
