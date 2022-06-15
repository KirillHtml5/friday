import React, {FC, useState} from 'react';
import {useDispatch} from "react-redux";
import {updatePack} from "../../../p2-bll/packsReducer";
import s from '../PacksTable.module.css';
import {useNavigate} from "react-router-dom";
import {DeletePackModal} from '../../modalPacks/m2-deletePackModal/DeletePackModal';


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

    const [showDeleteModal, setDeleteModal] = useState<boolean>(false)
    const dispatch = useDispatch<any>()
    const navigate = useNavigate()

    const deletePackHandler = () => {
        setDeleteModal(true)
    }
    const updatePackHandler = () => {
        dispatch(updatePack(pack_id, 'Updated title'))
    }
    const openCardPage = () => {
        navigate(`/cards/${pack_id}`)
    }
    const openLearnPage = () => {
        navigate(`/learn/${pack_id}`)
    }

    return (
        <tr>
            <td onClick={openCardPage} className={s.packName}>{name}</td>
            <td>{cardsCount}</td>
            <td>{updated.slice(0, 10)}</td>
            <td>{createdBy}</td>
            <td className={s.buttonsBlock}>
                {user_id === creator_id
                    ? <>
                        <button onClick={openLearnPage}>Learn</button>
                        <button onClick={updatePackHandler}>Edit</button>
                        <button onClick={deletePackHandler}>Delete</button>
                    </>
                    : <button onClick={openLearnPage}>Learn</button>

                }
            </td>
            {showDeleteModal &&
                <DeletePackModal
                    setShowModal={setDeleteModal}
                    name={name}
                    pack_id={pack_id}
                />}
        </tr>
    );
};