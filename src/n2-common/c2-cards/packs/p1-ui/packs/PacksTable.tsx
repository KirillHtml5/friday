import React, {useState} from 'react';
import s from './PacksTable.module.css'
import {PackItem} from "./packItem/PackItem";
import {PacksAPI, PackType} from "../../p3-dal/packsAPI";

export const PacksTable = () => {
    const [packs, setPacks] = useState<PackType[]>([])
    const getPacks = async () => {
        // setPacks(await PacksAPI.getPacks())
        const res = await PacksAPI.getPacks()
        console.log(res)
        await setPacks(res)
    }
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
                                          user_id={p.user_id}
                                          name={p.name}
                                          cardsCount={p.cardsCount}
                                          created={p.created}
                                          updated={p.updated}
                />)}
                </tbody>
            </table>
            <button onClick={getPacks}>GET PACKS</button>
        </>
    );
};