import React, {ChangeEvent, FC, useState} from 'react';
import s from './AddCardModal.module.css';
import {useDispatch} from "react-redux";
import {Modal} from "../../../../../n1-main/m1-ui/common/c6-Modal/Modal";
import SuperInputText from "../../../../../n1-main/m1-ui/common/c1-SuperInputText/SuperInputText";
import SuperButton from '../../../../../n1-main/m1-ui/common/c2-SuperButton/SuperButton';
import {addCard} from "../../../../../n1-main/m2-bll/reducers/Cards-reducer";

type AddCardModalType = {
    setShowModal: (show: boolean) => void
    packId: string
}

export const AddCardModal: FC<AddCardModalType> = ({setShowModal, packId}) => {
    const [question, setQuestion] = useState<string>('')
    const [answer, setAnswer] = useState<string>('')

    const dispatch = useDispatch<any>()

    const onChangeQuestion = (e: ChangeEvent<HTMLInputElement>) => {
        setQuestion(e.currentTarget.value)
    }
    const onChangeAnswer = (e: ChangeEvent<HTMLInputElement>) => {
        setAnswer(e.currentTarget.value)
    }
    const closeAddCardModal = () => setShowModal(false)
    const addCardHandler = () => {
        dispatch(addCard(packId, question, answer))
        setShowModal(false)
    }

    return (
        <Modal setShow={setShowModal} title={'Add Card'}>
            <div className={s.block}>
                <SuperInputText
                    className={s.input}
                    name={'text'}
                    type={'text'}
                    placeholder={'Question'}
                    value={question}
                    onChange={onChangeQuestion}
                />
            </div>
            <div className={s.block}>
                <SuperInputText
                    className={s.input}
                    name={'text'}
                    type={'text'}
                    placeholder={'Answer'}
                    value={answer}
                    onChange={onChangeAnswer}
                />
            </div>
            <div className={s.buttonsBlock}>
                <SuperButton onClick={closeAddCardModal}>Cancel</SuperButton>
                <SuperButton onClick={addCardHandler}>Save</SuperButton>
            </div>
        </Modal>
    );
};