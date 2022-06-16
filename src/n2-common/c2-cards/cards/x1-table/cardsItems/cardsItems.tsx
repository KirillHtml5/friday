import React, {FC, useState} from 'react';
import {useSelector} from "react-redux";
import {ReduxRootType} from "../../../../../n1-main/m2-bll/store/ReduxStore";
import s from '../../../packs/p1-ui/packs/PacksTable.module.css'
import {DeleteCardModal} from "../../x3-cardsModal/c2-deleteCardModal/DeleteCardModal";
import {UpdateCardModal} from "../../x3-cardsModal/c3-updateCardModal/UpdateCardModal";

type CardsItemsType = {
    question: string
    user_id: string
    updated: string
    answer: string
    grade: number
    cardsPack_id: string
    id: string
}

export const CardsItem: FC<CardsItemsType> = (props) => {
    const [showDeleteCardModal, setShowDeleteCardModal] = useState<boolean>(false)
    const [showUpdateCardModal, setShowUpdateCardModal] = useState<boolean>(false)
    const myId = useSelector<ReduxRootType, string>(state => state.profile.user._id)

    const {question, answer, grade, updated, cardsPack_id, id, user_id} = props

    const onDeleteModalHandler = () => {
        setShowDeleteCardModal(true)
    }
    const onUpdateModalHandler = () => {
        setShowUpdateCardModal(true)
    }

    return (
        <tr>
            <td>{question}</td>
            <td>{answer}</td>
            <td>{new Date(updated).toLocaleString()}</td>
            <td>{grade}</td>

            <td className={s.buttonsBlock}>
                {user_id === myId ?
                    <>
                        <button onClick={onUpdateModalHandler}>Edit</button>
                        <button onClick={onDeleteModalHandler}>Delete</button>
                    </> : ''
                }
            </td>
            {showDeleteCardModal &&
                <DeleteCardModal
                    setShowModal={setShowDeleteCardModal}
                    name={question}
                    pack_id={cardsPack_id}
                    cardId={id}
                />
            }
            {showUpdateCardModal &&
                <UpdateCardModal
                    setShowModal={setShowUpdateCardModal}
                    pack_id={cardsPack_id}
                    card_id={id}
                    question={question}
                    answer={answer}
                />
            }
        </tr>
    );
};