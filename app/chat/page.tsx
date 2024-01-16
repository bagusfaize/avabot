'use client'

import { useState, ChangeEvent, KeyboardEvent } from 'react';
import axios from 'axios';
import moment from 'moment';
import ChatBubble from "@/components/ChatBubble";
import Header from "../../components/Header";
import Modal from '@/components/Modal';
import EmptyState from '@/components/EmptyState';
import { IoMdArrowUp } from 'react-icons/io';
import { useManipulateMessage } from '@/hooks/useManipulateMessage';
import { Messages, MessageProps } from '@/types';
import { OPENAI_API_KEY, OPENAI_COMPLETION_API } from '@/configs';
import { FaRegTrashAlt } from "react-icons/fa";
import { HiOutlineHandThumbUp, HiOutlineHandThumbDown, HiOutlineChatBubbleLeftRight } from "react-icons/hi2"

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

    const handleEnableDeleteMode = () => setDeleteMode(true);

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
        const formattedMessages = messages.map(({ role, content }) => ({ role, content }))
        const requestBody = {
            'model': 'gpt-3.5-turbo',
            'messages': formattedMessages
        };
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            }
        }
        setIsTyping(true);
        axios.post(
            OPENAI_COMPLETION_API,
            JSON.stringify(requestBody),
            config
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

    const deleteConfirmationModal = () => {
        return (
            <Modal
                name='delete-confirm'
                visible={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
            >
                <div>
                    <h3 className="font-bold text-lg mb-4">Delete Chat?</h3>
                    <p>You will delete this chat, chats that have been deleted cannot be recovered</p>
                    <div className="modal-action flex flex-col space-y-3">
                        <button
                            onClick={handleDeleteChat}
                            className='btn btn-sm btn-error rounded-full text-white'
                        >
                            Delete
                        </button>
                        <button
                            className="btn btn-sm btn-ghost rounded-full"
                            onClick={() => setShowDeleteModal(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </Modal>
        )
    }

    const rateModal = () => {
        const isLike = rateType === 'like';
        return (
            <Modal
                name='rate'
                visible={showRateModal}
                onClose={() => setShowRateModal(false)}
            >
                <div>
                    <h3 className="font-bold text-lg mb-4">Rate</h3>
                    <div className={`rounded-full w-10 h-10 flex justify-center items-center mx-auto ${isLike ? 'bg-primary-content text-primary' : 'bg-red-50 text-error'}`}>
                        { isLike ? 
                            <HiOutlineHandThumbUp size={20} />
                            :
                            <HiOutlineHandThumbDown size={20} />
                        }
                    </div>
                    <div className='text-center my-3'>
                        <h3 className="font-bold text-lg mt-3">You {isLike ? 'like' : 'dislike'} the AI's reply</h3>
                        <p>Tell us about your experience regarding this chat reply</p>
                        <textarea 
                            className="textarea textarea-bordered w-full mt-3"
                            placeholder="Type your opinion..."
                            onChange={onChangeInputRate}
                        >
                        </textarea>
                    </div>
                    <div className="modal-action flex flex-col space-y-3">
                        <button
                            onClick={handleRateChat}
                            className='btn btn-sm btn-primary rounded-full text-white'
                        >
                            Submit
                        </button>
                        <button
                            className="btn btn-sm btn-ghost rounded-full"
                            onClick={handleCloseRateModal}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </Modal>
        )
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
                                <div className={isUser ? 'order-last ml-2' : 'order-first mr-2'}>
                                    <input
                                        type="checkbox"
                                        className="checkbox"
                                        checked={selectedChats.includes(index)}
                                        onChange={() => handleCheckbox(index)}
                                    />
                                </div>
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
                    <div className='flex justify-between'>
                        <div className='grid grid-cols-2 items-center divide-x divide-zinc-500'>
                            <span className='text-sm'>{selectedChats.length} Selected</span>
                            <span>
                                <button onClick={handleSelectAll} className='btn btn-sm btn-ghost'>Select All</button>
                            </span>
                        </div>
                        <button
                            onClick={() => setShowDeleteModal(true)}
                            className="btn btn-sm btn-ghost text-red-500 flex"
                            disabled={selectedChats.length === 0}
                        >
                            <FaRegTrashAlt />Delete
                        </button>
                    </div>
                    :
                    <div className='relative mx-3'>
                        <input
                            type="text"
                            value={input}
                            onChange={onChangeInput}
                            onKeyDown={handleEnterKey}
                            placeholder="Type message..."
                            className="input input-bordered input-primary w-full"
                        />
                        <button
                            onClick={handleSubmitMessage}
                            className="btn btn-primary btn-sm rounded-full w-9 h-9 absolute right-1 top-[0.35rem]"
                            disabled={!input}
                        >
                            <span><IoMdArrowUp size={20} /></span>
                        </button>
                    </div>
                }
            </div>
            {showDeleteModal && deleteConfirmationModal()}
            {showRateModal && rateModal()}
        </div>
    )
}