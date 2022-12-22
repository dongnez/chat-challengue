import { createContext,useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword ,onAuthStateChanged,signInWithEmailAndPassword,signOut,GoogleAuthProvider,signInWithPopup, sendPasswordResetEmail} from "firebase/auth";
import {auth} from "@/firebase/firebase"
import {User,UserCredential} from 'firebase/auth'
import React from 'react'
import { UserChat } from "@/interfaces/Users";
import { databaseGetUserChat, databaseUpdateUserChat, registerUser } from "@/database/databaseFunctions";
 

export interface AuthContextModel {
    user: User | null
    userChat: UserChat | null
    register: (email: string, password: string,name:string,photoUrl?:any) => void
    login: (email: string, password: string) => Promise<UserCredential>
    closeSession:()=> Promise<void>
    loading:boolean
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
    loginWithGoogle:()=>Promise<UserCredential>
    resetPassword: (email: string) => Promise<void>
    updateUserChat: () => Promise<void>
}

const AuthContext = createContext<AuthContextModel>(
    {} as AuthContextModel,
)

export function useAuth(){
    const context = useContext(AuthContext);
    return context;
}


export default function AuthProvider(props:{children:React.ReactNode}){
    const [user,setUser] = useState<User | null>(null);
    const [userChat,setUserChat] = useState<UserChat | null>(null)
    const [loading,setLoading] = useState(true);
    
    useEffect(()=>{
        onAuthStateChanged(auth, async (currentUser) => {
            setLoading(true);
            
            setUser(currentUser);
            if(!currentUser){setLoading(false);setUserChat(null);return}

            const res = await databaseGetUserChat(currentUser.uid)
            
            if(res) await setUserChat(res)
            else await setUser(null)
            
            

            setLoading(false);
        })
    },[])

    const updateUserChat = async () =>{
        if(!userChat) return
        const update = await databaseUpdateUserChat(userChat.uid);
        setUserChat(update)
    }

    //* Functions
    const register = async (email:string,password:string,name:string,photoUrl?:any) => {

        await createUserWithEmailAndPassword(auth,email,password).then(async (currentUser)=>{
            const user = currentUser.user;

            const userChat:UserChat = { uid:user.uid,email:email,groups:[],name:name,image:'' }
            await registerUser(userChat,photoUrl);
            closeSession();
        })
    }
    const login = (email:string,password:string) => signInWithEmailAndPassword(auth,email,password);
    const closeSession = ()=> signOut(auth);
    const loginWithGoogle = ()=> {
        const googleProvider = new GoogleAuthProvider();
        return signInWithPopup(auth,googleProvider);
    }
    const resetPassword = (email:string)=> sendPasswordResetEmail(auth,email);
    
    return(
        <AuthContext.Provider value={{register,login,user,userChat,updateUserChat,closeSession,loading,setLoading,loginWithGoogle,resetPassword}}>{props.children}</AuthContext.Provider>
     )
    
}

