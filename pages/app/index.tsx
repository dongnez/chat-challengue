import AppLayout from '@components/layouts/AppLayout/AppLayout'
import React from 'react'


const App = () => {
  //Auto select first chat

  return (
    <div className=' w-full topbarResheight bg-slate-200'>
      Chat....

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