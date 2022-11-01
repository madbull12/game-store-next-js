import React,{ useState,useRef } from 'react'
import { BiDownArrow } from 'react-icons/bi'
import { motion } from 'framer-motion'
import useOutsideClick from '../../hooks/useOutsideClick';



const PlatformDropdown = ({ platform }: {platform:number}) => {
    const [open,setOpen] = useState<boolean>(false);
    const dropdown = useRef<HTMLDivElement>(null)
    useOutsideClick(dropdown,()=>{
        setOpen(false);
    })
  return (
    <div ref={dropdown} onClick={()=>setOpen(true)} className="relative w-36 flex justify-between cursor-pointer items-center gap-x-1 rounded-lg bg-secondary px-4 py-2 text-white">
        <span className="capitalize">{platform}</span>
        <span>
            <BiDownArrow />
        </span>
        {open && (
            <motion.div initial={{ opacity:0 }} animate={{opacity:1}} className="absolute right-0 left-0 top-full z-50 flex flex-col space-y-1  bg-secondary px-4  py-2 text-sm shadow-sm [&>span]:rounded-sm [&>span]:p-1">
                <span className="hover:bg-gray-400">PC</span>
                <span className="hover:bg-gray-400">Playstation</span>
                <span className="hover:bg-gray-400">XBox</span>
                <span className="hover:bg-gray-400">iOs</span>
                <span className="hover:bg-gray-400">Nintendo</span>
                <span className="hover:bg-gray-400">Apple</span>
            </motion.div>
        )}

    </div>
  )
}

export default PlatformDropdown