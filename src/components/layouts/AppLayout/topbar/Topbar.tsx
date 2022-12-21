import { useAuth } from '@context/auth/AuthContext';
import { Router, useRouter } from 'next/router';
import React, { useState } from 'react'
import { atom, useSetRecoilState } from 'recoil'

export const topbarToggle = atom<boolean>({
  key:'tobarToggle',
  default:true,
})

const Topbar = () => {

  const setTodoList = useSetRecoilState(topbarToggle);
  const [menu,setMenu] = useState(false);
  const {closeSession} = useAuth();
  //const router = useRouter(); router.push('/login')

  return (
    <div className='h-[34px] flex border-b border-gray-300 items-center px-5  relative z-10'>
        <p className='block  sm:hidden' onClick={()=>setTodoList(t => !t)}>menu</p>
        <div className='flex-1'/>
        <div onClick={()=>setMenu(!menu)} className='rounded-full bg-red-400 h-[30px] w-[30px]'>
        </div>

      {menu && 
      <section className='absolute top-10 right-5 bg-red-300 min-h-5 rounded'>
        <p onClick={()=>{closeSession(); }} className='p-2 hover:bg-red-400 rounded cursor-pointer'>Close Session</p>
      </section>}

    </div>
  )
}

export default Topbar