import React,{useState,useEffect} from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { topbarToggle } from '../topbar/Topbar'
import {AiOutlineSearch} from 'react-icons/ai'
import { groupChatState, groupChatsListState, groupChatSelectState, groupChatSelectUsers, groupChatFilter } from '@context/groupChat/groupChatStates'
import {GrFormAdd} from 'react-icons/gr'
import AddModal from '@components/addModal/AddModal'
import { useAuth } from '@context/auth/AuthContext'
import { GroupChat } from '@/interfaces/GroupChat'
import { databaseGetOneGroup, databaseGetUsersGroup, databaseJoinGroup } from '@/database/databaseFunctions'

const Sidebar = () => {
  
  const topbar = useRecoilValue(topbarToggle);
  const {groupChats,getGroupChats,groupFiltered,createGroupChat} = useRecoilValue(groupChatState);
  const setFilter = useSetRecoilState(groupChatFilter);
  const setGroupChats = useSetRecoilState(groupChatsListState);
  const [groupSelected,setSelectGroup] = useRecoilState(groupChatSelectState);
  const setUsers = useSetRecoilState(groupChatSelectUsers);
  
  
  
  const {userChat,loading} = useAuth();
  const [addModal,setAddModal] = useState(false);
  const [error,setError] = useState('');

  
  useEffect(() => { //GetGroup and select first
   
  
    if(userChat?.groups){
        const val:Array<string> = Object.values(userChat.groups)
        getGroupChats(setGroupChats,val).then((groups)=>{
          if(groups)
            selectGroup(groups[0])          
        }) 
    }
  }, [])


  async function selectGroup(item:GroupChat){
    if(item.id == groupSelected?.id) return;

    setUsers([])
    setSelectGroup(item);
    
    //Call Users
    const users = await databaseGetUsersGroup(item.users);
    if(users)
      setUsers(users);
  }

  async function joinGroup(e: React.KeyboardEvent<HTMLInputElement> | any){
    if(!userChat) return;
    
    if(e.key == 'Enter'){
      if(e.target.value.trim() == ''){setError("Empty code");return}
      try {
        const groupId = e.target.value;
        await databaseJoinGroup(userChat.uid,groupId);
        const group:GroupChat | null = await databaseGetOneGroup(groupId);
        if(group){
          await setGroupChats(g => [...g,group])
        }
        
        setError('');
      } catch (error) {
        switch (error) {
          case 'error/NoExist':
            setError("Enter a valid Id");      
            break;
        
          default:
            setError("Error, try later")
            break;
        }
        
      }
      e.target.value = '';
    }
    
  }
  


  return (
    <>
    
    <div className= {`${'border-r border-gray-300 topbarResheight z-10 flex flex-col scrollbarSideBar'} 
    ${'absolute bg-white sm:relative w-full sm:max-w-[250px]'} 
    ${topbar ? '':'hidden'}`} >

      <div className='flex  items-center rounded mt-2 border border-black   px-2 sm:w-fit   self-center '>
        <AiOutlineSearch  size={25}/>
        <input className='flex-1 h-full py-2 outline-0 rounded' placeholder='Search' onChange={(e)=>{setFilter(e.target.value)}}/>
      </div> 
      
      <div className='mt-2 mx-[8px] flex-1 overflow-auto'>
        
        <section className='flex items-center '>
          <h2 className='flex-1'>Channels</h2>
          <GrFormAdd  className='mt-1' size={20} onClick={()=>{setAddModal(true)}}/>
        </section>
        
        <div className='mt-2 mx-1'>
          {groupChats.map((item,index)=>(
            <div onClick={()=>selectGroup(item)} 
            className={`${'p-2   rounded my-3 flex items-center gap-3 duration-200'} + 
            ${item.id == groupSelected?.id ? 'bg-[#379CD6] hover:bg-[#298ac2]'  : 'bg-[#D9D9D9] hover:bg-[#bebebe]'} `} key={index}>
              {item.image ? <img src={item.image} alt={item.name} width={15} height={15} className='rounded-full h-15 w-15' />:
              <p className=' rounded-full bg-white w-8 h-8 items-center justify-center flex'>{item.name.slice(0,2)}</p>}
              <p  onClick={()=>{}}>{item.name}</p>
            </div>
          ))}
        </div>

      </div>

        {/* Join Group */}
      <div className='px-[8px] py-5 mb-5 border-t border-gray-300 flex flex-col gap-1 items-center'>
        <h2 className='font-medium'>Join Group</h2>
        <input className='border border-black p-2 outline-0 rounded' placeholder='Enter Group Id' onKeyDown={(e)=>{joinGroup(e)}}/>
        <p className='self-center text-red-500'>{error}</p>
      </div>
      
    </div>
    {addModal && <AddModal open={addModal} close={()=>setAddModal(false)} />}
    </>
  )
}

export default Sidebar