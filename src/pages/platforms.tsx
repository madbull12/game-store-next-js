import { useQuery } from "@tanstack/react-query";
import React from "react";
import { BiLeftArrow } from "react-icons/bi";
import { Platform } from "../../interface";
import fetchData from "../../rawg/fetchData";
import Body from "../components/Body";
import PlatformCard from "../components/PlatformCard";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
const PlatformsPage = () => {
  const router = useRouter();
  const {
    data: platforms,
    isLoading,
    refetch,
    isFetching,
  } = useQuery<Platform>(
    ["fetchPlatforms"],
    () => fetchData(`https://api.rawg.io/api/platforms?`),
    {
      refetchOnWindowFocus: false,
      staleTime: 1000000,
    }
  );
  console.log(platforms);
  const variants = {
    initial: {
      x: -1000,
      opacity: 0,
    },
    animate: {
      x: 0,
      opacity: 1,
    },
    exit: {
      opacity: 0,

      x: 1200,
    },
  };
  return (
    <div>
      <Body>
        <div className="flex items-center justify-between px-4">
          <motion.button
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{
              type: "string",
              damping: 10,
              stifness: 200,
            }}
            onClick={() => router.back()}
            className="mt-4 flex items-center gap-x-2 text-2xl text-white"
          >
            <BiLeftArrow />
            <p>Back</p>
          </motion.button>
          {router.isReady && (
            <motion.h1
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="mb-4 text-6xl font-black capitalize text-white"
            >
              Platforms
            </motion.h1>
          )}
        </div>
        <div className="s grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {platforms?.results.map((platform) => (
            <PlatformCard platform={platform} />
          ))}
        </div>
      </Body>
    </div>
  );
};

export default PlatformsPage;
