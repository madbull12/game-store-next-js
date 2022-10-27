import { useQuery } from "@tanstack/react-query";
import fetchData from "../../../rawg/fetchData";
import React, { SetStateAction, useEffect, useState } from "react";
import Body from "../../components/Body";

import { BiLeftArrow } from "react-icons/bi";
import Loader from "../../components/Loader";
import Link from "next/link";
import { IGame, IGameDetails } from "../../../interface";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

const GameDetailsPage = () => {
  const { query, isReady, back } = useRouter();


  console.log(isReady, query);

  // const { gameId } = router.query;
  const {
    data: game,
    isLoading,
    isFetching,
    refetch,
  } = useQuery<IGameDetails>(
    ["fetchDetails"],
    () => fetchData(`https://api.rawg.io/api/games/${query?.gameId}?`),
    {
      refetchOnWindowFocus: false,
      cacheTime:100000
    }
  );

  useEffect(()=>{
    refetch()
  },[query.gameId])

  if (isLoading || isFetching)
    return (
      <div className="min-h-screen justify-center pl-60 pt-8">
        <Loader />
      </div>
    );

  console.log(game);
  console.log(isReady)



  return (
    <>
      <Body>
        <div className="flex items-center justify-between px-4">
          <motion.button
            initial={{
              x: -50,
              opacity: 0,
            }}
            animate={{
              x: 0,
              opacity: 1,
            }}
            onClick={() => back()}
            className="mt-4 flex items-center gap-x-2 text-2xl text-white"
          >
            <BiLeftArrow />
            <p>Back</p>
          </motion.button>
          <motion.h1
            initial={{
              x: 50,
              opacity: 0,
            }}
            animate={{
              x: 0,
              opacity: 1,
            }}
            className="text-2xl font-black text-white"
          >
            {game?.name}
          </motion.h1>
        </div>
      </Body>
    </>
  );
};

export default GameDetailsPage;
