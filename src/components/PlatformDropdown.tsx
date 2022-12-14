import React,{ useState,useRef } from 'react'
import { BiDownArrow } from 'react-icons/bi'
import { motion } from 'framer-motion'
import useOutsideClick from '../../hooks/useOutsideClick';
import { useRouter } from 'next/router';
import convertToPlatform from '../../helper/convertToPlatform';
import { v4 } from 'uuid'

interface IProps {
    platform:number;
    setPlatform:(id:number) => void;
}

const platforms = [{
    id:4,
    name:"PC",
  },{
    id:18,
    name:"Playstation 4",
  },{
    id:1,
    name:"Xbox One",
  },{
    id:7,
    name:"Nintendo Switch",
  },
 {
    id:3,
    name:"IOS",
  },
  {
    id:21,
    name:"Android",
  },{
    id:187,
    name:"Playstation 5"
  }]

const PlatformDropdown = ({ platform,setPlatform }:IProps) => {
    const [open,setOpen] = useState<boolean>(false);
    const dropdown = useRef<HTMLDivElement>(null);
    const router:any = useRouter();
    
    useOutsideClick(dropdown,()=>{
        setOpen(false);
    })
  return (
    <div ref={dropdown} onClick={()=>setOpen(true)} className="relative w-56 flex justify-between cursor-pointer items-center gap-x-1 rounded-lg bg-secondary px-4 py-2 text-white">
        <span className="capitalize">{convertToPlatform(platform)}</span>
        <span>
            <BiDownArrow />
        </span>
        {open && (
            <motion.div initial={{ opacity:0 }} animate={{opacity:1}} className="absolute right-0 left-0 top-full z-50 flex flex-col space-y-1  bg-secondary px-4  py-2 text-sm shadow-sm [&>span]:rounded-sm [&>span]:p-1">


                {platforms.map((platform)=>(
                    <span  key={v4()} className="hover:bg-gray-400" onClick={()=>{
                        setPlatform(platform.id);
                        router.query.platform = platform.id
                        router.push(router)
                    }}>
                        {platform.name}
                    </span>
                ))}
            </motion.div>
        )}

    </div>
  )
}

export default PlatformDropdown