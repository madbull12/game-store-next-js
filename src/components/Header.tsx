import React from "react";
import { motion } from "framer-motion";
import { BiSearch } from "react-icons/bi";
import Profile from "./Profile";
const Header = () => {
  return (
    <div className="ml-56 flex items-center justify-between">
      <div className=" rounded-full px-4 py-2 flex items-center gap-x-2 bg-zinc-700 flex-[0.75]">
        <BiSearch className="text-zinc-500" />
        <input
          className="w-full text-white bg-transparent  outline-none"
          type="text"
          placeholder="Search for games"
        />
      </div>
      <Profile />
    </div>
  );
};

export default Header;
