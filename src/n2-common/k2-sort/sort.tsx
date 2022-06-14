import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {getPacks, setSortPacks} from "../c2-cards/packs/p2-bll/packsReducer";


const Sort: React.FC = () => {
    const [sort, setSort] = useState(1);
    const dispatch = useDispatch<any>();

    const sortPrice = (x: number) => {
        setSort(x);
        dispatch(setSortPacks(x + 'cardsCount'));
        dispatch(getPacks());
    };

    return (

        <div>

            <button onClick={() => sortPrice(0)}>/\</button>
            <button onClick={() => sortPrice(1)}>\/</button>
        </div>
    );
};

export default Sort;