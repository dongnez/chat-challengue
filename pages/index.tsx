import Example from '@components/atoms/example'
import { useAuth } from '@context/auth/AuthContext'
import { useRouter } from 'next/router'
import React from 'react'
import { useRecoilValue } from 'recoil'

const Home = () => {
  const {user} = useAuth();
  const router = useRouter();

  return (
    <div className='m-auto w-fit mt-[30px] box-border flex flex-col items-center gap-3' >
        <h1 className='font-semibold'>ChatChallenge</h1>
      
        <>{user ?
          <button className=' bg-blue-500 rounded text-white p-[8px] w-fit' onClick={()=>router.push('/app')}>Entrar a app</button>
          :
          <button className='bg-blue-500 rounded text-white p-[8px] w-fit' onClick={()=>router.push('/login')}>Sign up</button>}</>
        
    </div>
  )
}

export default Home