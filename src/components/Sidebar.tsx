import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import React,{ useState} from "react";
import { BiMenuAltLeft } from "react-icons/bi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IGameResp, IGenre } from "../../interface";
import fetchData from "../../rawg/fetchData";
const Sidebar = () => {
  const {
    data: genres,
    isLoading,
    refetch,
    isFetching,
  } = useQuery<IGenre>(
    ["fetchSearch"],
    () => fetchData(`https://api.rawg.io/api/genres?`),
    {
      refetchOnWindowFocus: false,
      staleTime: 1000000,
    }
  );

  console.log(genres);
  const [showAll,setShowAll] = useState(false);

  return (
    <aside className="fixed min-h-screen w-56 bg-secondary p-4 ">
      <div className="flex items-center justify-between text-white">
        <Link href="/">
          <p className="cursor-pointer text-2xl  font-black ">NXTGAME.</p>
        </Link>
        <BiMenuAltLeft className="cursor-pointer text-2xl" />
      </div>
      <ul className="mt-8 space-y-3 ">
        <li className="text-2xl font-semibold text-white">
          <Link href="/">HOME</Link>
        </li>
        <div className="space-y-2 overflow-y-scroll h-80 scrollbar-thin scrollbar-thumb-neutral-800 rounded-thumb">
          <h1 className="cursor-pointer text-2xl font-semibold text-white">
            Genres
          </h1>

          {genres?.results.slice(0,showAll ? genres.results.length : 3).map((genre) => (
            <li className="text-sm text-gray-400 cursor-pointer">
              <Link href="/">
                <div className="items-center flex gap-x-2 text-white">
                  <Image src={genre.image_background}  width={40} height={40} className="rounded-lg" />
                  <p>{genre.name}</p>
                </div>
              </Link>
            </li>
          ))}
          <button onClick={()=>setShowAll(!showAll)} className="flex items-center gap-x-2 animate-pulse text-gray-400">
            <span className="bg-primary p-2 rounded-lg  text-2xl">
                {showAll ? <IoIosArrowUp className="text-2xl " /> : <IoIosArrowDown /> }
                

            </span>
            <p>{showAll ? "Hide" : "Show all"}</p>
          </button>
        </div>
      </ul>
    </aside>
  );
};

export default Sidebar;
