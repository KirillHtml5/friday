import React, {ChangeEvent, FC, useState} from 'react';
import { Modal } from '../../../../../../n1-main/m1-ui/common/c6-Modal/Modal';
import SuperInputText from "../../../../../../n1-main/m1-ui/common/c1-SuperInputText/SuperInputText";
import s from './AddPackModal.module.css';
import SuperCheckbox from '../../../../../../n1-main/m1-ui/common/c3-SuperCheckbox/SuperCheckbox';
import SuperButton from '../../../../../../n1-main/m1-ui/common/c2-SuperButton/SuperButton';
import {useDispatch} from "react-redux";
import {addPack} from "../../../p2-bll/packsReducer";

type AddPackModalType = {
    setShowModal: (show: boolean) => void
}

export const AddPackModal: FC<AddPackModalType> = ({setShowModal}) => {
    const [newPackName, setNewPackName] = useState<string>('')
    const [isPrivate, setIsPrivate] = useState<boolean>(false)

    const dispatch = useDispatch<any>()

    const onChangePackName = (e: ChangeEvent<HTMLInputElement>) => {
        setNewPackName(e.currentTarget.value)
    }
    const addPackHandler = () => {
        console.log(newPackName)
        dispatch(addPack(newPackName, isPrivate))
        setShowModal(false)
    }

    return (
        <Modal setShow={setShowModal} title={'Add Pack'}>
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
                    checked={isPrivate}
                    onChangeChecked={setIsPrivate}
                >
                    <span className={s.private}>Private</span>
                </SuperCheckbox>
            </div>
            <div className={s.buttonsBlock}>
                <SuperButton onClick={() => setShowModal(false)}>Cancel</SuperButton>
                <SuperButton onClick={addPackHandler}>Save</SuperButton>
            </div>
        </Modal>
    );
};