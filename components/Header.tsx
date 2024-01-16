'use client'

import { useRouter } from "next/navigation";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa6";
import { TbDotsVertical } from "react-icons/tb";
import { RiRobot2Line } from "react-icons/ri"

interface HeaderProps {
    onClickDelete: () => void,
    onCancelDelete: () => void,
    deleteMode: boolean,
    isTyping: boolean
}

export default function Header({
    onClickDelete,
    onCancelDelete,
    deleteMode,
    isTyping
}: HeaderProps) {
    const router = useRouter()

    const goBack = () => router.back()

    return (
        <div className="navbar bg-base-200">
            <div className="flex-none">
                <button
                    onClick={goBack}
                    className="btn btn-circle btn-ghost"
                >
                    <FaChevronLeft />
                </button>
            </div>
            <div className="flex-1 items-center space-x-2">
                <div className="avatar online">
                    <span className="rounded-full bg-base-300 w-10 h-10 flex justify-center items-center">
                        <RiRobot2Line size={20} />
                    </span>
                </div>
                <div className="flex flex-col ml-5">
                    <p>Avabot</p>
                    <p className="text-xs">{isTyping ? 'AI is typing...' : 'Online'}</p>
                </div>
            </div>
            {deleteMode ?
                <button
                    onClick={onCancelDelete}
                    className="btn btn-ghost m-1"
                >
                    Cancel
                </button>
                :
                <div className="flex-none">
                    <details className="dropdown dropdown-end">
                        <summary className="m-1 btn btn-circle btn-ghost"><TbDotsVertical size={16} /></summary>
                        <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-40">
                            <li onClick={onClickDelete}>
                                <span className="text-red-500"><FaRegTrashAlt />Delete Chat</span>
                            </li>
                        </ul>
                    </details>
                </div>
            }
        </div>
    )
}
