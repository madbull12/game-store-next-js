import Image from 'next/image'
import React from "react";
import { IGame, IParentPlatform, IPlatform } from "../../interface";
import { motion } from 'framer-motion'
import { RiGlobalLine,RiWindowsFill,RiAndroidFill,RiPlaystationFill,RiXboxFill,RiAppleFill} from 'react-icons/ri';
import { SiIos,SiLinux,SiNintendoswitch } from 'react-icons/si';
import { v4 } from 'uuid'

interface IProps {
  game: IGame;
}

const platformIcons: Record<string, React.ReactNode> = {
  web: <RiGlobalLine />,
  pc: <RiWindowsFill />,
  android: <RiAndroidFill />,
  ios: <SiIos />,
  playstation: <RiPlaystationFill />,
  xbox: <RiXboxFill />,
  mac: <RiAppleFill />,
  linux: <SiLinux />,
  nintendo: <SiNintendoswitch />,
};

const GameCard = ({ game }: IProps) => {
  return (
    <motion.div className="rounded-2xl cursor-pointer bg-secondary text-white " whileHover={{ scale:1.05 }} whileTap={{ scale:0.95 }}>
       <div className=' rounded-2xl relative overflow-hidden w-full h-[250px]'>
            <Image src={game.background_image} objectFit="cover"  layout="fill" />
        </div>
        <div className='px-4 py-2 space-y-2'>
            <div className='flex gap-2 items-center gap-x-2 flex-wrap '>
               {game.parent_platforms.map(({ platform })=>(
                  <div key={v4()} title={platform.name}>
                    {platformIcons[platform.slug]}
                </div>
               ))}
            </div>
            <div className='flex items-center justify-between'>
              <h1>Add to cart</h1>
              <p>${(game.ratings_count / 150 ).toFixed(2)}</p>
            </div>
            <h1 className='text-2xl font-bold'>{game.name}</h1>
         
        </div>
    </motion.div>
  );
};

export default GameCard;
