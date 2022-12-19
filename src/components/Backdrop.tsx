import React from 'react'

const Backdrop = ({ children }: { children:React.ReactNode}) => {
  return (
    <div className='absolute top-0 right-0 bottom-0 left-0 z-[999] bg-[#0007]'>
        {children}
    </div>
  )
}

export default Backdrop