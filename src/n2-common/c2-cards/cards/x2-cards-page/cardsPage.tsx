import {CardsTable} from "../x1-table/CardsTable";
import {useDispatch, useSelector} from "react-redux";
import {ReduxRootType} from "../../../../n1-main/m2-bll/store/ReduxStore";
import {
    CardsStateType, changeCardsPerPage,
    getCards,
    ThunkDispatchActionType, changeSearchBy
} from "../../../../n1-main/m2-bll/reducers/Cards-reducer";
import React, {ChangeEvent, useEffect, useState} from "react";
import {NavLink, useNavigate, useParams} from "react-router-dom";
import c from '../../../c1-auth/loading/loading.module.css';
import s from './cardsPage.module.css';
import SuperInputText from "../../../../n1-main/m1-ui/common/c1-SuperInputText/SuperInputText";
import SuperButton from "../../../../n1-main/m1-ui/common/c2-SuperButton/SuperButton";
import {CardsPagination} from "../x1-table/cardsItems/cardsPagination";
import SuperSelect from "../../../../n1-main/m1-ui/common/c5-SuperSelect/SuperSelect";
import useDebounce from "../../../../n3-utils/useDebounce";
import {AddCardModal} from "../x3-cardsModal/c1-addCardModal/AddCardModal";
import {PackType} from "../../packs/p3-dal/packsAPI";


export const CardsPage = () => {
    const dispatch = useDispatch<ThunkDispatchActionType>();
    const isLoad = useSelector<ReduxRootType, boolean>(state => state.loading.isLoad)
    const isLoggedIn = useSelector<ReduxRootType, boolean>(state => state.login.isLoggedIn)
    const navigate = useNavigate()
    const userId = useSelector<ReduxRootType, string>(state => state.profile.user._id)
    const {
        packUserId,
        page,
        pageCount,
        sortCards,
        cardAnswer,
        cardQuestion,
    } = useSelector<ReduxRootType, CardsStateType>(state => state.cards)
    const {id} = useParams()
    const selectRatio = [5, 10, 15]
    const [newPageCount, setNewPageCount] = useState(pageCount)
    const [changeQuestion, setChangeQuestion] = useState<string>(cardQuestion)
    const [changeAnswer, setChangeAnswer] = useState<string>(cardAnswer)
    const debounceQuestion = useDebounce(changeQuestion, 1500)
    const debounceAnswer = useDebounce(changeAnswer, 1500)
    const [showAddCardModal, setShowAddCardModal] = useState<boolean>(false)
    const packs = useSelector<ReduxRootType, PackType[]>(state => state.packs.cardPacks)
    const namePack = packs.find(p => p._id === id)?.name

    let packId = ''

    if (id) {
        packId = id
    }

    useEffect(() => {
        if (!isLoggedIn) {
            return navigate('/login')
        } else
            id && dispatch(getCards(id))
    }, [isLoggedIn, navigate, dispatch, id, sortCards,
        cardAnswer, pageCount, page, cardQuestion])

    useEffect(() => {
        dispatch(changeSearchBy(debounceQuestion, debounceAnswer))
    }, [debounceQuestion, debounceAnswer])

    const changePageSize = (e: ChangeEvent<HTMLSelectElement>) => {
        setNewPageCount(+e.currentTarget.value)
        dispatch(changeCardsPerPage(+e.currentTarget.value))
    }

    const openAddCardModal = () => {
        setShowAddCardModal(true)
    }

    return (isLoad ?
            <div className={c.preloader}/> :
            <div>
                <NavLink to={'/packs'}>
                    <span className={s.return}>Packs</span>
                </NavLink>
                <h2>{namePack}</h2>
                <div className={s.searchBlock}>
                    <SuperInputText value={changeQuestion} onChangeText={setChangeQuestion}
                                    placeholder={'question search'} className={s.input}/>
                    <SuperInputText value={changeAnswer} onChangeText={setChangeAnswer}
                                    placeholder={'answer search'} className={s.input}/>
                </div>
                <CardsTable/>
                {userId === packUserId &&
                    <div className={s.addBlock}>
                        <SuperButton onClick={openAddCardModal}>Add New Card</SuperButton>
                    </div>
                }
                <CardsPagination/>
                <SuperSelect value={newPageCount} options={selectRatio} onChange={changePageSize}/>
                {showAddCardModal && <AddCardModal setShowModal={setShowAddCardModal} packId={packId}/>}

            </div>
    )
}

