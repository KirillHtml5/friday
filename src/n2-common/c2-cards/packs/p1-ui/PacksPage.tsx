import React, {useEffect, useState} from 'react';
import {PacksTable} from "./packs/PacksTable";
import {useDispatch, useSelector} from "react-redux";
import {
    getPacks,
    InitPacksStateType,
    setBelonging,
    setCurrentPage,
    setError,
} from "../p2-bll/packsReducer";
import {ReduxRootType} from "../../../../n1-main/m2-bll/store/ReduxStore";
import s from "../../../c1-auth/loading/loading.module.css";
import {useNavigate} from "react-router-dom";
import {Pagination} from "../../../k2-pagination/pagination";
import Search from "../../../k2-search/search";
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

    const [value, setValue] = useState([min, max]);

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

    const [showAddModal, setShowAddModal] = useState<boolean>(false)
    const showAddModalHandler = () => setShowAddModal(true)

    return (
        isLoad
            ? <div className={s.preloader}></div>
            : <div style={{margin: "25px"}}>
                <Search value={value} setValue={setValue}/>
                {error && error}
                <div style={{position: "absolute", right:125, top:105}}>
                    <button onClick={() => dispatch(setBelonging(true))}>My Packs</button>
                    <button onClick={() => dispatch(setBelonging(false))}>All packs</button>
                </div>
                <div style={{position: "absolute", right:25, top:105}}>
                    <button onClick={{showAddModalHandler}}>Add Task</button>
                </div>

                <PacksTable/>

                <Pagination currentPage={page}
                            pageCount={pageCount}
                            totalCount={cardPacksTotalCount}
                            setCurrentPage={setCurrentPage}/>
                {showAddModal && <AddPackModal setShowModal={setShowAddModal}/>}
            </div>
    );
};