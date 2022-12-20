import '../styles/globals.css'
import type { AppProps } from 'next/app'

import { NextPage } from 'next'
import { ReactElement,ReactNode } from 'react'
import { useRouter } from 'next/router'
import ProtectedRoute from '@context/auth/ProtectedRoute'
import { RecoilRoot } from 'recoil'
import AuthProvider from '@context/auth/AuthContext'



export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

interface AppPropsWithLayout extends AppProps {
  Component: NextPageWithLayout
}


const noAuthRequired = ['/','/login','/register'];

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  
  const getLayout = Component.getLayout ?? ((page)=>page)
  const router = useRouter();
  
  
  return (
    <>
    <AuthProvider>
    <RecoilRoot>
        {noAuthRequired.includes(router.pathname) ? 
        <>{getLayout(<Component {...pageProps}/>)}</>
        :
        <ProtectedRoute>
          <>{getLayout(<Component {...pageProps}/>)}</>
        </ProtectedRoute>}
      </RecoilRoot>
      </AuthProvider>
    </>
     
  )
}

export default MyApp
