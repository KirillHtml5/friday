import React, {FC} from 'react';
import {changeCardsPerPage, deleteCard, updateCard} from "../../../../../n1-main/m2-bll/reducers/Cards-reducer";
import {useDispatch, useSelector} from "react-redux";
import {ReduxRootType} from "../../../../../n1-main/m2-bll/store/ReduxStore";
import s from '../../../packs/p1-ui/packs/PacksTable.module.css'

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

    const myId = useSelector<ReduxRootType, string>(state => state.profile.user._id)
    const pageCount = useSelector<ReduxRootType,number>(state => state.cards.pageCount)

    const {question, answer, grade, updated, cardsPack_id, id, user_id} = props

    const deleteSelectCard = () => {
        dispatch(changeCardsPerPage(pageCount))
    }

    const editSelectCard = () => {
        dispatch(updateCard(cardsPack_id, id))
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
                        <button onClick={deleteSelectCard}>Delete</button>
                    </> : ''
                }
            </td>
        </tr>
    );
};