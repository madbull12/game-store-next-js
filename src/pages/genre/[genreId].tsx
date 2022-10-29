import { useQuery } from "@tanstack/react-query";
import fetchData from "../../../rawg/fetchData";
import { useRouter } from "next/router";
import React, { useEffect,useState } from "react";
import { IGame, IGameResp } from "../../../interface";
import Body from "../../components/Body";
import Loader from "../../components/Loader";
import { motion } from "framer-motion";
import GameCard from "../../components/GameCard";
import { v4 } from "uuid";
import { BiLeftArrow } from "react-icons/bi";
const GenrePage = () => {
  const router = useRouter();
  const [pageSize, setPageSize] = useState(false);

  const {
    data: games,
    isLoading,
    refetch,
    isFetching,
  } = useQuery<IGameResp>(
    ["fetchGamesGenres"],
    () =>
      fetchData(
        `https://api.rawg.io/api/games?genres=${
          router.query.genreId
        }&page_size=${100}&`
      ),
    {
      refetchOnWindowFocus: false,
      staleTime: 1000000,
      enabled: router.isReady,
    }
  );
  useEffect(() => {
    refetch();
  }, [router.query.genreId]);
  console.log(games);
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

  if (isLoading)
    return (
      <div className="min-h-screen justify-center pl-60 pt-8">
        <Loader />
      </div>
    );

  if (isFetching) return <Body>{null}</Body>;

  return (
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
          <motion.h1
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="text-6xl capitalize font-black text-white"
          >
              {router.query.genreId} games

          </motion.h1>
        </div>
      
      <motion.div
        variants={variants}
        initial="hidden" // Set the initial state to variants.hidden
        animate="enter" // Animated state to variants.enter
        exit="exit"
        className="mt-8 grid  grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
      >
        {games?.results.slice(0, pageSize ? 40 : 20).map((game: IGame) => (
          <GameCard game={game} key={v4()} />
        ))}
      </motion.div>

      <button
          onClick={() => setPageSize((prev) => !prev)}
          className="mt-4 mb-2  rounded-full ml-auto flex bg-secondary py-2 px-4 font-bold text-white"
        >
          {pageSize ? "Show less" : "Show more"}
        </button>
    </Body>
  );
};

export default GenrePage;
