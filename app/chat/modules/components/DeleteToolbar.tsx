
import { FaRegTrashAlt } from 'react-icons/fa'

interface DeleteToolbarProps {
    selectedChats: number[],
    handleSelectAll?: () => void,
    onShowDeleteModal?: () => void,
}

export default function DeleteToolbar({
    selectedChats,
    handleSelectAll,
    onShowDeleteModal
}: DeleteToolbarProps) {
    return (
        <div className='flex justify-between'>
            <div className='grid grid-cols-2 items-center divide-x divide-zinc-500'>
                <span className='text-sm'>{selectedChats.length} Selected</span>
                <span>
                    <button onClick={handleSelectAll} className='btn btn-sm btn-ghost'>Select All</button>
                </span>
            </div>
            <button
                onClick={onShowDeleteModal}
                className="btn btn-sm btn-ghost text-red-500 flex"
                disabled={selectedChats.length === 0}
            >
                <FaRegTrashAlt />Delete
            </button>
        </div>
    )
}
