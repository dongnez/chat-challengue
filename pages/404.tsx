import { useRouter } from 'next/router'
import React from 'react'

const Redirect404 = () => {
  const router = useRouter();
  
  if(router.asPath.includes("app")){
    router.push('/app/today')
    return (<></>)
  }
  
  return ( <h1> 404 Error page not found</h1>)

}

export default Redirect404