import { useSession } from 'next-auth/react'
import Image from 'next/image';
import React from 'react'

const Profile = () => {
    const { data:session } = useSession();
    console.log(session)
  return (
    <div>
        {/* <Image src={session?.user?.image ?? ""} width={50} height={50} className="rounded-full" /> */}
    </div>
  )
}

export default Profile