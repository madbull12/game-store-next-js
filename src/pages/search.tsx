import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { IGame, IGameResp } from "../../interface";
import GameCard from "../components/GameCard";
import { v4 } from "uuid";
import { motion } from "framer-motion";
import Loader from "../components/Loader";
import fetchData from "../../rawg/fetchData";
import Body from "../components/Body";
import ProgressBar from "../components/ProgressBar";
import { useScroll } from "framer-motion";
const SearchPage = () => {
  const { scrollYProgress } = useScroll();

  const router = useRouter();
  let search: string | null;
  // const term = useSearch((state)=>state.search);

  useEffect(function () {
    search = window.localStorage.getItem("search");
    console.log(search);
  }, []);

  const { q } = router.query;

  const {
    data: games,
    isLoading,
    refetch,
    isFetching,
  } = useQuery<IGameResp>(
    ["fetchSearch"],
    () => fetchData(`https://api.rawg.io/api/games?search=${q ?? search}&`),
    {
      refetchOnWindowFocus: false,
    }
  );
  useEffect(() => {
    const controller = new AbortController();
    // const signal = controller.signal;

    refetch();
    return () => {
      // cancel the request before component unmounts
      controller.abort();
    };
  }, [router]);

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

  if (isLoading || isFetching)
    return (
      <div className="min-h-screen justify-center pl-60 pt-8">
        <Loader />
      </div>
    );

  console.log(isLoading);
  console.log(games);

  return (
    <>
      <ProgressBar progress={scrollYProgress} />
      <Body>
        <div className="flex justify-between"></div>
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={titleVariants}
          className="mt-4 mr-4  text-end text-4xl font-black capitalize text-white"
        >
          {q}
        </motion.h1>
        <div className="mt-8 grid  grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {games?.results.map((game: IGame) => (
            <GameCard game={game} key={v4()} />
          ))}
        </div>
      </Body>
    </>
  );
};

export default SearchPage;
