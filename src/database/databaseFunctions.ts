import { UserChat } from './../interfaces/Users';
import { get, ref, set,update,push } from 'firebase/database'
import {database} from './firebase'
import { ChatMessage, GroupChat } from '@/interfaces/GroupChat';

export async function databaseCreateGroup(groupChat:GroupChat,userId:string):Promise<GroupChat> {
    const generatedKey = push(ref(database,'groups')).key;
    console.log('GeneratedKey...',generatedKey);
    
    if(!generatedKey) throw "error/noKey"

    groupChat.id = generatedKey;
    groupChat.users.push(userId);
    await update(ref(database,'groups/'+generatedKey),{
        ...groupChat,
    });

    await update(ref(database,'users/'+userId+'/groups/'),{ //Add user to group
        [generatedKey]:generatedKey
    })

    return groupChat;
}

export async function databaseGetGroups(arraysIds:Array<string>):Promise<Array<GroupChat>> {
    
    const result:Array<GroupChat> = [];
    
    for await (const id of arraysIds) {
        await get(ref(database,'/groups/'+id))
        .then((snap)=>{
            if(!snap.exists()) return []
            const rest:GroupChat = snap.val();
            if(!rest.messages) rest.messages = []
            else rest.messages = Object.values(rest.messages)

            result.push(rest);
        });
    }


    return result;
}

export async function databaseGetUserChat(id:string|undefined) {
    if(!id) return null;

    const result = await get(ref(database,'users/'+id)).then((snap)=>{
        if(!snap.exists()) return null
        const res = snap.val();
        return res;
    })
    return result
}

export async function databaseSendMessageGroup(groupId:string,message:ChatMessage) {
    

    await set(ref(database,`groups/${groupId}/messages/${message.datestamp}`),{
        ...message
    })
}

export async function databaseGetUsersGroup(groupUsersId:Array<string>):Promise<Array<UserChat>> {
    
    let result:Array<UserChat> = []; 
    
    
    console.log('Array',groupUsersId);
    

    for (const id of Object.values(groupUsersId)) {
        console.log('Id',id);

        const res =  await get(ref(database,'users/'+id)).then((snap)=>{
            if(!snap.exists()) return null
            const res:UserChat = snap.val()
            return res
        })
        if(res) result.push(res)
    }

    console.log('Data',result);
    

    return result;
}


export async function databaseJoinGroup(userId:string,groupId:string) {
    
    
    const exist = await get(ref(database,`groups/${groupId}`)).then((s)=>{
        return s.exists()
    })
    

    if(!exist) throw "error/NoExist"

    await( update(ref(database,`groups/${groupId}/users/`),{
        [userId]:userId
    }).catch((e)=>{
        throw e;
    }),
    //Add group to User
    update(ref(database,`users/${userId}/groups/`),{
        [groupId]:groupId
    }))

}

export async function registerUser(user:UserChat){
    await update(ref(database,'users/'+user.uid),{
        ...user
    })
}