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
import GameList from "../components/GameList";
import SecondHeader from "../components/SecondHeader";
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
    () => fetchData(`https://api.rawg.io/api/games?search=${q ?? search}&search_precise=${true}&`),
    {
      refetchOnWindowFocus: false,
      staleTime:1000000
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
          <SecondHeader title={` ${q}`} />
          <GameList games={games?.results as IGame[]} />
      </Body>
    </>
  );
};

export default SearchPage;
