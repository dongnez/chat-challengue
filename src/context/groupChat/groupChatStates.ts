import { GroupChat,ChatMessage } from './../../interfaces/GroupChat';
import { SetterOrUpdater, atom, selector } from "recoil";
import { databaseCreateGroup, databaseGetGroups, databaseSendMessageGroup } from '@/database/databaseFunctions';
import { UserChat } from '@/interfaces/Users';

export interface GroupChatStateInterface{
    groupChats:Array<GroupChat>,
    groupFiltered:Array<GroupChat>,
    getGroupChats:(set:SetterOrUpdater<any[]>,arrayId:Array<string> )=>Promise<Array<GroupChat>>
    createGroupChat:(set:SetterOrUpdater<any[]>,groupChat:GroupChat,userId:string) =>Promise<void>
    sendMessage:(set:SetterOrUpdater<any[]>,setSelect:SetterOrUpdater<any>,groupId:string,chatMessage:ChatMessage)=>Promise<void>
}

export const groupChatsListState = atom<Array<GroupChat>>({ //
    key:'GroupChats',
    default:[],
});

export const groupChatSelectState = atom<GroupChat | null>({ //
    key:'GroupChat',
    default:null,
});


export const groupChatSelectUsers = atom<Array<UserChat>>({ //
    key:'UsersGroupChat',
    default:[],
});

export const groupChatFilter = atom<string>({
    key: 'GroupChatFilter',
    default:''
});

export const groupChatState = selector<GroupChatStateInterface>({
    key:'GroupChatState',
    get: async ({get}) =>{
        
        const groupChats:Array<GroupChat>  = get(groupChatsListState)
        const filter = get(groupChatFilter);
        const groupFiltered:Array<GroupChat> = groupChats.filter((group)=> filter.trim() == ''|| filter.includes(group.name) )
        
        const getGroupChats = async (set:SetterOrUpdater<GroupChat[]>,arraysIds:Array<string>):Promise<Array<GroupChat>> => {
            try {
                const groups = await databaseGetGroups(arraysIds);
                await set(groups);
                return groups;
            } catch (error) {
                console.log(error);
            }
            return []
        } 
        
        const createGroupChat = async (set:SetterOrUpdater<any[]>,groupChat:GroupChat,userId:string) =>{
            try {
                await databaseCreateGroup(groupChat,userId);
                set(g => [...g,groupChat]);
            } catch (error) {
                console.log(error);
            }
        }
        const sendMessage = async (set:SetterOrUpdater<any[]>,setSelect:SetterOrUpdater<any>,groupId:string,chatMessage:ChatMessage) =>{
            
            const index = groupChats.findIndex(g => g.id == groupId);
            if(index == -1) return;

            //groupChats[index].messages.push(chatMessage);
            const groupS = {...groupChats[index],messages:[...groupChats[index].messages]};
            groupS.messages.push(chatMessage)
            
            databaseSendMessageGroup(groupS.id,chatMessage).then(()=>{
                // Todo Possible mark message as send
                //console.log('Mensaje',chatMessage.message,"guardado.");
            })

            //? Possible not neccesary 
            let newList = [...groupChats].map((item) => {
                
                if (item.id === groupId){
                    let messages = [...item.messages];
                    messages.push(chatMessage);
                    return { ...item, messages:messages  };
                } 
                else return item;
              });

            set(newList);

            setSelect(groupS);
            
        }
        
        return {groupChats,groupFiltered,getGroupChats,createGroupChat,sendMessage} 
    },
});

