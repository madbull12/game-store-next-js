import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import {
  BiHome,
  BiMenuAltLeft,
  BiListUl,
  BiCategoryAlt,
  BiCategory,
} from "react-icons/bi";
import {
  IoIosArrowDown,
  IoIosArrowUp,
  IoLogoGameControllerB,
} from "react-icons/io";
import { IGameResp, IGenre } from "../../interface";
import fetchData from "../../rawg/fetchData";
import { motion } from "framer-motion";
import { v4 } from "uuid";

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
import { useRouter } from "next/router";
import useMediaQuery from "../../hooks/useMediaQuery";
import { useSession } from "next-auth/react";
const Sidebar = () => {
  const router = useRouter();
  const { status } = useSession();
  const platformIcons = [
    {
      id: 4,
      name: "PC",
      icon: <RiWindowsFill />,
    },
    {
      id: 18,
      name: "Playstation 4",
      icon: <RiPlaystationFill />,
    },
    {
      id: 1,
      name: "Xbox One",
      icon: <RiXboxFill />,
    },
    {
      id: 7,
      name: "Nintendo Switch",
      icon: <SiNintendoswitch />,
    },
    {
      id: 3,
      name: "IOS",
      icon: <SiIos />,
    },
    {
      id: 21,
      name: "Android",
      icon: <RiAndroidFill />,
    },
  ];

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
  const small = useMediaQuery("(min-width:640px)");

  return (
    <aside className="fixed overflow-y-scroll left-0 top-0 z-50 h-screen  w-28 bg-secondary p-4 sm:w-44 md:w-56 ">
      <div className="flex items-center justify-between text-white">
        <Link href="/">
          <p className="cursor-pointer text-lg font-black  sm:text-xl  md:text-2xl ">
            NXTGAME.
          </p>
        </Link>
        {/* <BiMenuAltLeft className="cursor-pointer text-2xl" /> */}
      </div>
      <ul className="mt-8 flex flex-col items-center space-y-3 sm:items-start">
        <li className="text-2xl font-semibold text-white cursor-pointer">
          <Link href="/">
            <span className="flex flex-col items-center">
              {small ? null : <BiHome />}

              <p className="text-[10px] uppercase sm:text-2xl">Home</p>
            </span>
          </Link>
        </li>

        <li className="text-2xl font-semibold text-white cursor-pointer">
          {status === "authenticated" ? (
            <Link href="/wishlist">
              <span className="flex flex-col items-center">
                {small ? null : <BiListUl />}

                <p className="text-[10px] uppercase sm:text-2xl">Wishlist</p>
              </span>
            </Link>
          ) : null}
        </li>
        <div>
          <li className="text-2xl font-semibold text-white cursor-pointer">
            <span className="flex flex-col items-center sm:items-start">
              {small ? null : <IoLogoGameControllerB />}

              <p className="text-[10px] uppercase sm:text-2xl">Genres</p>
            </span>
          </li>

          <ul className="rounded-thumb  mt-4 h-24 items-center space-y-2  overflow-y-scroll overflow-x-hidden scrollbar-thin  scrollbar-thumb-[#bc13fe]   sm:h-40 md:h-44">
            {genres?.results
              .slice(0, showAll ? genres.results.length : 3)
              .map((genre) => (
                <li
                  className="cursor-pointer px-2 text-sm text-gray-400"
                  key={v4()}
                  onClick={() =>
                    router.push({
                      pathname: "/games",
                      query: {
                        ...router.query,
                        genres: genre.slug,
                      },
                    })
                  }
                >
                  <motion.div
                    whileHover={{
                      scale: 1.05,
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-x-2 text-white "
                  >
                    {small ? (
                      <Image
                        src={genre.image_background}
                        width={40}
                        height={40}
                        objectFit="cover"
                        className="rounded-lg"
                      />
                    ) : null}

                    <p className="text-[8px] xs:text-xs sm:text-base">
                      {genre.name}
                    </p>
                  </motion.div>
                </li>
              ))}
          </ul>

          <button
            onClick={() => setShowAll(!showAll)}
            className="flex animate-pulse  items-center gap-x-1 text-gray-400 sm:gap-x-2"
          >
            <span className="rounded-lg bg-primary p-2  text-base sm:text-2xl">
              {showAll ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </span>
            <p className="whitespace-nowrap text-xs sm:text-base">
              {showAll ? "Hide" : "Show all"}
            </p>
          </button>
        </div>
        <li className="text-2xl font-semibold text-white cursor-pointer">
          <Link href="/platforms">
            <span className="flex flex-col items-center">
              {small ? null : <IoLogoGameControllerB />}

              <p className="text-[10px] uppercase sm:text-2xl">PLATFORMS</p>
            </span>
          </Link>
        </li>
        <div className="space-y-2">
          {platformIcons.map((platform) => (
            <li
              className="cursor-pointer text-lg text-white"
              key={v4()}
              onClick={() =>
                router.replace({
                  pathname: "/games",
                  query: {
                    ...router.query,
                    platform: platform.id,
                  },
                })
              }
            >
              <div className="flex items-center gap-x-2">
                <span className="text-lg sm:text-2xl">{platform.icon}</span>
                {small ? <p>{platform.name}</p> : null}
              </div>
            </li>
          ))}
        </div>
      </ul>
    </aside>
  );
};

export default Sidebar;
