import React from 'react'
import Sidebar from './sidebar/Sidebar'
import Topbar from './topbar/Topbar'


interface AppLayoutProps{
    children:React.ReactElement
}

const AppLayout = ({children}:AppLayoutProps) => {

  
  return (
    <div className='w-screen h-screen z-0 relative'>
        <Topbar/>
        <div className='flex relative'>
            <Sidebar/>
            {children}
        </div>
    </div>    
  )
}



export default AppLayout