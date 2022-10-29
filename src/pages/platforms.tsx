import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { Platform } from '../../interface';
import fetchData from '../../rawg/fetchData';
import Body from '../components/Body';
import PlatformCard from '../components/PlatformCard';

const PlatformsPage = () => {
    const {
        data: platforms,
        isLoading,
        refetch,
        isFetching,
      } = useQuery<Platform>(
        ["fetchSearch"],
        () => fetchData(`https://api.rawg.io/api/platforms?`),
        {
          refetchOnWindowFocus: false,
          staleTime:1000000
        }
      );
      console.log(platforms)
  return (
    <div>
        <Body>
            <div className='grid grid-cols-1 s md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {platforms?.results.map((platform)=>(
                    <PlatformCard platform={platform} />
                ))}
            </div>
         
        </Body>
    </div>
  )
}

export default PlatformsPage