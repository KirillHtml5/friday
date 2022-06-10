import React, {useState} from 'react';
import c from './search.module.css'
import {useDispatch} from "react-redux";
import {setPackName} from "../c2-cards/packs/p2-bll/packsReducer";


const Search = () => {

    const [searchValue, setSearchValue] = useState('')
    const dispatch = useDispatch()

    const searchHandler = () => {
        dispatch(setPackName(searchValue))
        setSearchValue('')

    }
    return (

        <div className={c.search}>
            <input
                value={searchValue}
                onChange={(e) => setSearchValue(e.currentTarget.value)}
                type={"text"} placeholder={"input name"}
                className={c.input}/>
            <button onClick={searchHandler} className={c.button}>search</button>
        </div>
    );
};

export default Search;