import { useEffect, useRef } from 'react';

interface ModalProps {
    name: string,
    visible: boolean;
    onClose?: () => void;
    children?: React.ReactNode
}

export default function Modal({
    name,
    visible,
    onClose,
    children
}: ModalProps) {
    const modalRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (!modalRef.current) {
            return;
        }
        visible ? modalRef.current.showModal() : modalRef.current.close();
    }, [visible]);

    return (
        <dialog ref={modalRef} id={`custom-modal-${name}`} className="modal">
            <div className="modal-box">
                {children}
            </div>
        </dialog>
    );
};