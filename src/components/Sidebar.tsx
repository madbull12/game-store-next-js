import Link from 'next/link'
import React from 'react'
import { BiMenuAltLeft } from 'react-icons/bi'
const Sidebar = () => {
  return (
    <aside className='p-4 min-h-screen fixed bg-secondary w-56'>
        <div className='flex justify-between items-center text-white'>
            <Link href="/">
                <p className='text-2xl cursor-pointer  font-black '>NXTGAME.</p>
            </Link>
            <BiMenuAltLeft className='text-2xl cursor-pointer' />
        </div>
        <ul className='mt-4 space-y-3'>
            <li className='text-white font-semibold text-lg'>
                <Link href="/">
                    HOME
                </Link>
            </li>
        </ul>
      
    </aside>
  )
}

export default Sidebar