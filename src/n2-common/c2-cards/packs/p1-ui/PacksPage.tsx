import React, {useEffect} from 'react';
import {PacksTable} from "./packs/PacksTable";
import {useDispatch, useSelector} from "react-redux";
import {
    addPack,
    getPacks,
    InitPacksStateType,
    setCurrentPage,
    setError,
    setMax,
    setMin,
    setPackName
} from "../p2-bll/packsReducer";
import {ReduxRootType} from "../../../../n1-main/m2-bll/store/ReduxStore";
import s from "../../../c1-auth/loading/loading.module.css";
import {useNavigate} from "react-router-dom";

export const PacksPage = () => {
    const isLoad = useSelector<ReduxRootType, boolean>(state => state.loading.isLoad)
    const error = useSelector<ReduxRootType, string | null>(state => state.packs.error)
    const isLoggedIn = useSelector<ReduxRootType, boolean>(state => state.login.isLoggedIn)
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
    const navigate = useNavigate()

    useEffect(() => {
        if (!isLoggedIn) {
            return navigate('/login')
        }
        return () => {
            dispatch(setError(null))
        }
    }, [isLoggedIn, navigate, dispatch])

    useEffect(() => {
        dispatch(getPacks())
    }, [packName, min, max, sortPacks, page, pageCount, cardPacksTotalCount, dispatch])

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
            <button onClick={() => dispatch(setMax(12))}>MAX</button>
            <button onClick={() => dispatch(setMin(5))}>MIN</button>
            <button onClick={() => dispatch(setCurrentPage(2))}>PAGE</button>
            <button onClick={() => dispatch(setPackName('at'))}>NAME</button>
            </div>
    );
};