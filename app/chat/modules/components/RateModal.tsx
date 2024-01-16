import { ChangeEvent } from 'react';
import Modal from "@/components/Modal";
import { HiOutlineHandThumbUp, HiOutlineHandThumbDown } from "react-icons/hi2"

interface RateModalProps {
    rateType: string,
    showRateModal: boolean,
    selectedChats: number[],
    onCloseRateModal: () => void,
    handleRateChat: () => void,
    onChangeInputRate: (e: ChangeEvent<HTMLTextAreaElement>) => void,
}

export default function RateModal({
    rateType,
    showRateModal,
    onCloseRateModal,
    onChangeInputRate,
    handleRateChat
}: RateModalProps) {
    const isLike = rateType === 'like';
    return (
        <Modal
            name='rate'
            visible={showRateModal}
            onClose={onCloseRateModal}
        >
            <div>
                <h3 className="font-bold text-lg mb-4">Rate</h3>
                <div className={`rounded-full w-10 h-10 flex justify-center items-center mx-auto ${isLike ? 'bg-primary-content text-primary' : 'bg-red-50 text-error'}`}>
                    {isLike ?
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
                        onClick={onCloseRateModal}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </Modal>
    )
}
