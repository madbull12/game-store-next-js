import React, { useState } from "react";
import { motion } from "framer-motion";
import { IGame } from "../../interface";
import GameCard from "./GameCard";
import { v4 } from "uuid";
const GameList = ({ games }: { games: IGame[] }) => {
  const variants = {
    hidden: { opacity: 0, x: 200, y: 0 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 1200, y: 0 },
  };
  const [pageSize, setPageSize] = useState(false);

  return (
    <>
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
      {games?.length >= 20 ? (
        <button
          onClick={() => setPageSize((prev) => !prev)}
          className="mt-4 mb-2  ml-auto flex rounded-full bg-secondary py-2 px-4 font-bold text-white"
        >
          {pageSize ? "Show less" : "Show more"}
        </button>
      ) : null}
    </>
  );
};

export default GameList;
