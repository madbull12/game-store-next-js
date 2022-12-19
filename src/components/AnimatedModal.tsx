import React,{ useRef } from 'react'
import useOnClickOutside from '../../hooks/useOutsideClick'
import { useSearchModal } from '../../lib/zustand'
import Backdrop from './Backdrop'
import Search from './Search'

const AnimatedModal = () => {
    const modalRef = useRef<HTMLDivElement>(null);
  const { setOpenModal } = useSearchModal();

    useOnClickOutside(modalRef,()=>{
        setOpenModal(false)
    })
  return (
    <Backdrop>
        <div ref={modalRef} className='p-4 max-w-xs mx-auto mt-44 rounded-lg bg-secondary'>
            <Search />
        </div>
    </Backdrop>
  )
}

export default AnimatedModal