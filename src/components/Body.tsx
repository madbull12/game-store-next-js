import React from 'react'


interface IProps {
    children:React.ReactNode
}
const Body = ({ children }:IProps) => {
  return (
    <div className='pl-60 py-4 pr-4 min-h-screen pb-14'>
        {children}
    </div>
  )
}

export default Body