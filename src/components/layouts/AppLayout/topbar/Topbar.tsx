import { useAuth } from '@context/auth/AuthContext';
import { Router, useRouter } from 'next/router';
import React, { useState } from 'react'
import { atom, useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil'
import {GrMenu} from 'react-icons/gr'
import Image from 'next/image';
import useClickOutside from 'src/hooks/useClickOutside';
import { groupChatSelectState, groupChatsListState, groupChatState } from '@context/groupChat/groupChatStates';

export const topbarToggle = atom<boolean>({
  key:'tobarToggle',
  default:true,
})

const Topbar = () => {

  const setTodoList = useSetRecoilState(topbarToggle);
  const [menu,setMenu] = useState(false);
  const {closeSession,userChat,setLoading} = useAuth();
  //const router = useRouter(); router.push('/login')
  const {clickOutRef} = useClickOutside(setMenu);
  const [groupSelected,setSelectGroup] = useRecoilState(groupChatSelectState);

  const resetList = useResetRecoilState(groupChatsListState);
  function closeSessionFun(){
    resetList();
    setSelectGroup(null);
    setLoading(true);
    closeSession();
  }
  

  return (
    <div className='h-[var(--topbar-height)] flex border-b border-gray-300 items-center px-5  relative z-20'>
        
        
        <GrMenu className='block  sm:hidden' onClick={()=>setTodoList(t => !t)} size={24}/>

        <div className='flex-1'/>
          
          <div ref={clickOutRef} onClick={()=>setMenu(!menu)}>
            <>{userChat?.image ? 
            <Image src={userChat.image} alt="" className='rounded-full w-8 h-8 ' width={30} height={30} />
            :
            <div className='rounded-full flex items-center justify-center cursor-default border border-black h-[30px] w-[30px]'>
              <p>{userChat?.name.slice(0,2)}</p>  
            </div>}
            </>

            {menu && 
            <section  className='absolute top-10 right-5 bg-[#f7f7f7] min-h-5 rounded'>
              <p onClick={()=>{closeSessionFun() }} className='p-2 hover:bg-red-400 rounded cursor-pointer'>Close Session</p>
            </section>}

          </div>


    </div>
  )
}

export default Topbar