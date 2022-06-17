import React, {ChangeEvent, useEffect, useState} from 'react';
import {PacksTable} from "./packs/PacksTable";
import {useDispatch, useSelector} from "react-redux";
import {
    getMinMaxValues,
    getPackName, getPacksByPage,
    getPacksTC,
    setBelonging,
    setCurrentPage,
    setError, setPageCount,
} from "../p2-bll/packsReducer";
import {ReduxRootType} from "../../../../n1-main/m2-bll/store/ReduxStore";
import s from "../../../c1-auth/loading/loading.module.css";
import {useNavigate} from "react-router-dom";
import {Pagination} from "../../../k2-pagination/pagination";
import Search from "../../../k2-search/search";
import {AddPackModal} from "./modalPacks/m1-addPackModal/AddPackModal";
import {GetPacksParamsType} from "../p3-dal/packsAPI";
import SuperSelect from "../../../../n1-main/m1-ui/common/c5-SuperSelect/SuperSelect";

enum PACKS_TYPES {
    ALL = 'All',
    MY = 'MY'
}

export const PacksPage = () => {
    const isLoad = useSelector<ReduxRootType, boolean>(state => state.loading.isLoad)
    const error = useSelector<ReduxRootType, string | null>(state => state.packs.error)
    const isLoggedIn = useSelector<ReduxRootType, boolean>(state => state.login.isLoggedIn)
    const params = useSelector<ReduxRootType, GetPacksParamsType>(state => state.packs.params)
    const userId = useSelector<ReduxRootType, string>(state => state.profile.user._id);
    const cardPacksTotalCount = useSelector<ReduxRootType, number>(state => state.packs.cardPacksTotalCount)


    const dispatch = useDispatch<any>()
    const navigate = useNavigate()

    const [belongingPacks , setBelongingPacks] = useState<PACKS_TYPES>(PACKS_TYPES.ALL)
    const onChangeSelectHandler = (value: PACKS_TYPES) => {
        setBelongingPacks(value);
        if (PACKS_TYPES.ALL) {
            dispatch(setBelonging(''));
        } else {
            dispatch(setBelonging(userId));
        }
        dispatch(getMinMaxValues(0, 0))
        dispatch(getPackName(''))
    }
    const onChangePage = (pageNumber: number) => {
        dispatch(getPacksByPage(pageNumber))
    }
    const onChangePageSize = (pageCount: number) => {
        dispatch(setPageCount(pageCount));
    }

    // const [value, setValue] = useState([min, max]);

    useEffect(() => {
        if (params.user_id) {
            setBelongingPacks(PACKS_TYPES.MY)
        } else {
            setBelongingPacks(PACKS_TYPES.ALL)
        }
        return () => {
            dispatch(getPackName(''))
        }
    }, []);

    useEffect(() => {
        if (!isLoggedIn) {
            return navigate('/login')
        }
        return () => {
            dispatch(setError(''))
        }
    }, [isLoggedIn, navigate, dispatch])

    useEffect(() => {
        dispatch(getPacksTC())
    }, [params, dispatch])

    const [showAddModal, setShowAddModal] = useState<boolean>(false)
    const showAddModalHandler = () => setShowAddModal(true)

    return (
        isLoad
            ? <div className={s.preloader}/>
            : <div style={{margin: "25px"}}>
                <Search value={value} setValue={setValue}/>
                {error && error}
                <div style={{position: "absolute", right:125, top:105}}>
                    <SuperSelect
                        name={'radio'}
                        options={[PACKS_TYPES.ALL, PACKS_TYPES.MY]}
                        value={belongingPacks}
                        onChangeOption={onChangeSelectHandler}
                    />
                </div>
                <div style={{position: "absolute", right:25, top:105}}>
                    <button onClick={showAddModalHandler}>Add Task</button>
                </div>

                {/*<PacksTable/>*/}

                <Pagination currentPage={params.page}
                            pageCount={params.pageCount}
                            totalCount={cardPacksTotalCount}
                            setCurrentPage={setCurrentPage}/>
                {showAddModal && <AddPackModal setShowModal={setShowAddModal}/>}
            </div>
    );
};