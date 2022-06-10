import {Table} from "../x1-table/table";
import {useDispatch, useSelector} from "react-redux";
import {ReduxRootType} from "../../../n1-main/m2-bll/store/ReduxStore";
import {
    addCard,
    CardsStateType, deleteCard,
    getCards,
    ThunkDispatchActionType, updateCard
} from "../../../n1-main/m2-bll/reducers/Cards-reducer";
import {useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import SuperButton from "../../../n1-main/m1-ui/common/c2-SuperButton/SuperButton";
import c from '../../c1-auth/loading/loading.module.css'
import {setErrorAC} from "../../../n1-main/m2-bll/reducers/Error-reducer";


export const CardsPage = () => {
    const {cards} = useSelector<ReduxRootType, CardsStateType>(state => state.cards)
    const dispatch = useDispatch<ThunkDispatchActionType>();
    const isLoad = useSelector<ReduxRootType, boolean>(state => state.loading.isLoad)
    const isLoggedIn = useSelector<ReduxRootType, boolean>(state => state.login.isLoggedIn)
    const navigate = useNavigate()
    let {id} = useParams();
    let packId = '';
    if (id) {
        packId = id;
    }
    useEffect(() => {
        if (!isLoggedIn) {
            return navigate('/login')
        }
        return () => {
            dispatch(setErrorAC(''))
        }
    }, [isLoggedIn, navigate, dispatch])

    useEffect(() => {
        dispatch(getCards(packId))
    }, [dispatch, packId])

    const addNewCard = (packId: string) => {
        dispatch(addCard(packId))
    }

    const deleteSelectedCard = (packId: string, cardId: string) => {
        dispatch(deleteCard(packId, cardId))
    }

    const updateSelectedCard = (packId: string, cardId: string) => {
        dispatch(updateCard(packId, cardId))
    }

    let MapCards = cards.map(f => (
        <div key={f._id}>
            <span> {f.question} - </span>
            <span>{f.answer} - </span>
            <span>{f.updated} - </span>
            <span>{f.grade} - </span>
            <span>
                <button onClick={() => deleteSelectedCard(packId, f._id)}>Delete</button>,
                <button onClick={() => updateSelectedCard(packId, f._id)}>Edit</button>
            </span>
        </div>))

    return (isLoad ?
        <div className={c.preloader}/> :
        <div>
            <div><SuperButton onClick={() => addNewCard(packId)}>+</SuperButton></div>
            <Table/>
            {MapCards}
        </div>)
}

