import React from 'react'


interface IProps {
    children:React.ReactNode
}
const Body = ({ children }:IProps) => {
  return (
    <div className='pl-60 min-h-screen'>
        {children}
    </div>
  )
}

export default Body