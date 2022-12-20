"use client"

import React from 'react'
import { useRecoilValue,useRecoilState,selector } from 'recoil'
import { todoAtom } from '@components/atoms'

//const arrayPrueba = selector

const Example = () => {
    
    const [counter,setCounter] = useRecoilState(todoAtom)
    return (
    <div>
         <p>Number: {counter}</p>
        <p onClick={()=>setCounter(c => c+1)} >+</p>
    </div>
  )
}

export default Example