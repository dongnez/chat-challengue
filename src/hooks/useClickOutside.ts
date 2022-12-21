import { useRef, useEffect } from 'react';

export default function useClickOutside  (setClose:React.Dispatch<React.SetStateAction<boolean>>){
    const clickOutRef = useRef<any>();
    
    useEffect(()=>{
      const handler = (event:MouseEvent)=>{
        if(clickOutRef.current) //Eliminar errores de consola
        if(!clickOutRef.current.contains(event.target) ){
          setClose(false);
        }
      } 

      document.addEventListener("mousedown", handler);
  
      return ()=>{
        document.removeEventListener("mousedown", handler);  
      }
  
    },[setClose])

    return {clickOutRef};
}