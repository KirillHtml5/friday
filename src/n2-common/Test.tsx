import React from 'react';
import SuperInputText from "../n1-main/m1-ui/common/c1-SuperInputText/SuperInputText";
import SuperButton from "../n1-main/m1-ui/common/c2-SuperButton/SuperButton";
import SuperCheckbox from "../n1-main/m1-ui/common/c3-SuperCheckbox/SuperCheckbox";
import {Pagination} from "./k2-pagination/pagination";
import Search from "./k2-search/search";
import Sort from "./k2-sort/sort";



const Test = () => {


    return (
        <div>
            <SuperInputText/>
            <SuperButton/>
            <SuperCheckbox>text</SuperCheckbox>
            <Pagination/>
            <Search/>
            {/*<Sort/>*/}

        </div>
    );
};

export default Test;