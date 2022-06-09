import React, {FC} from 'react';
import {useDispatch} from "react-redux";
import {deletePack, updatePack} from "../../../p2-bll/packsReducer";
import s from '../PacksTable.module.css';
import {useNavigate} from "react-router-dom";
import {getCards} from "../../../../../../n1-main/m2-bll/reducers/Cards-reducer";



type PackItemPropsType = {
    pack_id: string
    user_id: string
    creator_id: string
    name: string
    cardsCount: number
    createdBy: string
    updated: string
}

export const PackItem: FC<PackItemPropsType> = ({
                                                    pack_id,
                                                    user_id,
                                                    creator_id,
                                                    name,
                                                    cardsCount,
                                                    createdBy,
                                                    updated
                                                }) => {
    const dispatch = useDispatch<any>()
    const deletePackHandler = () => {
        dispatch(deletePack(pack_id))
    }
    const updatePackHandler = () => {
        dispatch(updatePack(pack_id, 'Updated title'))
    }
    const navigate = useNavigate()
    const openCardPage = () => {
        navigate(`/cards/${pack_id}`)
        dispatch(getCards(pack_id))
    }

    return (
        <tr>
            <td>{name}</td>
            <td>{cardsCount}</td>
            <td>{updated}</td>
            <td>{createdBy}</td>
            <td className={s.buttonsBlock}>
                {user_id === creator_id
                    ? <>
                        <button onClick={openCardPage}>Learn</button>
                        <button onClick={updatePackHandler}>Edit</button>
                        <button onClick={deletePackHandler}>Delete</button>
                    </>
                    : <button onClick={openCardPage}>Learn</button>

                }
            </td>
        </tr>
    );
};