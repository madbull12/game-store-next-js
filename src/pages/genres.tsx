import { useQuery } from "@tanstack/react-query";
import React from "react";
import fetchData from "../../rawg/fetchData";
import { GenreResp, IGenre } from "../../interface";
import { v4 } from "uuid";
import PlatformCard from "../components/PlatformCard";
import Body from "../components/Body";

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
  console.log(genres)
  return (
    <Body>
      <div className=" grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {genres?.results.map((genre) => (
          <PlatformCard key={v4()} platform={genre} />
        ))}
      </div>
    </Body>
  );
};

export default GenrePage;
