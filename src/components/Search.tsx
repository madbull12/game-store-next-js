import React, { useState,useEffect } from "react";
import { motion, Variant } from "framer-motion";
import { BiSearch } from "react-icons/bi";
import { useRouter } from "next/router";
import  useMediaQuery from '../../hooks/useMediaQuery'
import { useSearch } from "../../lib/zustand";
import shallow from 'zustand/shallow'
import useLocalStorage from "../../hooks/useLocalStorage";
const Search = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [term,setTerm] = useSearch((state)=>[state.search,state.setSearch],shallow);
  const [search,setSearch] = useLocalStorage("search","");

  const router= useRouter();
  const matches = useMediaQuery('(min-width: 768px)')
  const small = useMediaQuery('(min-width:500px)')

  const variants:{} = {
    focused: {
      flex: matches ? 0.75 : 1,
    },
    notFocused: {
      flex: matches ? 0.25 : 0.5,
    },
  };
  const handleSubmit = (e:React.SyntheticEvent) => {
    e.preventDefault();
    setSearch(term)
    router.push(`/search?q=${term}`,undefined,{ shallow:true });
  }



  return (
    <motion.form
        onSubmit={handleSubmit}
        transition={{ duration: 0.5, type: "spring" }}
        variants={variants}
        animate={isFocused ? "focused" : "notFocused"}
        className={` flex items-center gap-x-2 w-full px-2 py-1 rounded-full bg-zinc-700  text-sm md:text-base md:px-4 md:py-2`}
    >
        <BiSearch className="text-zinc-500" />
        <input
            onChange={(e)=>setTerm(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={`w-full  bg-transparent text-white  outline-none`}
            type="text"
            placeholder={"Search for games"}
        />
    </motion.form>
    
  );
};

export default Search;
