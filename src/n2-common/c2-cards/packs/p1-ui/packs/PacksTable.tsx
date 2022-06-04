import React from 'react';
import s from './PacksTable.module.css'
import {PackItem} from "./packItem/PackItem";

export const PacksTable = () => {
    const packs = [
        {
            _id: "5eb6cef840b7bf1cf0d8122d",
            user_id: "5eb543f6bea3ad21480f1ee7",
            name: "no Name",
            cardsCount: 25,
            created: "2020-05-09T15:40:40.339Z",
            updated: "2020-05-09T15:40:40.339Z"
        },
        {
            _id: "5eb6cef840b7bf1cf0d8122d",
            user_id: "5eb543f6bea3ad21480f1ee7",
            name: "no Name",
            cardsCount: 25,
            created: "2020-05-09T15:40:40.339Z",
            updated: "2020-05-09T15:40:40.339Z"
        },
        {
            _id: "5eb6cef840b7bf1cf0d8122d",
            user_id: "5eb543f6bea3ad21480f1ee7",
            name: "no Name",
            cardsCount: 25,
            created: "2020-05-09T15:40:40.339Z",
            updated: "2020-05-09T15:40:40.339Z"
        },
    ]

    return (
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
                                      user_id={p.user_id}
                                      name={p.name}
                                      cardsCount={p.cardsCount}
                                      created={p.created}
                                      updated={p.updated}
            />)}
            </tbody>
        </table>
    );
};