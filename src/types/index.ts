export interface ChatObj {
    message: string;
    isMe: boolean
}

export interface SafeUser{
    firstname: string
    lastname: string
    email: string
}

export interface SafeUserRegister{
    firstname: string
    lastname: string
    mobile: string 
    email: string
    country: string
    password: string
}

export interface SafeUserLogin{
    email: string
    password: string
}

export interface SafeAssistant{
    id: number
    name: string
    created_at: string
}

export interface SafeConversation{
    id: number
    title: string
    created_at: string
}

export interface SafeMessage{
    id: number | null
    role: "user" | "assistant"
    content: string
    created_at: string
}