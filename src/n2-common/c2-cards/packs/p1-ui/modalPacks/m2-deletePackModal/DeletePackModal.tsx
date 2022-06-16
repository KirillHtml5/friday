import React, {FC} from 'react';
import {Modal} from '../../../../../../n1-main/m1-ui/common/c6-Modal/Modal';
import s from './DeletePackModal.module.css'
import SuperButton from '../../../../../../n1-main/m1-ui/common/c2-SuperButton/SuperButton';
import {useDispatch} from "react-redux";
import { deletePack } from '../../../p2-bll/packsReducer';

type DeletePackModalType = {
    setShowModal: (show: boolean) => void
    name: string
    pack_id: string
}

export const DeletePackModal: FC<DeletePackModalType> = ({setShowModal, name, pack_id}) => {
    const dispatch = useDispatch<any>()

    const deletePackHandler = () => {
        dispatch(deletePack(pack_id))
        setShowModal(false)
    }
    const closeDeletePackModal = () => setShowModal(false)

    return (
        <Modal setShow={setShowModal} title={'Delete Pack'}>
            <div className={s.block}>
                <p>
                    Do you really want to remove <span className={s.name}>{name}</span>?
                </p>
                <p>
                    All cards will be excluded from this course.
                </p>
            </div>
            <div className={s.buttonsBlock}>
                <SuperButton onClick={closeDeletePackModal}>Cancel</SuperButton>
                <SuperButton onClick={deletePackHandler}>Delete</SuperButton>
            </div>
        </Modal>
    );
};