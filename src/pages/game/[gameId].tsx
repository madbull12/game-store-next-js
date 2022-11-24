import { useQueries, useQuery } from "@tanstack/react-query";
import fetchData from "../../../rawg/fetchData";
import React, { SetStateAction, useEffect, useState } from "react";
import Body from "../../components/Body";
import { Swiper, SwiperSlide } from "swiper/react";
import { BiArrowToBottom, BiExpand, BiLeftArrow } from "react-icons/bi";
import Loader from "../../components/Loader";
import Link from "next/link";
import { v4 } from 'uuid'
import {
  GameScreenshots,
  IGame,
  IGameDetails,
  IParentPlatform,
  IPlatform,
} from "../../../interface";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Image from "next/image";
import parse from "html-react-parser";

import { rawgClient } from "../../../lib/axios";
import { Scrollbar, Navigation, Pagination, A11y, EffectFade } from "swiper";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import moment from "moment";
const GameDetailsPage = () => {
  const { query, isReady, back } = useRouter();
  const [showMore, setShowMore] = useState(false);

  const fetchDetails = async () => {
    const res = await rawgClient.get(
      `/games/${query?.gameId}?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}`
    );
    return res.data;
  };

  // console.log(game)
  console.log(isReady, query);
  // const [gameDetails, gameScreenshots] = useQueries({
  //   queries: [
  //     {
  //       queryKey: ['gameDetails'],
  //       queryFn: () => fetchData(`https://api.rawg.io/api/games/${query?.gameId}?`)

  //     },

  //     {
  //       queryKey: ['gameScreenshots'],
  //       queryFn: () => fetchData(`https://api.rawg.io/api/games/${game?.id}/screenshots?`)

  //     },
  //   ],
  // });

  // const { gameId } = router.query;
  const {
    data: game,
    isLoading,
    isFetching,

    refetch,
  } = useQuery<IGameDetails>(["fetchDetails"], fetchDetails, {
    refetchOnWindowFocus: false,
    // refetchOnMount:true,
  });
  const {
    data: gameScreenshots,
    isLoading: screenshotsLoading,
    isFetching: screenshotFetching,
  } = useQuery<GameScreenshots>(
    ["fetchScreenshots"],
    () => fetchData(`https://api.rawg.io/api/games/${game?.id}/screenshots?`),
    {
      enabled: !isFetching,
      refetchOnWindowFocus: false,
    }
  );

  // useEffect(()=>{
  //   refetch()
  // },[query.gameId])

  if (isLoading)
    return (
      <div className="min-h-screen justify-center pl-60 pt-8">
        <Loader />
      </div>
    );

  if (isFetching || screenshotFetching) return <Body>{null}</Body>;

  // console.log(gameScreenshots)
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

  const showMoreVariants = {
    show: {
      height: "auto",
      opacity: 1,
    },
    hidden: {
      height: 0,
      opacity: 0,
    },
  };

  return (
    <>
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
            onClick={() => back()}
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
            className="text-2xl font-black text-white"
          >
            {game?.name}
          </motion.h1>
        </div>
        <motion.div
          variants={variants}
          initial="initial"
          transition={{
            type: "string",
            damping: 10,
            stifness: 200,
          }}
          animate="animate"
          exit="exit"
          className="mt-4 flex gap-x-4 "
        >
          <Swiper
            // install Swiper modules
            modules={[Navigation, Pagination, Scrollbar, A11y, EffectFade]}
            // spaceBetween={50}
            speed={700}
            slidesPerView={1}
            navigation={true}
            loop
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            className="neon relative flex-[0.75] rounded-lg text-white hover:cursor-grab active:cursor-grabbing"
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log("slide change")}
          >
            <SwiperSlide>
              <Image
                className="rounded-lg object-cover transition-all duration-200 ease-in-out hover:scale-110 "
                src={game?.background_image ?? ""}
                layout="fill"
                // width={600}
                // height={400}
              />
            </SwiperSlide>

            {gameScreenshots?.results.map((screenshot) => (
              <SwiperSlide key={v4()}>
                <Image
                  className="rounded-lg object-cover transition-all duration-200 ease-in-out hover:scale-110 "
                  src={screenshot.image}
                  layout="fill"
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="neon mr-2 flex-[0.5] rounded-lg">
            <div className="rounded-thumb inset-shadow relative h-96 overflow-y-scroll rounded-lg bg-primary  p-4 text-sm leading-relaxed text-gray-400   scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[#d05aff] scrollbar-thumb-rounded-full">
              <h1 className="mb-2 text-2xl font-bold text-white ">About</h1>
              {parse(game?.description!)}
            </div>
            <div className=" bg-[#1c021f] p-4 text-white">
              <button
                className="ml-auto flex gap-x-2"
                onClick={() => setShowMore(!showMore)}
              >
                <span>{showMore ? "Hide" : "More"}</span>
                {showMore ? <IoIosArrowUp className="animate-bounce" /> : <IoIosArrowDown className="animate-bounce" />}
                
              </button>
              <motion.div
                variants={showMoreVariants}
                animate={showMore ? "show" : "hidden"}
                className={`text-smtext-gray-400 space-y-2  overflow-hidden`}
              >
                <p className="text-lg font-semibold text-white">
                  {game?.name_original}
                </p>
                <div className="flex text-sm items-center justify-between pt-2  text-gray-400">
                  <p>Release Date: </p>
                  <p>{moment(game?.released).format("LL")}</p>
                </div>
                <div className="flex text-sm items-center justify-between pt-2  text-gray-400">
                  <p>ESRB: </p>
                  <p>{game?.esrb_rating?.name}</p>
                </div>
                <div className="flex-between text-sm flex justify-between gap-x-2 pt-2  text-gray-400">
                  <p>Platforms: </p>
                  <div className="flex  flex-wrap gap-x-2">
                    {game?.platforms.map((platform) => (
                      <p className="whitespace-nowrap" key={v4()}>
                        {platform.platform.name},
                      </p>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* <p className="text-gray-400 flex-[0.5]">{convertStringToHTML(game?.description)}</p> */}
        </motion.div>

        <motion.div
          variants={variants}
          initial="initial"
          transition={{
            type: "string",
            damping: 10,
            stifness: 200,
          }}
          animate="animate"
          exit="exit"
          className="mt-2 w-1/2 text-sm leading-6 tracking-wide text-gray-400 "
        >
          <div>
            <h1 className="mb-4 text-lg font-bold text-white">
              System requirements for PC
            </h1>
            <div className="flex flex-col">
              {game?.platforms
                .filter((platform) => platform.platform.name === "PC")
                .map((platform) => (
                  <div className="space-y-3" key={v4()}>
                    <div className="flex flex-col">
                      <p>Minimum</p>
                      <p>
                        {platform.requirements.minimum?.replace(
                          "Recommended:",
                          ""
                        )}
                      </p>
                    </div>
                    <div className="flex flex-col">
                      <p>Recommended</p>
                      <p>
                        {platform.requirements.recommended?.replace(
                          "Recommended:",
                          ""
                        )}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </motion.div>
      </Body>
    </>
  );
};

export default GameDetailsPage;
