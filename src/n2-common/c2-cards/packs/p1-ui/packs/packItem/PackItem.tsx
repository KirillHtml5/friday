import React, {FC} from 'react';

type PackItemPropsType = {
    user_id: string
    name: string
    cardsCount: number
    created: string
    updated: string
}

export const PackItem: FC<PackItemPropsType> = ({name, cardsCount, created, updated}) => {
    return (
        <tr>
            <td>{name}</td>
            <td>{cardsCount}</td>
            <td>{updated}</td>
            <td>{created}</td>
            <td>
                <button>Delete</button>
                <button>Edit</button>
                <button>Learn</button>
            </td>
        </tr>
    );
};