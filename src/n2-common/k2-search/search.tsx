import React, {useState} from 'react';
import c from './search.module.css'
import {useDispatch, useSelector} from "react-redux";
import {setCurrentPage, setPackName} from "../c2-cards/packs/p2-bll/packsReducer";
import {ReduxRootType} from "../../n1-main/m2-bll/store/ReduxStore";
import SuperInputText from "../../n1-main/m1-ui/common/c1-SuperInputText/SuperInputText";


const Search = () => {
    const value = useSelector<ReduxRootType, string>(state => state.packs.packName)
    const [searchValue, setSearchValue] = useState(value)
    const dispatch = useDispatch()

    const searchHandler = () => {
        dispatch(setPackName(searchValue))
        dispatch(setCurrentPage(1))

    }
    return (

        <div className={c.search}>
            <SuperInputText
                value={searchValue}
                onChange={(e) => setSearchValue(e.currentTarget.value)}
                type={"text"} placeholder={"input name"}
                className={c.input}/>
            <button onClick={searchHandler} className={c.button}>search</button>
        </div>
    );
};

export default Search;