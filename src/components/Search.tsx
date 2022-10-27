import React, { useState,useEffect } from "react";
import { motion, Variant } from "framer-motion";
import { BiSearch } from "react-icons/bi";
import { useRouter } from "next/router";

import { useSearch } from "../../lib/zustand";
import shallow from 'zustand/shallow'
import useLocalStorage from "../../hooks/useLocalStorage";
const Search = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [term,setTerm] = useSearch((state)=>[state.search,state.setSearch],shallow);
  const [search,setSearch] = useLocalStorage("search","");

  const router= useRouter();
  const variants:{} = {
    focused: {
      flex: 0.75,
    },
    notFocused: {
      flex: 0.25,
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
        className=" flex items-center gap-x-2 rounded-full bg-zinc-700 px-4 py-2 "
    >
        <BiSearch className="text-zinc-500" />
        <input
            onChange={(e)=>setTerm(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="w-full bg-transparent text-white  outline-none"
            type="text"
            placeholder="Search for games"
        />
    </motion.form>
    
  );
};

export default Search;
