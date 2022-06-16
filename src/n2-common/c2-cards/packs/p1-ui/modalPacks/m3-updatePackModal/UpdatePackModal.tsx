import React, {ChangeEvent, FC, useState} from 'react';
import {Modal} from '../../../../../../n1-main/m1-ui/common/c6-Modal/Modal';
import SuperInputText from "../../../../../../n1-main/m1-ui/common/c1-SuperInputText/SuperInputText";
import s from './UpdatePackModal.module.css';
import SuperCheckbox from '../../../../../../n1-main/m1-ui/common/c3-SuperCheckbox/SuperCheckbox';
import SuperButton from '../../../../../../n1-main/m1-ui/common/c2-SuperButton/SuperButton';
import {useDispatch} from "react-redux";
import {updatePack} from "../../../p2-bll/packsReducer";

type UpdatePackModalType = {
    setShowModal: (show: boolean) => void
    name: string
    pack_id: string
    isPrivate: boolean
}

export const UpdatePackModal: FC<UpdatePackModalType> = ({setShowModal, name, pack_id, isPrivate}) => {
    const [newPackName, setNewPackName] = useState<string>(name)
    const [isPrivateUpdated, setIsPrivateUpdated] = useState<boolean>(isPrivate)

    const dispatch = useDispatch<any>()

    const onChangePackName = (e: ChangeEvent<HTMLInputElement>) => {
        setNewPackName(e.currentTarget.value)
    }
    const closeUpdatePack = () => setShowModal(false)
    const updatePackHandler = () => {
        dispatch(updatePack(pack_id, newPackName, isPrivateUpdated))
        setShowModal(false)
    }

    return (
        <Modal setShow={setShowModal} title={'Update Pack'}>
            <div className={s.block}>
                <SuperInputText
                    className={s.input}
                    name={"text"}
                    type={'text'}
                    placeholder={'New pack name...'}
                    value={newPackName}
                    onChange={onChangePackName}
                />
            </div>
            <div className={s.block}>
                <SuperCheckbox
                    checked={isPrivateUpdated}
                    onChangeChecked={setIsPrivateUpdated}
                >
                    <span className={s.private}>Private</span>
                </SuperCheckbox>
            </div>
            <div className={s.buttonsBlock}>
                <SuperButton onClick={closeUpdatePack}>Cancel</SuperButton>
                <SuperButton onClick={updatePackHandler}>Update</SuperButton>
            </div>
        </Modal>
    );
};