'use client'

import { RiRobot2Line } from "react-icons/ri"
import { RxReload } from "react-icons/rx"
import { MdContentCopy } from 'react-icons/md'
import { HiOutlineThumbDown, HiThumbDown } from "react-icons/hi"
import { HiOutlineHandThumbUp, HiHandThumbUp } from "react-icons/hi2"
import { RateType } from "@/types"

interface ChatBubbleProps {
    index: number,
    message: string,
    time: string,
    isUser: boolean,
    rate?: RateType,
    onThumbsUp?: () => void,
    onThumbsDown?: () => void,
    onCopy?: () => void,
}

export default function ChatBubble({
    message,
    time,
    isUser,
    onThumbsUp,
    onThumbsDown,
    rate
}: ChatBubbleProps) {
    const isBot = !isUser;
    return (
        <>
            <div className={`chat ${isUser ? 'chat-end' : 'chat-start'} my-1 flex-1`}>
                {isBot &&
                    <div className="chat-image avatar col-start-2">
                        <span className="rounded-full bg-base-200 w-10 h-10 flex justify-center items-center">
                            <RiRobot2Line size={20} />
                        </span>
                    </div>
                }
                <div className={`chat-bubble rounded-md ${isUser ? 'bg-base-300 text-zinc-600' : 'bg-primary'}`}>
                    <div>{message}</div>
                    <div className={`flex items-end ${isBot ? 'justify-between' : 'justify-end'}`}>
                        {isBot &&
                            <div className="flex">
                                <button className="btn btn-xs btn-ghost"><RxReload /></button>
                                <button className="btn btn-xs btn-ghost"><MdContentCopy /></button>
                                <button onClick={onThumbsUp} className="btn btn-xs btn-ghost">
                                    {rate?.isLike ? <HiHandThumbUp /> : <HiOutlineHandThumbUp />}
                                </button>
                                <button onClick={onThumbsDown} className="btn btn-xs btn-ghost">
                                    {rate?.isDislike ? <HiThumbDown /> : <HiOutlineThumbDown />}
                                </button>
                            </div>
                        }
                        <div className={`flex text-xs`}>{time}</div>
                    </div>
                </div>
            </div>
        </>
    )
}
