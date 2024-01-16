
interface ChatCheckboxProps {
    isUser: boolean,
    index: number,
    selectedChats: number[],
    onClickCheckbox: () => void,
}

export default function ChatCheckbox({
    isUser,
    selectedChats,
    index,
    onClickCheckbox
}: ChatCheckboxProps) {
    return (
        <div className={isUser ? 'order-last ml-2' : 'order-first mr-2'}>
            <input
                type="checkbox"
                className="checkbox"
                checked={selectedChats.includes(index)}
                onChange={onClickCheckbox}
            />
        </div>
    )
}
