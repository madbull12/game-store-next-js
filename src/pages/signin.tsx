import { GetServerSideProps } from 'next'
import { getProviders, signIn } from 'next-auth/react'
import React from 'react'
import Body from '../components/Body'

const SignInPage = ({ providers }:any) => {
    console.log(providers)
  return (
    <Body>
        <div className='space-y-4 justify-center flex flex-col items-center'>
            {Object.values(providers).map((provider:any) => (
                <div key={provider.name}>
                    <button onClick={() => signIn(provider.id)} className="text-white font-bold text-xl bg-green-500 px-6 py-4 rounded-md hover:bg-green-600 transition-all ease-in-out duration-200 " >
                        Sign in with {provider.name}
                    </button>
                </div>
            ))}
        </div>
       
    </Body>
  )
}

export default SignInPage

export const getServerSideProps: GetServerSideProps = async() => {
    const providers = await getProviders();
    return {
        props:{
            providers
        }
    }
}