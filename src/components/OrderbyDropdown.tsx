import React,{ useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { BiDownArrow } from 'react-icons/bi'
import useOutsideClick from '../../hooks/useOutsideClick';

interface IProps {
  orderby:string;
  setOrderBy:(ordering:string)=>void
}

const ordering = [{
  name:"Date added",
  slug:"added"
},{
  name:"Name",
  slug:"name"
},{
  name:"Release Date",
  slug:"released"
},{
  name:"Popularity",
  slug:"popularity"
},{
  name:"Average rating",
  slug:"rating"
}]

const OrderbyDropdown = ({ orderby,setOrderBy }:IProps) => {
  const [open,setOpen] = useState<boolean>(false);
  const slugToName= (slug:string) => {
    switch(slug) {
      case "name":
        return "Name"
      case "released":
        return "Release Date"
      case "rating":
        return "Average rating";
      case "popularity":
        return "Popularity";
      case "added":
        return "Date added"
      default:
        break;
    }
  }
  const dropdown = useRef<HTMLDivElement>(null)
  useOutsideClick(dropdown,()=>{
      setOpen(false);
  })
  return (
    <div ref={dropdown} onClick={()=>setOpen(true)} className="relative w-56 justify-between  flex cursor-pointer items-center gap-x-1 rounded-lg bg-secondary px-4 py-2 text-white">
          <span className="capitalize">Order: {slugToName(orderby)}</span>
          <span>
            <BiDownArrow />
          </span>
          {open && (
            <motion.div initial={{ opacity:0 }} animate={{opacity:1}} className="absolute right-0 left-0 top-full z-50 flex flex-col space-y-1  bg-secondary px-4  py-2 text-sm shadow-sm [&>span]:rounded-sm [&>span]:p-1">
 
              {ordering.map((order)=>(
                <span className="hover:bg-gray-400" onClick={()=>setOrderBy(order.slug)}>{order.name}</span>
              ))}
            </motion.div>
          )}  
    
    </div>
  )
}

export default OrderbyDropdown