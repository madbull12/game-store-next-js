import { useQuery } from '@tanstack/react-query';
import fetchData from '../../../rawg/fetchData';
import { useRouter } from 'next/router';
import React,{ useEffect } from 'react'
import { IGame, IGameResp } from '../../../interface';
import Body from '../../components/Body'
import Loader from '../../components/Loader';
import { motion } from 'framer-motion';
import GameCard from '../../components/GameCard';
import { v4 } from 'uuid'
const GenrePage = () => {
    const router = useRouter();
    const {
        data: games,
        isLoading,
        refetch,
        isFetching,
      } = useQuery<IGameResp>(
        ["fetchGamesGenres"],
        () => fetchData(`https://api.rawg.io/api/games?genres=${router.query.genreId}&page_size=${100}&`),
        {
          refetchOnWindowFocus: false,
          staleTime: 1000000,
          enabled:router.isReady
        }
      );
    useEffect(()=>{
        refetch()
    },[router.query.genreId]);
    console.log(games);

        
    if (isLoading)
        return (
            <div className="min-h-screen justify-center pl-60 pt-8">
                <Loader />
            </div>
        );


  if (isFetching) return <Body>{null}</Body>;

  return (
    <Body>
        <h1 className='capitalize text-white text-6xl  font-bold mt-4'>{router.query.genreId} games</h1>
        <motion.div
            // variants={variants}
         
            // initial="hidden" // Set the initial state to variants.hidden
            // animate="enter" // Animated state to variants.enter
            // exit="exit"
            className="mt-8 grid  grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {games?.results.map((game: IGame) => (
              <GameCard game={game} key={v4()} />
            ))}
          </motion.div>

    </Body>
  )
}

export default GenrePage