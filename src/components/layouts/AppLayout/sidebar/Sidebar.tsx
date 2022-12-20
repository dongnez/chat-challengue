import React from 'react'
import { useRecoilValue } from 'recoil'
import { topbarToggle } from '../topbar/Topbar'
import {AiOutlineSearch} from 'react-icons/ai'

const Sidebar = () => {
  
  const topbar = useRecoilValue(topbarToggle);


  return (
    <div className= {`${'border-r border-gray-300 topbarResheight'} 
    ${'absolute bg-white sm:relative w-full sm:max-w-[250px]'} 
    ${topbar ? '':'hidden'}`} >

      <div className='flex pl-2 items-center rounded mt-2 border border-black mx-[8px] gap-2 max-w-xs m-auto '>
        <AiOutlineSearch  size={25}/>
        <input className='flex-1 h-full py-2 outline-0 rounded ' placeholder='Search'/>
      </div>
      
      <div className='mt-2 mx-[8px]'>
        <h2>Channels</h2>

      </div>
      
      
        
    </div>
  )
}

export default Sidebar