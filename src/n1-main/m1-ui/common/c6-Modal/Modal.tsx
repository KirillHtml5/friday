import React, {FC, MouseEvent} from 'react';
import s from './Modal.module.css';

type ModalType = {
    setShow: (show: boolean) => void
    children: React.ReactNode
    title: string
}

export const Modal: FC<ModalType> = ({setShow, children, title}) => {

    const closeModal = () => setShow(false)
    const onContentClick = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
    }

    return (
        <div className={s.modal} onClick={closeModal}>
            <div className={s.modalContent} onClick={(e) => onContentClick(e)}>
                <div>
                    <h2>{title}</h2>
                </div>
                {children}
            </div>
        </div>
    );
};