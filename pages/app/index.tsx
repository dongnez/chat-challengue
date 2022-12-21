import ChatInput from '@components/chatInput/ChatInput'
import AppLayout from '@components/layouts/AppLayout/AppLayout'
import Messages from '@components/messages/Messages'
import { groupChatSelectState } from '@context/groupChat/groupChatStates'
import React from 'react'
import { useRecoilValue } from 'recoil'


const App = () => {
  //Auto select first chat
  const group = useRecoilValue(groupChatSelectState);

  return (
    
    <div className=' w-full topbarResheight bg-slate-200'>
      {!group ? <p>No group selected</p>:
        <div className='flex flex-col h-full px-3'>
          <h2 className='font-medium'>{group.name}</h2>
          <Messages/>

          <ChatInput group={group}/>
        </div>
      }
    </div>
  )
}

App.getLayout = function(page:React.ReactElement){
  return(
    <AppLayout>
        <>{page}</>
    </AppLayout>
  )
}

export default App