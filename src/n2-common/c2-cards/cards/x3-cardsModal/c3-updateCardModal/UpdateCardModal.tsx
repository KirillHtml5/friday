import React, {ChangeEvent, FC, useState} from 'react';
import s from './UpdateCardModal.module.css';
import {useDispatch} from "react-redux";
import {updateCard} from "../../../../../n1-main/m2-bll/reducers/Cards-reducer";
import {Modal} from "../../../../../n1-main/m1-ui/common/c6-Modal/Modal";
import SuperInputText from "../../../../../n1-main/m1-ui/common/c1-SuperInputText/SuperInputText";
import SuperButton from "../../../../../n1-main/m1-ui/common/c2-SuperButton/SuperButton";

type UpdateCardModalType = {
    setShowModal: (show: boolean) => void
    pack_id: string
    card_id: string
    question: string
    answer: string
}

export const UpdateCardModal: FC<UpdateCardModalType> = ({setShowModal, pack_id, card_id, question, answer}) => {
    const [newQuestion, setNewQuestion] = useState<string>(question)
    const [newAnswer, setNewAnswer] = useState<string>(answer)

    const dispatch = useDispatch<any>()

    const onChangeQuestion = (e: ChangeEvent<HTMLInputElement>) => {
        setNewQuestion(e.currentTarget.value)
    }
    const onChangeAnswer = (e: ChangeEvent<HTMLInputElement>) => {
        setNewAnswer(e.currentTarget.value)
    }
    const closeUpdatePack = () => setShowModal(false)
    const updatePackHandler = () => {
        dispatch(updateCard(pack_id, card_id, newQuestion, newAnswer))
        setShowModal(false)
    }

    return (
        <Modal setShow={setShowModal} title={'Update Pack'}>
            <div className={s.block}>
                Question
                <SuperInputText
                    className={s.input}
                    name={"text"}
                    type={'text'}
                    placeholder={'Question'}
                    value={newQuestion}
                    onChange={onChangeQuestion}
                />
            </div>
            <div className={s.block}>
                Answer
                <SuperInputText
                    className={s.input}
                    name={"text"}
                    type={'text'}
                    placeholder={'Answer'}
                    value={newAnswer}
                    onChange={onChangeAnswer}
                />
            </div>
            <div className={s.buttonsBlock}>
                <SuperButton onClick={closeUpdatePack}>Cancel</SuperButton>
                <SuperButton onClick={updatePackHandler}>Update</SuperButton>
            </div>
        </Modal>
    );
};