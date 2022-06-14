import {CardsTable} from "../x1-table/CardsTable";
import {useDispatch, useSelector} from "react-redux";
import {ReduxRootType} from "../../../../n1-main/m2-bll/store/ReduxStore";
import {
    addCard, CardsStateType, changeCardsPerPage, changeSearchAnswer, changeSearchQuestion,
    getCards,
    ThunkDispatchActionType
} from "../../../../n1-main/m2-bll/reducers/Cards-reducer";
import {ChangeEvent, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import c from '../../../c1-auth/loading/loading.module.css';
import s from './cardsPage.module.css';
import SuperSelect from "../../../../n1-main/m1-ui/common/c5-SuperSelect/SuperSelect";
import SuperInputText from "../../../../n1-main/m1-ui/common/c1-SuperInputText/SuperInputText";
import SuperButton from "../../../../n1-main/m1-ui/common/c2-SuperButton/SuperButton";


export const CardsPage = () => {
    const dispatch = useDispatch<ThunkDispatchActionType>();
    const isLoad = useSelector<ReduxRootType, boolean>(state => state.loading.isLoad)
    const isLoggedIn = useSelector<ReduxRootType, boolean>(state => state.login.isLoggedIn)
    const navigate = useNavigate()
    const userId = useSelector<ReduxRootType, string>(state => state.profile.user._id)
    const packUserId = useSelector<ReduxRootType, string>(state => state.cards.packUserId)
    const {id} = useParams()
    const page = useSelector<ReduxRootType, number>(state => state.cards.page)
    const selectRatio = [5, 10, 15]
    const pageCount = useSelector<ReduxRootType, number>(state => state.cards.pageCount)
    const [newPageCount, setNewPageCount] = useState(pageCount)
    const cardsSort = useSelector<ReduxRootType, string>(state => state.cards.sortCards)
    const {cardQuestion} = useSelector<ReduxRootType, CardsStateType>(state => state.cards)
    const {cardAnswer} = useSelector<ReduxRootType, CardsStateType>(state => state.cards)
    const [changeQuestion, setChangeQuestion] = useState<string>(cardQuestion)
    const [changeAnswer, setChangeAnswer] = useState<string>(cardAnswer)

    let packId = ''
    if (id) {
        packId = id
    }

    useEffect(() => {
        if (!isLoggedIn) {
            return navigate('/login')
        } else dispatch(getCards(packId))
    }, [isLoggedIn, navigate, dispatch, packId,page,pageCount])


    const addNewCard = () => {
        dispatch(addCard(packId))
    }

    const searchByQuestion = () => {
        dispatch(changeSearchQuestion(changeQuestion))
        dispatch(getCards(packId))
    }
    const searchByAnswer = () => {
        dispatch(changeSearchAnswer(changeAnswer))
        dispatch(getCards(packId))
    }

    const changePageSize = (e: ChangeEvent<HTMLSelectElement>) => {
        setNewPageCount(+e.currentTarget.value)
        dispatch(changeCardsPerPage(+e.currentTarget.value))
    }

    return (isLoad ?
        <div className={c.preloader}/> :
        <div>
            <SuperInputText value={changeQuestion} onChangeText={setChangeQuestion} placeholder={'question search'}/>
            <SuperButton onClick={searchByQuestion}>S Q</SuperButton>
            <SuperInputText value={changeAnswer} onChangeText={setChangeAnswer} placeholder={'answer search'}/>
            <SuperButton onClick={searchByAnswer}>S A</SuperButton>
            <CardsTable/>
            <div className={s.button}>
                {userId === packUserId ? <button onClick={addNewCard}>Add Card</button> : ""}
            </div>
            <SuperSelect value={newPageCount} options={selectRatio} onChange={changePageSize}/>

        </div>)
}

