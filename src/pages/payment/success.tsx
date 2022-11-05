import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'
import Stripe from 'stripe';
import { v4 as uuidv4 } from 'uuid'
import { motion } from 'framer-motion';

const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`,{
    apiVersion:"2022-08-01"
});

const SuccessPage = ({ order }:any) => {

    console.log(order)
  return (
    <div className={`bg-neutral-800 min-h-screen grid place-items-center`}>
        <motion.div animate={{ x:0,opacity:1 }} initial={{ x:"-100%",opacity:0 }} className='bg-neutral-700 p-4 text-white flex flex-col items-center space-y-4'>
            <h1 className='text-center font-bold text-lg md:text-2xl'>Thank you for your order</h1>
            <p className='font-semibold'>Email confirmation has been sent to: </p>
            <p className='font-semibold'>{order.customer_details.email}</p>
            <div className='flex gap-x-4'>
                <div>
                    <p className='font-semibold'>Address</p>
                    {Object.entries(order.customer_details.address).map(([key,val])=>(
                        <>
                        <p key={uuidv4()}>
                            <>{key}: {val}</>
                        </p>
                        
                        </>

                    ))}
                </div>
                <div>
                    <p className='font-semibold'>Products</p>
                    <div className='space-y-2'>
                        {order.line_items.data.map((item:any)=>(
                            <div key={uuidv4()}>
                                <p>Product: {item.description}</p>
                                <p>Quantity: {item.quantity}</p>
                                <p>Price: ${item.price.unit_amount}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <button className='px-4 font-bold rounded-sm py-2 bg-emerald-500'>
                <Link  href="/">Continue shopping</Link>

            </button>
        </motion.div>
    </div>
  )
}

export const getServerSideProps = async(params:any) => {
    const order = await stripe.checkout.sessions.retrieve(
        params.query.session_id,
        {
            expand:["line_items"]
        }
    )

    return {
        props:{
            order
        }
    }
}

export default SuccessPage