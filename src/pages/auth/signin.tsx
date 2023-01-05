import { GetServerSideProps } from 'next'
import { Provider } from 'next-auth/providers'
import { getProviders, signIn } from 'next-auth/react'
import React from 'react'
import Body from '../../components/Body'

const SignInPage = () => {
  return (
    <Body>
        <div className='space-y-4 justify-center flex flex-col items-center'>
                    <button onClick={() => signIn("google",{
                        callbackUrl: `http://localhost:3000/`
                    })} className="text-white font-bold text-xl bg-secondary px-6 py-4 rounded-md  transition-all ease-in-out duration-200 " >
                        Sign in with Google
                    </button>
                    <button onClick={() => signIn("discord",{
                        callbackUrl: `http://localhost:3000/`
                    })} className="text-white font-bold text-xl bg-secondary px-6 py-4 rounded-md  transition-all ease-in-out duration-200 " >
                        Sign in with Discord
                    </button>
        </div>
       
    </Body>
  )
}

export default SignInPage

// export const getServerSideProps: GetServerSideProps = async() => {
//     const providers = await getProviders();
//     return {
//         props:{
//             providers
//         }
//     }
// }