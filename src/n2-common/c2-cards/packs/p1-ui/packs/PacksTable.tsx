import React from 'react';
import s from './PacksTable.module.css'
import {PackItem} from "./packItem/PackItem";
import {PackType} from "../../p3-dal/packsAPI";
import {useSelector} from "react-redux";
import {ReduxRootType} from "../../../../../n1-main/m2-bll/store/ReduxStore";

export const PacksTable = () => {
    const packs = useSelector<ReduxRootType, PackType[]>(state => state.packs.cardPacks)
    const user_id = useSelector<ReduxRootType, string>(state => state.profile.user._id)

    return (
        <>
            <table className={s.tablePacks}>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Cards</th>
                    <th>Last Updated</th>
                    <th>Created by</th>
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
                />)}
                </tbody>
            </table>
        </>
    );
};