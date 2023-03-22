import React from 'react'


interface IProps {
    children:React.ReactNode
}
const Body = ({ children }:IProps) => {
  return (
    <div className='pl-20 xs:pl-24 sm:pl-44 md:pl-60 py-4 pr-1 sm:pr-4 overflow-x-hidden min-h-screen pb-14'>
        {children}
    </div>
  )
}

export default Body