import { useScroll } from 'framer-motion'
import React from 'react'
import { useCartMenu } from '../../lib/zustand'
import CartItems from './CartItems'
import Header from './Header'
import ProgressBar from './ProgressBar'
import Sidebar from './Sidebar'

interface IProps {
    children:React.ReactNode
}
const Layout = ({ children }:IProps) => {
  const { isOpen } = useCartMenu();
  const { scrollYProgress } = useScroll();

  return (
    <div>
          <ProgressBar progress={scrollYProgress}/>

      <div className='bg-primary p-4'>
          <Sidebar />
          <div className='pt-2 px-2'>
          <Header />
          {isOpen && <CartItems />}
          

          </div>
          {children}
      </div>
    </div>

  )
}

export default Layout