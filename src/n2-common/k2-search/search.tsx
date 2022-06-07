import React, {useState} from 'react';
import c from './search.module.css'


const Search = () => {

    const [searchValue, setSearchValue] = useState('')

    const searchHandler = () => {
        alert(searchValue)
        setSearchValue('')
//    dispatch с запросом за карточками (searchValue)
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