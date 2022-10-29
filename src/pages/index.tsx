import type { NextPage } from "next";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";
import { trpc } from "../utils/trpc";
import {
  AnimatePresence,
  motion,
  MotionValue,
  useMotionValue,
  useTransform,
} from "framer-motion";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { IGame, IGameResp } from "../../interface";
import GameCard from "../components/GameCard";
import { v4 } from "uuid";
import { useRouter } from "next/router";
import Body from "../components/Body";
const Home: NextPage = () => {
  const [pageSize, setPageSize] = useState(false);
  const fetchGames = async () => {
    const res = await fetch(
      `https://api.rawg.io/api/games?key=${
        process.env.NEXT_PUBLIC_RAWG_API_KEY
      }&page_size=${40}`
    );
    const data = await res.json();

    return data.results;
  };

  const {
    data: games,
    isLoading,
    isError,
    refetch,
  } = useQuery<IGame[]>(["fetchGames"], fetchGames, {
    refetchOnWindowFocus: true,
    staleTime: 1000000,
  });
  console.log(games);
  useEffect(() => {
    refetch();
  }, [pageSize]);

  const variants = {
    hidden: { opacity: 0, x: 200, y: 0 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 1200,y:0 },
  };

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Body>
          <motion.h1
            variants={variants}
            initial="hidden" // Set the initial state to variants.hidden
            animate="enter" // Animated state to variants.enter
            exit="exit"
            className="mt-4 text-6xl font-bold text-white"
          >
            Highest rated games
          </motion.h1>

        <motion.div
            variants={variants}
         
            initial="hidden" // Set the initial state to variants.hidden
            animate="enter" // Animated state to variants.enter
            exit="exit"
            className="my-8 grid  grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {games?.slice(0, pageSize ? 40 : 20).map((game: IGame) => (
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
    </>
  );
};

export default Home;
