import React,{ useState,useRef} from 'react'
import { motion } from 'framer-motion'
import { BiDownArrow } from 'react-icons/bi'
import useOutsideClick from '../../hooks/useOutsideClick';
interface IProps {
    releaseDate:string;
}
const ReleaseDateDropdown = ({ releaseDate }:IProps) => {
    const [open,setOpen] = useState<boolean>(false);
    const dropdown = useRef<HTMLDivElement>(null)
    useOutsideClick(dropdown,()=>{
        setOpen(false);
    })
  return (
    <div ref={dropdown} onClick={()=>setOpen(true)} className="relative  flex cursor-pointer items-center gap-x-1 rounded-lg bg-secondary px-4 py-2 text-white">
        <span className="capitalize">Release date: {releaseDate}</span>
        <span>
            <BiDownArrow />
        </span>
        {open && (
            <motion.div initial={{ opacity:0 }} animate={{opacity:1}} className="absolute right-0 left-0 top-full z-50 flex flex-col space-y-1  bg-secondary px-4  py-2 text-sm shadow-sm [&>span]:rounded-sm [&>span]:p-1">
                <span className="hover:bg-gray-400">2020 - 2022</span>
                <span className="hover:bg-gray-400">2010 - 2019</span>
                <span className="hover:bg-gray-400">2000 - 2009</span>
                <span className="hover:bg-gray-400">1990 - 1999</span>
                <span className="hover:bg-gray-400">1970 - 1979</span>
            </motion.div>
        )}
  
    </div>  
  )
}

export default ReleaseDateDropdown