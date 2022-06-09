import s from '../../packs/p1-ui/packs/PacksTable.module.css'
import React from "react";
import {useSelector} from "react-redux";
import {ReduxRootType} from "../../../../n1-main/m2-bll/store/ReduxStore";
import {CardsType} from "../../../../n1-main/m2-bll/reducers/Cards-reducer";
import {CardsItem} from "./cardsItems/cardsItems";

export const CardsTable = () => {

    const cards = useSelector<ReduxRootType, CardsType[]>(state => state.cards.cards)

    return (<>
        <table className={s.table}>
            <thead>
            <tr>
                <th>Question</th>
                <th>Answer</th>
                <th>Last Updated</th>
                <th>Grade</th>
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