import { GroupChat } from '@/interfaces/GroupChat';
import { useAuth } from '@context/auth/AuthContext';
import { groupChatsListState, groupChatState } from '@context/groupChat/groupChatStates';
import { setDefaultResultOrder } from 'dns';
import React,{useState} from 'react'
import {GrClose} from 'react-icons/gr'
import { useRecoilValue, useSetRecoilState } from 'recoil';

interface ModalProps{
    open:boolean,
    close:()=>void
}

const AddModal = ({open,close}:ModalProps) => {

    const [group,setGroup] = useState({id:'',messages:[],name:'',users:[]});
    const [error,setError] = useState('')
    const {createGroupChat} = useRecoilValue(groupChatState)
    const setGroupChats = useSetRecoilState(groupChatsListState);

    const {user} = useAuth();

    async function createGroup(){
        if(!user) return;
        if(group.name.trim() == ''){
            setError("Name cannot be empty");
            return;
        }
        
        close();
        await createGroupChat(setGroupChats,group,user.uid);
        
    }

   return (
    <div onClick={close} className='absolute flex items-center justify-center w-screen h-screen top-0 bg-[#0000003b] z-20'>
        <div onClick={(e)=>{e.stopPropagation();}} className='p-2 bg-[#eeeeee] w-screen pb-5 self-end sm:self-center sm:w-80 rounded   '>
            <GrClose onClick={close}  size={20}/>
            <h2 className='text-center'>Create Group</h2>

            <div className='block w-fit m-auto mt-5'>
                <input className='p-1 rounded-md' placeholder='Name' onChange={(e)=>setGroup({...group,name:e.target.value})} />
                {error != '' && <p className='text-red-500 text-xs'>{error}</p>}
            </div>
            <button onClick={createGroup} className='text-white bg-blue-400 p-2 m-auto block rounded-md mt-2'>Create</button>
        </div>
    </div>
  )
}

export default AddModal