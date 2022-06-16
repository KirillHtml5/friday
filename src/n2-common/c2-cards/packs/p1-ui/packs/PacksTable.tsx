import React, {useState} from 'react';
import s from './PacksTable.module.css'
import {PackItem} from "./packItem/PackItem";
import {PackType} from "../../p3-dal/packsAPI";
import {useDispatch, useSelector} from "react-redux";
import {ReduxRootType} from "../../../../../n1-main/m2-bll/store/ReduxStore";
import {setSortPacks} from "../../p2-bll/packsReducer";

export const PacksTable = () => {
    const packs = useSelector<ReduxRootType, PackType[]>(state => state.packs.cardPacks)
    const user_id = useSelector<ReduxRootType, string>(state => state.profile.user._id)
    const [sortUp, setSortUp] = useState<boolean>(false)
    const dispatch = useDispatch<any>()
    const newSortPacks = (sort: string) => {
        sortUp ? dispatch(setSortPacks(`1${sort}`)) : dispatch(setSortPacks(`0${sort}`))
        setSortUp(!sortUp)
    }
    return (
        <>
            <table className={s.table}>
                <thead>
                <tr>
                    <th onClick={() => newSortPacks('name')}>Name</th>
                    <th onClick={() => newSortPacks('cardsCount')}>Cards</th>
                    <th onClick={() => newSortPacks('updated')}>Last Updated</th>
                    <th onClick={() => newSortPacks('createdBy')}>Created by</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {packs.map(p => <PackItem key={p._id}
                                          pack_id={p._id}
                                          user_id={user_id}
                                          creator_id={p.user_id}
                                          name={p.name}
                                          cardsCount={p.cardsCount}
                                          createdBy={p.user_name}
                                          updated={p.updated}
                                          isPrivate={p.private}
                />)}
                </tbody>
            </table>
        </>
    );
};