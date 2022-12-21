import { GroupChat,ChatMessage } from './../../interfaces/GroupChat';
import { SetterOrUpdater, atom, selector } from "recoil";
import { databaseCreateGroup, databaseGetGroups } from '@/database/databaseFunctions';

export interface GroupChatStateInterface{
    groupChats:Array<GroupChat> 
    getGroupChats:(set:SetterOrUpdater<any[]>,arrayId:Array<string> )=>Promise<void>
    createGroupChat:(set:SetterOrUpdater<any[]>,groupChat:GroupChat,userId:string) =>Promise<void>
    sendMessage:(set:SetterOrUpdater<any[]>,groupId:string,chatMessage:ChatMessage)=>Promise<void>
}

export const groupChatsListState = atom<Array<GroupChat>>({ //
    key:'GroupChats',
    default:[],
});

export const groupChatSelectState = atom<GroupChat | null>({ //
    key:'GroupChat',
    default:null,
});

export const groupChatState = selector<GroupChatStateInterface>({
    key:'GroupChatState',
    get: async ({get}) =>{
        
        const groupChats:Array<GroupChat>  = get(groupChatsListState)
        const getGroupChats = async (set:SetterOrUpdater<GroupChat[]>,arraysIds:Array<string>)=>{
            try {
                
                const groups = await databaseGetGroups(arraysIds);
                await set(groups);
                //console.log('Groups',groups);
                
            } catch (error) {
                console.log(error);
            }
        } 
        const createGroupChat = async (set:SetterOrUpdater<any[]>,groupChat:GroupChat,userId:string) =>{
            try {
                await databaseCreateGroup(groupChat,userId);
                set(g => [...g,groupChat]);
            } catch (error) {
                console.log(error);
            }
        }

        // * No returns
        const sendMessage = async (set:SetterOrUpdater<any[]>,groupId:string,chatMessage:ChatMessage) =>{
            console.log('GroupId',chatMessage);
            
            //set(g => [...g,g[0].messages.push(chatMessage.message)])
            
        }
        
        return {groupChats,getGroupChats,createGroupChat,sendMessage} 
    },
});


export const groupChatFilter = atom<string>({
    key: 'GroupChatFilter',
    default:''
});