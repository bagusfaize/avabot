import Modal from '@/components/Modal'

interface DeleteConfirmationModalProps {
    showDeleteModal: boolean,
    rateType: string,
    selectedChats: number[],
    onCloseDeleteModal: () => void,
    onDeleteChat: () => void,
}

export default function DeleteConfirmationModal({
    showDeleteModal,
    onCloseDeleteModal,
    onDeleteChat
}: DeleteConfirmationModalProps) {
    return (
        <Modal
            name='delete-confirm'
            visible={showDeleteModal}
            onClose={onCloseDeleteModal}
        >
            <div>
                <h3 className="font-bold text-lg mb-4">Delete Chat?</h3>
                <p>You will delete this chat, chats that have been deleted cannot be recovered</p>
                <div className="modal-action flex flex-col space-y-3">
                    <button
                        onClick={onDeleteChat}
                        className='btn btn-sm btn-error rounded-full text-white'
                    >
                        Delete
                    </button>
                    <button
                        className="btn btn-sm btn-ghost rounded-full"
                        onClick={onCloseDeleteModal}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </Modal>
    )
}
