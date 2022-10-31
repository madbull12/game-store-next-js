import React from 'react'
import { BiDownArrow } from 'react-icons/bi'
import { motion } from 'framer-motion'
const PlatformDropdown = ({ platform }: {platform:string}) => {
  return (
    <div className="relative  flex cursor-pointer items-center gap-x-1 rounded-lg bg-secondary px-4 py-2 text-white">
    <span className="capitalize">{platform}</span>
    <span>
      <BiDownArrow />
    </span>
    <motion.div initial={{ opacity:0 }} animate={{opacity:1}} className="absolute right-0 left-0 top-full z-50 flex flex-col space-y-1  bg-secondary px-4  py-2 text-sm shadow-sm [&>span]:rounded-sm [&>span]:p-1">
      <span className="hover:bg-gray-400">Date added</span>
      <span className="hover:bg-gray-400">Name</span>
      <span className="hover:bg-gray-400">Release Date</span>
      <span className="hover:bg-gray-400">Popularity</span>
      <span className="hover:bg-gray-400">Average rating</span>
    </motion.div>
</div>
  )
}

export default PlatformDropdown