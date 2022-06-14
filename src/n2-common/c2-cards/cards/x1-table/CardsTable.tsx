import s from '../../packs/p1-ui/packs/PacksTable.module.css'
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {ReduxRootType} from "../../../../n1-main/m2-bll/store/ReduxStore";
import {
    CardsType, changeSort,
    ThunkDispatchActionType
} from "../../../../n1-main/m2-bll/reducers/Cards-reducer";
import {CardsItem} from "./cardsItems/cardsItems";



export const CardsTable = () => {
    const dispatch = useDispatch<ThunkDispatchActionType>()
    const cards = useSelector<ReduxRootType, CardsType[]>(state => state.cards.cards)
    const [upper, setUpper] = useState<boolean>(false)
    const newSortCards = (sort: string) => {
        !upper ? dispatch(changeSort(`0${sort}`)) : dispatch(changeSort(`1${sort}`))
        setUpper(!upper)
    }


    return (<>
        <table className={s.table}>
            <thead>
            <tr>
                <th onClick={() => newSortCards('question')}>Question</th>
                <th onClick={() => newSortCards('answer')}>Answer</th>
                <th onClick={() => newSortCards('updated')}>Last Updated</th>
                <th onClick={() => newSortCards('grade')}>Grade</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {cards.map(p => <CardsItem key={p._id}
                                       id={p._id}
                                       cardsPack_id={p.cardsPack_id}
                                       user_id={p.user_id}
                                       updated={p.updated}
                                       question={p.question}
                                       answer={p.answer}
                                       grade={p.grade}

            />)}
            </tbody>
        </table>
    </>)
}