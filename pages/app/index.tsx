import ChatInput from '@components/chatInput/ChatInput'
import AppLayout from '@components/layouts/AppLayout/AppLayout'
import Messages from '@components/messages/Messages'
import { groupChatSelectState, groupChatState } from '@context/groupChat/groupChatStates'
import React,{useEffect} from 'react'
import { useRecoilValue } from 'recoil'


const App = () => {
  //Auto select first chat
  const group = useRecoilValue(groupChatSelectState);
  const {sendMessage} = useRecoilValue(groupChatState);

  useEffect(() => {
    console.log("Change");
    
  }, [groupChatSelectState]);
  

  return (
    
    <div className=' w-full topbarResheight relative z-0 md:px-10' >
      {!group ? <p>No group selected</p>:
        <div className='flex flex-col h-full px-3'>
          <h2 className='font-medium mt-1'>{group.name}</h2>
          <Messages messages={group.messages}/>

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