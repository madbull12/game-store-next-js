import React from 'react'
import Header from './Header'
import Sidebar from './Sidebar'

interface IProps {
    children:React.ReactNode
}
const Layout = ({ children }:IProps) => {
  return (
    <div className='bg-primary p-'>
        <Sidebar />
        <div className='pt-2 px-2'>
        <Header />

        </div>
        {children}
    </div>
  )
}

export default Layout