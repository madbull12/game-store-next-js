import { useSession } from 'next-auth/react'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const Profile = () => {
    const { data:session,status } = useSession();
  return (
    <div>
        {status === "unauthenticated" ? (
           <Link href={"/signin"}>
            <p className='hover:border-b-2 border-[#bc13fe] text-white font-bold uppercase cursor-pointer '>
              Sign in

            </p>
           </Link>
        ):(
          <div className=" flex items-center gap-x-2">
              <Image src={session?.user?.image ?? ""} width={50} height={50} className="rounded-full" />
              <p className='text-gray-400 text-sm'>{session?.user?.name}</p>
          </div>
        )}
    </div>
  )
}

export default Profile