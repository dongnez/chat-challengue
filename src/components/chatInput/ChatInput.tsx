
import { ChatMessage, GroupChat } from '@/interfaces/GroupChat';
import { useAuth } from '@context/auth/AuthContext';
import { groupChatSelectState, groupChatsListState, groupChatState } from '@context/groupChat/groupChatStates';
import React,{useState,useRef} from 'react'
import {MdSend} from 'react-icons/md'
import { useRecoilValue, useSetRecoilState } from 'recoil';

interface ChatProps{
    group:GroupChat
}

const ChatInput = ({group}:ChatProps) => {
    
    const {user} = useAuth();
    const {sendMessage} = useRecoilValue(groupChatState);
    const setGroup = useSetRecoilState(groupChatsListState);
    const setSelected = useSetRecoilState(groupChatSelectState);
    
    const [inputValue,setInputValue] = useState('');
    function enterPress(e: React.KeyboardEvent<HTMLInputElement>){
        if(!user|| inputValue.trim() == '') return;
        if(e.key == 'Enter'){
            const message:ChatMessage = {datestamp:new Date().getTime(),message:inputValue,userId:user.uid}
            sendMessage(setGroup,setSelected,group.id,message);
            setInputValue('');
        }
        
    }

  return (
    <div className='flex border border-black rounded my-3'>
        <input value={inputValue} className='bg-transparent p-[6px] flex-1 outline-0' placeholder='Send Message' onKeyDown={enterPress} onChange={(e)=>setInputValue(e.target.value)}  />
        <MdSend className='p-1' size={36}/>
        
    </div>
  )
}

export default ChatInput