import { useQueries, useQuery } from "@tanstack/react-query";
import fetchData from "../../../rawg/fetchData";
import React, { SetStateAction, useEffect, useState } from "react";
import Body from "../../components/Body";
import { Swiper, SwiperSlide } from 'swiper/react';
import { BiLeftArrow } from "react-icons/bi";
import Loader from "../../components/Loader";
import Link from "next/link";
import { GameScreenshots, IGame, IGameDetails } from "../../../interface";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import 'swiper/css';
import Image from "next/image";
const GameDetailsPage = () => {
  const { query, isReady, back } = useRouter();


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
  } = useQuery<IGameDetails>(
    ["fetchDetails"],
    () => fetchData(`https://api.rawg.io/api/games/${query?.gameId}?`),
    {
      refetchOnWindowFocus: false,
      // refetchOnMount:true,
    
    }
  );
  const {
    data: gameScreenshots,
    isLoading:screenshotsLoading,
    refetch:screenshotRefetch,
    isFetching:screenshotFetching
  
  } = useQuery<GameScreenshots>(
    ["fetchScreenshots"],
    () => fetchData(`https://api.rawg.io/api/games/${game?.id}/screenshots?`),
    {
        staleTime:1000
      
    
    }
  );

  useEffect(()=>{
    refetch()
  },[query.gameId])

  if (isLoading)
    return (
      <div className="min-h-screen justify-center pl-60 pt-8">
        <Loader />
      </div>
    );

    if(isFetching || screenshotFetching) return <Body>{null}</Body>

  console.log(gameScreenshots)



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
        <div className="flex gap-x-4 mt-4 ">
     
            <Swiper
            // install Swiper modules
            // modules={[Navigation, Pagination, Scrollbar, A11y]}
            // spaceBetween={50}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            className="flex-[0.75]"
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}
          >
            
            <SwiperSlide>
                <Image
                className="rounded-lg object-cover"
                  src={game?.background_image ?? ""}
                  // layout="fill"
                  width={600}
                  height={400}
                />
            </SwiperSlide>
        
          {gameScreenshots?.results.map((screenshot)=>(
            <SwiperSlide>
              <Image
                className="rounded-lg object-cover"
                src={screenshot.image}
                // layout="fill"
                width={600}
                height={400}
              />
            </SwiperSlide>
          
          ))}
           
          </Swiper>
          
     
            <h1 className="text-white flex-[0.5]">{game?.description}</h1>
          
        </div>

        
      </Body>
    </>
  );
};

export default GameDetailsPage;
