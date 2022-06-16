import React, {useState} from 'react';
import c from './search.module.css'
import {useDispatch, useSelector} from "react-redux";
import {setCurrentPage, setMax, setMin, setPackName} from "../c2-cards/packs/p2-bll/packsReducer";
import {ReduxRootType} from "../../n1-main/m2-bll/store/ReduxStore";
import {Slider} from "../k2-slider/slider";


type SearchType = {
    value: number[]
    setValue: (value: number[]) => void
}

const Search = (props: SearchType) => {
    const value = useSelector<ReduxRootType, string>(state => state.packs.packName)
    const [searchValue, setSearchValue] = useState(value)
    const dispatch = useDispatch()

    const searchHandler = () => {
        dispatch(setPackName(searchValue))
        dispatch(setCurrentPage(1))
        dispatch(setMin(props.value[0]))
        dispatch(setMax(props.value[1]))

    }
    return (

        <div className={c.search}>
            Search packs
            <input
                value={searchValue}
                onChange={(e) => setSearchValue(e.currentTarget.value)}
                type={"text"} placeholder={"input name"}
                className={c.input}/>
            <Slider min={0}
                    max={150}
                    valueArray={props.value}
                    setValueArray={props.setValue}/>
            <button onClick={searchHandler} className={c.button}>search</button>
        </div>
    );
};

export default Search;