import React, {FC} from 'react';

type PackItemPropsType = {
    user_id: string
    name: string
    cardsCount: number
    createdBy: string
    updated: string
}

export const PackItem: FC<PackItemPropsType> = ({name, cardsCount, createdBy, updated}) => {
    return (
        <tr>
            <td>{name}</td>
            <td>{cardsCount}</td>
            <td>{updated}</td>
            <td>{createdBy}</td>
            <td>
                <button>Delete</button>
                <button>Edit</button>
                <button>Learn</button>
            </td>
        </tr>
    );
};