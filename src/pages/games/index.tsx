import { useQuery } from "@tanstack/react-query";
import fetchData from "../../../rawg/fetchData";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { IGame, IGameResp } from "../../../interface";
import Body from "../../components/Body";
import Loader from "../../components/Loader";
import { motion } from "framer-motion";
import GameCard from "../../components/GameCard";
import { v4 } from "uuid";
import { BiDownArrow, BiExpand, BiLeftArrow } from "react-icons/bi";
import OrderbyDropdown from "../../components/OrderbyDropdown";
import ReleaseDateDropdown from "../../components/ReleaseDateDropdown";
import PlatformDropdown from "../../components/PlatformDropdown";
import convertToPlatform from "../../../helper/convertToPlatform";
const GenrePage = () => {
  const router: any = useRouter();
  const [pageSize, setPageSize] = useState(false);
  const [genre, setGenre] = useState("action");
  const [platform, setPlatform] = useState(4);
  const [orderby, setOrderby] = useState("popularity");
  const [releaseDate, setReleaseDate] = useState("2010-2019");
  console.log(router.query);

  const {
    data: games,
    isLoading,
    refetch,
    isFetching,
  } = useQuery<IGameResp>(
    ["fetchGamesFilter"],
    () =>
      fetchData(
        `https://api.rawg.io/api/games?genres=${
          router?.query?.genres ?? genre
        }&page_size=${100}&platforms=${router?.query?.platform ?? platform}&ordering=${orderby}&`
      ),
    {
      refetchOnWindowFocus: false,
      staleTime: 1000000,
      enabled: router.isReady,
    }
  );
  useEffect(() => {
    refetch();
  }, [router, orderby, platform]);
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
  console.log(router.query)

  return (
    <Body>
      <div className="flex items-center justify-between px-4 gap-x-4">
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
          className="flex items-center gap-x-2 text-2xl text-white"
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
            className="text-3xl md:text-5xl whitespace-nowrap font-black capitalize text-white"
          >
            {router.query.genres ?? convertToPlatform(parseInt(router.query.platform))} games
          </motion.h1>
        )}
      </div>
      <div className="mt-4 flex items-center gap-x-2 flex-wrap gap-4">
        <OrderbyDropdown orderby={orderby} setOrderBy={setOrderby} />
        <ReleaseDateDropdown releaseDate={releaseDate} />
        <PlatformDropdown platform={parseInt(router.query.platform) ?? platform} setPlatform={setPlatform} />
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
        className="mt-4 mb-2  ml-auto flex rounded-full bg-secondary py-2 px-4 font-bold text-white"
      >
        {pageSize ? "Show less" : "Show more"}
      </button>
    </Body>
  );
};

export default GenrePage;
