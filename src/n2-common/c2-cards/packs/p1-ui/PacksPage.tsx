import React, {useEffect} from 'react';
import {PacksTable} from "./packs/PacksTable";
import {useDispatch, useSelector} from "react-redux";
import {addPack, getPacks, InitPacksStateType} from "../p2-bll/packsReducer";
import {ReduxRootType} from "../../../../n1-main/m2-bll/store/ReduxStore";
import s from "../../../c1-auth/loading/loading.module.css";

export const PacksPage = () => {
    const isLoad = useSelector<ReduxRootType, boolean>(state => state.loading.isLoad)
    const error = useSelector<ReduxRootType, string | null>(state => state.packs.error)
    const {
        packName,
        min,
        max,
        sortPacks,
        page,
        pageCount,
        cardPacksTotalCount,
    } = useSelector<ReduxRootType, InitPacksStateType>(state => state.packs)

    const dispatch = useDispatch<any>()

    useEffect(() => {
        dispatch(getPacks())
    }, [packName, min, max, sortPacks, page, pageCount, cardPacksTotalCount])

    const addPackHandler = () => {
        dispatch(addPack('React'))
    }

    return (
        isLoad
            ? <div className={s.preloader}></div>
            : <div style={{margin: "0 auto"}}>
                {error && error}
                <button onClick={addPackHandler}>Add Task</button>
                <PacksTable/>
            </div>
    );
};