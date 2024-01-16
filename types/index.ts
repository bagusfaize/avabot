export interface MessageProps {
    role: 'user' | 'assistant' | string,
    content: string,
    time: string,
    rate?: RateType
}

export interface RateType {
    isLike: boolean,
    isDislike: boolean,
    reason: string
}

export type Messages = MessageProps[]