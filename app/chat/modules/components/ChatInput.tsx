import { ChangeEvent, KeyboardEvent } from 'react'
import { IoMdArrowUp } from 'react-icons/io'

interface ChatInputProps {
    input: string,
    onChangeInput?: (e: ChangeEvent<HTMLInputElement>) => void,
    onEnterKey?: (e: KeyboardEvent<HTMLInputElement>) => void,
    onSubmitMessage?: () => void,
}

export default function ChatInput({
    input,
    onChangeInput,
    onEnterKey,
    onSubmitMessage
}: ChatInputProps) {
    return (
        <div className='relative mx-3'>
            <input
                type="text"
                value={input}
                onChange={onChangeInput}
                onKeyDown={onEnterKey}
                placeholder="Type message..."
                className="input input-bordered input-primary w-full"
            />
            <button
                onClick={onSubmitMessage}
                className="btn btn-primary btn-sm rounded-full w-9 h-9 absolute right-1 top-[0.35rem]"
                disabled={!input}
            >
                <span><IoMdArrowUp size={20} /></span>
            </button>
        </div>
    )
}
