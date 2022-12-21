import { databaseGetMessagesGroup, databaseOnUpdate } from '@/database/databaseFunctions'
import ChatInput from '@components/chatInput/ChatInput'
import AppLayout from '@components/layouts/AppLayout/AppLayout'
import Messages from '@components/messages/Messages'
import { groupChatSelectState, groupChatState } from '@context/groupChat/groupChatStates'
import React,{createRef, useEffect, useMemo, useRef} from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'


const App = () => {
  
  const [group,setGroup] = useRecoilState(groupChatSelectState);
  const id = useRef(group?.id); 

  useEffect(()=>{
    if(group && id.current != group.id){
      databaseOnUpdate(group.id,addMessages);
      id.current = group.id;
    }

  },[group])

  async function addMessages(){
    if(!group) return;
    try {
      const result = await databaseGetMessagesGroup(group.id)
      setGroup({...group,messages:result})
    } catch (error) {
      console.log(error);
    }
  }

  return (
    
    <div className=' w-full topbarResheight relative z-0 md:px-10' >
      {!group ? <h2 className='m-auto w-fit mt-3'>No groups, select one </h2>:
        <div className='flex flex-col h-full px-3'>
          <h2 className='font-medium my-1 border-b border-gray-300 p-2'>{group.name} <small>{group.id}</small></h2>

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