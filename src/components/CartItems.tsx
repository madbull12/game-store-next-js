import React,{ useRef } from 'react'
import { IoMdClose } from 'react-icons/io'
import { useCartItem, useCartMenu } from '../../lib/zustand'
import { v4 } from 'uuid'
import Image from 'next/image'
import useOnClickOutside from '../../hooks/useOutsideClick'

const CartItems = () => {
    const { cartItems } = useCartItem();
    const { closeCartMenu } = useCartMenu();
    const menu = useRef<HTMLDivElement>(null);
    useOnClickOutside(menu,()=>{
        closeCartMenu()
    })
  return (
    <div ref={menu} className='right-0 fixed top-0 min-h-screen p-4 flex flex-col bg-secondary w-72 z-50'>
        <IoMdClose className='text-xl text-white cursor-pointer self-end ' onClick={closeCartMenu}/>
        <div className='space-y-4'>
            {cartItems.map((item)=>(
                <div key={v4()} className="items-center flex gap-x-4 ">
                    <Image className="rounded-lg" src={item.image} objectFit="cover" width={50} height={50} />
                    <div className='text-sm text-gray-400 '>
                        <p>{item.name}</p>
                        <p>${item.price}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default CartItems