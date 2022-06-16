import React, {FC, useState} from 'react';
import s from '../PacksTable.module.css';
import {useNavigate} from "react-router-dom";
import {DeletePackModal} from '../../modalPacks/m2-deletePackModal/DeletePackModal';
import {UpdatePackModal} from "../../modalPacks/m3-updatePackModal/UpdatePackModal";


type PackItemPropsType = {
    pack_id: string
    user_id: string
    creator_id: string
    name: string
    cardsCount: number
    createdBy: string
    updated: string
    isPrivate: boolean
}

export const PackItem: FC<PackItemPropsType> = ({
                                                    pack_id,
                                                    user_id,
                                                    creator_id,
                                                    name,
                                                    cardsCount,
                                                    createdBy,
                                                    updated,
                                                    isPrivate,
                                                }) => {

    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
    const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false)
    const navigate = useNavigate()

    const deletePackHandler = () => {
        setShowDeleteModal(true)
    }
    const updatePackHandler = () => {
        setShowUpdateModal(true)
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
            <td>{new Date(updated).toLocaleString()}</td>
            <td>{createdBy}</td>
            <td className={s.buttonsBlock}>
                {user_id === creator_id
                    ? <>
                        <button onClick={openLearnPage} disabled={cardsCount === 0}>Learn</button>
                        <button onClick={updatePackHandler}>Edit</button>
                        <button onClick={deletePackHandler}>Delete</button>
                    </>
                    : <button onClick={openLearnPage} disabled={cardsCount === 0}>Learn</button>

                }
            </td>
            {showDeleteModal &&
                <DeletePackModal
                    setShowModal={setShowDeleteModal}
                    name={name}
                    pack_id={pack_id}
                />
            }
            {showUpdateModal &&
                <UpdatePackModal
                    setShowModal={setShowUpdateModal}
                    name={name}
                    pack_id={pack_id}
                    isPrivate={isPrivate}
                />
            }
        </tr>
    );
};