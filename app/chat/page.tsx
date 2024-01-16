'use client'

import { useState, ChangeEvent, KeyboardEvent } from 'react';
import axios from 'axios';
import moment from 'moment';
import ChatBubble from "@/components/ChatBubble";
import Header from "../../components/Header";
import EmptyState from '@/components/EmptyState';
import { useManipulateMessage } from '@/hooks/useManipulateMessage';
import { Messages, MessageProps } from '@/types';
import { OPENAI_COMPLETION_API, axiosConfig } from '@/configs';
import DeleteToolbar from './modules/components/DeleteToolbar';
import ChatInput from './modules/components/ChatInput';
import ChatCheckbox from './modules/components/ChatCheckbox';
import RateModal from './modules/components/RateModal';
import DeleteConfirmationModal from './modules/components/DeleteConfirmationModal';

export default function Chatbox() {

    const [input, setInput] = useState<string>('');
    const [inputRate, setInputRate] = useState<string>('');
    const [isTyping, setIsTyping] = useState<boolean>(false);
    const [deleteMode, setDeleteMode] = useState<boolean>(false);
    const [selectedChats, setSelectedChats] = useState<number[]>([]);
    const [selectedChatIndex, setSelectedChatIndex] = useState<number>(0);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [showRateModal, setShowRateModal] = useState<boolean>(false);
    const [rateType, setRateType] = useState<string>('like');

    const { messages, updateMessages, deleteMessages, rateMessages } = useManipulateMessage();

    const handleDisableDeleteMode = () => {
        setSelectedChats([])
        setDeleteMode(false);
    }

    const handleCheckbox = (id: number) => {
        const updatedSelectedChats = [...selectedChats];
        if (updatedSelectedChats.includes(id)) {
            const index = updatedSelectedChats.indexOf(id);
            updatedSelectedChats.splice(index, 1);
        } else {
            updatedSelectedChats.push(id);
        }
        setSelectedChats(updatedSelectedChats);
    }

    const handleSelectAll = () => {
        const allChatIndex = messages.map((_, index) => index);
        setSelectedChats(allChatIndex);
    }

    const handleDeleteChat = () => {
        deleteMessages(selectedChats);
        setShowDeleteModal(false);
        handleDisableDeleteMode();
    }

    const handleEnableDeleteMode = () => setDeleteMode(true);

    const handleCloseDeleteModal = () => setShowDeleteModal(false);

    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value);

    const onChangeInputRate = (e: ChangeEvent<HTMLTextAreaElement>) => setInputRate(e.target.value);

    const handleEnterKey = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && handleSubmitMessage();

    const handleSubmitMessage = () => {
        const newMessage: MessageProps = {
            role: 'user',
            content: input,
            time: (moment().format('HH:mm')).toString()
        }

        const updatedMessages = [...messages, newMessage];
        updateMessages(updatedMessages);
        submitToChatGPT(updatedMessages);
        setInput('');
    }

    const submitToChatGPT = (messages: Messages) => {
        setIsTyping(true);
        const formattedMessages = messages.map(({ role, content }) => ({ role, content }))
        const requestBody = {
            'model': 'gpt-3.5-turbo',
            'messages': formattedMessages
        };
        axios.post(
            OPENAI_COMPLETION_API,
            JSON.stringify(requestBody),
            axiosConfig
        ).then(res => {
            const responseMessage = {
                ...res.data.choices[0].message,
                time: (moment().format('HH:mm')).toString()
            }
            updateMessages([...messages, responseMessage]);
            setIsTyping(false);
        }).catch(err => {
            console.log('clg error', err);
            setIsTyping(false);
        });
    }

    const handleRateUp = (index: number) => {
        setShowRateModal(true);
        setRateType('like');
        setSelectedChatIndex(index);
    }

    const handleRateDown = (index: number) => {
        setShowRateModal(true);
        setRateType('dislike');
        setSelectedChatIndex(index);
    }

    const handleCloseRateModal = () => {
        setShowRateModal(false);
        setSelectedChatIndex(0);
        setRateType('like');
    }

    const handleRateChat = () => {
        const isLike = rateType === 'like';
        const isDislike = rateType === 'dislike';
        rateMessages(selectedChatIndex, isLike, isDislike, inputRate);
        handleCloseRateModal()
    }

    return (
        <div className="h-screen flex flex-col justify-between max-w-lg mx-auto">
            <Header
                isTyping={isTyping}
                deleteMode={deleteMode}
                onClickDelete={handleEnableDeleteMode}
                onCancelDelete={handleDisableDeleteMode}
            />
            <div className="flex-grow overflow-y-auto px-5 ">
                {messages.length === 0 && <EmptyState />}
                {messages.map((item, index) => {
                    const isUser: boolean = item.role === 'user';
                    return (
                        <div className='flex items-center'>
                            {deleteMode &&
                                <ChatCheckbox
                                    index={index}
                                    isUser={isUser}
                                    onClickCheckbox={() => handleCheckbox(index)}
                                    selectedChats={selectedChats}
                                />
                            }
                            <ChatBubble
                                index={index}
                                isUser={isUser}
                                message={item.content}
                                time={item.time}
                                rate={item.rate}
                                onThumbsUp={() => handleRateUp(index)}
                                onThumbsDown={() => handleRateDown(index)}
                            />
                        </div>
                    )
                })}
            </div>
            <div className="flex flex-col w-full h-24 p-5 justify-center bg-base-200">
                {deleteMode ?
                    <DeleteToolbar
                        selectedChats={selectedChats}
                        handleSelectAll={handleSelectAll}
                        onShowDeleteModal={() => setShowDeleteModal(true)}
                    />
                    :
                    <ChatInput
                        input={input}
                        onChangeInput={onChangeInput}
                        onEnterKey={handleEnterKey}
                        onSubmitMessage={handleSubmitMessage}

                    />
                }
            </div>
            {showDeleteModal &&
                <DeleteConfirmationModal
                    onDeleteChat={handleDeleteChat}
                    onCloseDeleteModal={handleCloseDeleteModal}
                    rateType={rateType}
                    selectedChats={selectedChats}
                    showDeleteModal={showDeleteModal}
                />}
            {showRateModal &&
                <RateModal
                    rateType={rateType}
                    handleRateChat={handleRateChat}
                    onChangeInputRate={onChangeInputRate}
                    selectedChats={selectedChats}
                    showRateModal={showRateModal}
                    onCloseRateModal={handleCloseRateModal}
                />}
        </div>
    )
}