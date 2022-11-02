import React from 'react'
import { IoMdClose } from 'react-icons/io'
import { useCartItem } from '../../lib/zustand'

const CartItems = () => {
    const { cartItems } = useCartItem();
  return (
    <div className='right-0 fixed top-0 min-h-screen p-4 flex flex-col bg-secondary w-60 z-50'>
        <IoMdClose className='text-xl text-white cursor-pointer self-end '/>

    </div>
  )
}

export default CartItems