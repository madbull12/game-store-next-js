import { useQuery } from "@tanstack/react-query";
import React from "react";
import fetchData from "../../rawg/fetchData";
import { GenreResp, IGenre } from "../../interface";
import { v4 } from "uuid";
import PlatformCard from "../components/PlatformCard";
import Body from "../components/Body";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { BiLeftArrow } from "react-icons/bi";
import useMediaQuery from "../../hooks/useMediaQuery";
import SecondHeader from "../components/SecondHeader";
const GenrePage = () => {
  const {
    data: genres,
    isLoading,
    refetch,
    isFetching,
  } = useQuery<GenreResp>(
    ["fetchGenres"],
    () => fetchData(`https://api.rawg.io/api/genres?`),
    {
      refetchOnWindowFocus: false,
      staleTime: 1000000,
    }
  );
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
  const small = useMediaQuery("(min-width:640px)");

  const router = useRouter();
  console.log(genres);
  return (
    <Body>
      <SecondHeader title="Genres" />
      <div className=" grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {genres?.results.map((genre) => (
          <PlatformCard key={v4()} platform={genre} />
        ))}
      </div>
    </Body>
  );
};

export default GenrePage;
