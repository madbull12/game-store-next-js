import { useScroll } from 'framer-motion'
import React from 'react'
import { useCartMenu, useSearchModal } from '../../lib/zustand'
import CartItems from './CartItems'
import Header from './Header'
import ProgressBar from './ProgressBar'
import Sidebar from './Sidebar'
import ReactTooltip from 'react-tooltip'
import AnimatedModal from './AnimatedModal'
interface IProps {
    children:React.ReactNode
}
const Layout = ({ children }:IProps) => {
  const { isOpen } = useCartMenu();
  const { scrollYProgress } = useScroll();
  const { isOpen:searchOpen } = useSearchModal();

  return (
    <div>
       <ReactTooltip />
          <ProgressBar progress={scrollYProgress}/>

      <div className='bg-primary p-4'>
          <Sidebar />
          <div className='pt-2 px-2'>
          <Header />
          {isOpen && <CartItems />}
          {searchOpen ? <AnimatedModal /> : null}

          </div>
          {children}
      </div>
    </div>

  )
}

export default Layout