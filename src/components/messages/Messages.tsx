import { ChatMessage } from '@/interfaces/GroupChat'
import { UserChat } from '@/interfaces/Users'
import { useAuth } from '@context/auth/AuthContext'
import { groupChatSelectUsers } from '@context/groupChat/groupChatStates'
import React from 'react'
import { useRecoilValue } from 'recoil'

interface MessagesProps{
  messages:Array<ChatMessage>
}

const Messages = ({messages}:MessagesProps) => {
  const {user} = useAuth();
  const groupUsers = useRecoilValue(groupChatSelectUsers);
  

  return (
    <div className='flex-1 overflow-auto'>
        <>{messages.map((item,index)=>{
          
          const date = new Date(item.datestamp)
          const groupUser = groupUsers.find(g => g.uid == item.userId)
          if(!groupUser) return <></>

          return(
            user?.uid == item.userId ?
            <div key={item.datestamp} className='flex gap-1 mt-2 justify-end'>
              <section>
                <p className='flex justify-end items-baseline gap-1'> <span className='font-semibold'>You</span> <small className='text-gray-600'>{`${date.getHours()}:${date.getMinutes()}`}</small> </p>

                <table className='table-fixed break-words w-fit sm:max-w-lg rounded-[5px] text-lg text-white bg-[#4E95FF] ' key={index}>
                  <td className='p-2'>{item.message}</td>
                </table>  
                
              </section>
            </div>
            :
            <div key={item.datestamp} className='flex gap-1 mt-1'>
              <div className='relative top-6 flex items-center justify-center rounded-full w-10 h-10 bg-gray-600' >{groupUser.name.slice(0,2)}</div>
              <section>
                <p> <span className='font-semibold'>{groupUser.name}</span> <small className='text-gray-600'>{`${date.getHours()}:${date.getMinutes()}`}</small> </p>
                <table className='table-fixed break-words w-fit sm:max-w-lg rounded-[5px] text-lg text-black bg-[#EBEBEB] ' key={index}>
                  <td className='p-2'>{item.message}</td>
                </table>
              </section>
            </div>
          )
        })}</>
    </div>
  )
}

export default Messages