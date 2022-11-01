import React,{ useState } from "react";
import { BiSearch } from "react-icons/bi";
import Profile from "./Profile";
import Search from "./Search";
const Header = () => {

  return (
    <div className="ml-56 mt-2 mr-4 flex items-center justify-between">
      <Search />
      <Profile />
    </div>
  );
};

export default Header;
