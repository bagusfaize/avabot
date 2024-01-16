
'use client'

import { useState, useEffect } from 'react'
import { Messages } from '@/types';

export const useManipulateMessage = () => {

    const getInitialMessages = () => {
        const storedMessages = localStorage.getItem('messages');
        return storedMessages ? JSON.parse(storedMessages) : [];
    }

    const [messages, setMessages] = useState<Messages>(getInitialMessages());

    
    const updateMessages = (messages: Messages) => setMessages(messages);
    
    const deleteArrayByIndexes = (sources: Messages, indexesToDelete: number[]) => {
        const newArray = [...sources];
        indexesToDelete
        .sort((a, b) => b - a)
        .forEach((index) => {
            newArray.splice(index, 1);
        });
        return newArray;
    }
    
    const deleteMessages = (selectedIndex: number[]) => {
        const updatedMessages = deleteArrayByIndexes(messages, selectedIndex)
        setMessages(updatedMessages);
    }

    const rateMessages = (selectedIndex:number, isLike: boolean, isDislike: boolean, reason: string) => {
        const rate = { isLike, isDislike, reason };
        const updatedMessages = [...messages];
        updatedMessages[selectedIndex] = {
            ...updatedMessages[selectedIndex],
            rate
        }
        setMessages(updatedMessages);
    }
    
    useEffect(() => {
        console.log('clg mes', messages);
        localStorage.setItem('messages', JSON.stringify(messages));
    }, [messages])

    return {
        messages,
        updateMessages,
        deleteMessages,
        rateMessages
    }

}