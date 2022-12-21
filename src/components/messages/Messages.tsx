import { ChatMessage } from '@/interfaces/GroupChat'
import { UserChat } from '@/interfaces/Users'
import { useAuth } from '@context/auth/AuthContext'
import { groupChatSelectUsers } from '@context/groupChat/groupChatStates'
import Image from 'next/image'
import React, { createRef, LegacyRef, useEffect, useRef } from 'react'
import { useRecoilValue } from 'recoil'

interface MessagesProps{
  messages:Array<ChatMessage>
}

const Messages = ({messages}:MessagesProps) => {
  const {user} = useAuth();
  const messagesEndRef = useRef<any>(null)
  const groupUsers = useRecoilValue(groupChatSelectUsers);
  
  function scrollEnd(){
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(()=>{
    scrollEnd();
  },[messages,groupUsers])


  return (
    <div className='flex-1 overflow-auto px-1 '>

        <>{messages.map((item)=>{
          const date = new Date(item.datestamp)
          const groupUser = groupUsers.find(g => g.uid == item.userId)
          if(!groupUser) return <React.Fragment key={item.datestamp}/>

          return(
            <div key={item.datestamp}>
            {user?.uid == item.userId ?
            <div  className='flex gap-1 mt-2 justify-end'>
              
              <section className='flex flex-col items-end'>
                <p className='flex justify-end items-baseline gap-1'> <span className='font-semibold'>You</span> <small className='text-gray-600'>{`${date.getHours()}:${date.getMinutes()}`}</small> </p>

                <table className='table-fixed break-words w-fit sm:max-w-lg rounded-[5px]  text-lg text-white bg-[#4E95FF] '>
                <tbody>
                  <tr>
                    <td className='p-2'>{item.message}</td>
                  </tr>
                </tbody>
                </table>  
                
              </section>
            </div>
            :
            <div key={item.datestamp} className='flex gap-1 mt-1'>
              {groupUser.image ? 
              <Image src={groupUser.image} width={20} height={20} alt="" className='relative  min-w-[40px]  h-10 top-6  items-center justify-center rounded-full   bg-gray-600' />
              :
              <div className='relative flex  min-w-[40px]  h-10 top-6  items-center justify-center rounded-full   bg-gray-600' >
               <p className='min-h-10 min-w-10'>{groupUser.name.slice(0,2)}</p>
              </div>}
              
              <section>
                <p> <span className='font-semibold'>{groupUser.name}</span> <small className='text-gray-600'>{`${date.getHours()}:${date.getMinutes()}`}</small> </p>
                <table className='table-fixed break-words w-fit sm:max-w-lg rounded-[5px] text-lg text-black bg-[#EBEBEB] '>
                <tbody>
                  <tr>
                    <td className='p-2'>{item.message}</td>
                  </tr>
                </tbody>
                  
                </table>
              </section>
              </div>}
              </div>
          )
        })}</>
        <div ref={messagesEndRef} />
    </div>
  )
}

export default Messages