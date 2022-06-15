import React, {FC, useState} from 'react';
import {updateCard} from "../../../../../n1-main/m2-bll/reducers/Cards-reducer";
import {useDispatch, useSelector} from "react-redux";
import {ReduxRootType} from "../../../../../n1-main/m2-bll/store/ReduxStore";
import s from '../../../packs/p1-ui/packs/PacksTable.module.css'
import {DeleteCardModal} from "../../x3-cardsModal/c2-deleteCardModal/DeleteCardModal";

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

    const dispatch = useDispatch<any>()

    const [showDeleteCardModal, setShowDeleteCardModal] = useState<boolean>(false)
    const myId = useSelector<ReduxRootType, string>(state => state.profile.user._id)

    const {question, answer, grade, updated, cardsPack_id, id, user_id} = props

    const editSelectCard = () => {
        dispatch(updateCard(cardsPack_id, id))
    }
    const onDeleteModalHandler = () => {
        setShowDeleteCardModal(true)
    }

    return (
        <tr>
            <td>{question}</td>
            <td>{answer}</td>
            <td>{new Date(updated).toLocaleString()}</td>
            <td>{grade}</td>

            <td className={s.buttonsBlock}>
                {user_id ===  myId ?
                    <>
                        <button onClick={editSelectCard}>Edit</button>
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
        </tr>
    );
};