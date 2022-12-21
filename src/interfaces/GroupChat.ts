import { UserChat } from "./Users"

export interface GroupChat{
    id:string
    name:string
    image?:string
    users:Array<string> //UserIds
    messages:Array<ChatMessage>
}

export interface ChatMessage{
    datestamp:number
    userId:string
    message:string
}