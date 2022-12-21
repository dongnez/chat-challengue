import React,{useState,useEffect} from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { topbarToggle } from '../topbar/Topbar'
import {AiOutlineSearch} from 'react-icons/ai'
import { groupChatState, groupChatsListState, groupChatSelectState } from '@context/groupChat/groupChatStates'
import {GrFormAdd} from 'react-icons/gr'
import AddModal from '@components/addModal/AddModal'
import Image from 'next/image'
import { useAuth } from '@context/auth/AuthContext'
import { GroupChat } from '@/interfaces/GroupChat'

const Sidebar = () => {
  
  const topbar = useRecoilValue(topbarToggle);
  const {groupChats,getGroupChats} = useRecoilValue(groupChatState);
  const setGroupChats = useSetRecoilState(groupChatsListState);
  const setSelectGroup = useSetRecoilState(groupChatSelectState);
  
  const [addModal,setAddModal] = useState(false);
  const {userChat} = useAuth();

  useEffect(() => {
        
    if(userChat?.groups){
      const val:Array<string> = Object.values(userChat.groups)
      getGroupChats(setGroupChats,val).then(()=>{
        setSelectGroup(groupChats[0])
      })
      //console.log("Values",val);
    }

  }, [])
  

  return (
    <>
    
    <div className= {`${'border-r border-gray-300 topbarResheight'} 
    ${'absolute bg-white sm:relative w-full sm:max-w-[250px]'} 
    ${topbar ? '':'hidden'}`} >

      <div className='flex pl-2 items-center rounded mt-2 border border-black mx-[8px] gap-2 max-w-xs m-auto '>
        <AiOutlineSearch  size={25}/>
        <input className='flex-1 h-full py-2 outline-0 rounded ' placeholder='Search'/>
      </div>
      
      <div className='mt-2 mx-[8px]'>
        <section className='flex items-center '>
          <h2 className='flex-1'>Channels</h2>
          <GrFormAdd  className='mt-1' size={20} onClick={()=>{setAddModal(true)}}/>
        </section>
        
        <div className='mt-2'>
          {groupChats.map((item,index)=>(
            <div onClick={()=>setSelectGroup(item)} 
            className='p-2 bg-slate-400 rounded mt-3 flex items-center gap-3 hover:bg-slate-500 duration-200' key={index}>
              {item.image ? <img src={item.image} alt={item.name} width={15} height={15} className='rounded-full h-15 w-15' />:
              <p className=' rounded-full bg-white w-8 h-8 items-center justify-center flex'>{item.name.slice(0,2)}</p>}
              <p  onClick={()=>{}}>{item.name}</p>
            </div>
          )
          )}
        </div>

      </div>
      

    </div>
    {addModal && <AddModal open={addModal} close={()=>setAddModal(false)} />}
    </>
  )
}

export default Sidebar