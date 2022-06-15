import React, {useEffect, useState} from 'react';
import {PacksTable} from "./packs/PacksTable";
import {useDispatch, useSelector} from "react-redux";
import {
    getPacks,
    InitPacksStateType,
    setBelonging,
    setCurrentPage,
    setError,
    setMax,
    setMin,
    setPackName
} from "../p2-bll/packsReducer";
import {ReduxRootType} from "../../../../n1-main/m2-bll/store/ReduxStore";
import s from "../../../c1-auth/loading/loading.module.css";
import {useNavigate} from "react-router-dom";
import {Pagination} from "../../../k2-pagination/pagination";
import Search from "../../../k2-search/search";
import {Slider} from "../../../k2-slider/slider";
import Sort from "../../../k2-sort/sort";
import {AddPackModal} from "./modalPacks/m1-addPackModal/AddPackModal";

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
        isMyPacks,
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
    }, [packName, min, max, sortPacks, page, pageCount, cardPacksTotalCount, isMyPacks, dispatch])

    const sliderChange = ({min, max}: { min: number; max: number }) => {
        dispatch(setMin(min))
        dispatch(setMax(max))
        console.log(min)
        console.log(max)
    }
    const [showAddModal, setShowAddModal] = useState<boolean>(false)
    const showAddModalHandler = () => setShowAddModal(true)

    return (
        isLoad
            ? <div className={s.preloader}/>
            : <div style={{margin: "0 auto"}}>
                <Search/>
                {error && error}
                <Slider min={min}
                        max={max}
                        onChange={sliderChange}/>
                <button onClick={showAddModalHandler}>Add Task</button>
                <PacksTable/>
                <Sort/>
                <button onClick={() => dispatch(setMax(12))}>MAX</button>
                <button onClick={() => dispatch(setMin(5))}>MIN</button>
                <button onClick={() => dispatch(setCurrentPage(2))}>PAGE</button>
                <button onClick={() => dispatch(setPackName('at'))}>NAME</button>
                <button onClick={() => dispatch(setBelonging(true))}>My Packs</button>
                <button onClick={() => dispatch(setBelonging(false))}>All packs</button>
                <Pagination currentPage={page}
                            pageCount={pageCount}
                            totalCount={cardPacksTotalCount}
                            setCurrentPage={setCurrentPage}/>
                {showAddModal && <AddPackModal setShowModal={setShowAddModal}/>}
            </div>
    );
};