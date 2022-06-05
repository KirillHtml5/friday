import React, {FC} from 'react';
import {useDispatch} from "react-redux";
import {deletePack} from "../../../p2-bll/packsReducer";

type PackItemPropsType = {
    pack_id: string
    user_id: string
    name: string
    cardsCount: number
    createdBy: string
    updated: string
}

export const PackItem: FC<PackItemPropsType> = ({pack_id, name, cardsCount, createdBy, updated}) => {
    const dispatch = useDispatch<any>()
    const deletePackHandler = () => {
        dispatch(deletePack(pack_id))
    }
    return (
        <tr>
            <td>{name}</td>
            <td>{cardsCount}</td>
            <td>{updated}</td>
            <td>{createdBy}</td>
            <td>
                <button onClick={deletePackHandler}>Delete</button>
                <button>Edit</button>
                <button>Learn</button>
            </td>
        </tr>
    );
};