import React, {FC} from 'react';
import s from './DeleteCardModal.module.css'
import {useDispatch} from "react-redux";
import { Modal } from '../../../../../n1-main/m1-ui/common/c6-Modal/Modal';
import SuperButton from "../../../../../n1-main/m1-ui/common/c2-SuperButton/SuperButton";
import {deleteCard} from "../../../../../n1-main/m2-bll/reducers/Cards-reducer";

type DeleteCardModalType = {
    setShowModal: (show: boolean) => void
    name: string
    pack_id: string
    cardId: string
}

export const DeleteCardModal: FC<DeleteCardModalType> = ({setShowModal, name, pack_id, cardId}) => {
    const dispatch = useDispatch<any>()

    const deleteCardHandler = () => {
        dispatch(deleteCard(pack_id, cardId))
        setShowModal(false)
    }
    const closeDeleteCardModal = () => setShowModal(false)

    return (
        <Modal setShow={setShowModal} title={'Delete Pack'}>
            <div className={s.block}>
                <p>
                    Do you really want to remove <span className={s.name}>{name}</span>?
                </p>
                <p>
                    This card will be permanently deleted.
                </p>
            </div>
            <div className={s.buttonsBlock}>
                <SuperButton onClick={closeDeleteCardModal}>Cancel</SuperButton>
                <SuperButton onClick={deleteCardHandler}>Delete</SuperButton>
            </div>
        </Modal>
    );
};