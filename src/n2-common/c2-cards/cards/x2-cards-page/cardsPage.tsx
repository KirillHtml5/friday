import {CardsTable} from "../x1-table/CardsTable";
import {useDispatch, useSelector} from "react-redux";
import {ReduxRootType} from "../../../../n1-main/m2-bll/store/ReduxStore";
import {
    addCard,
    getCards,
    ThunkDispatchActionType
} from "../../../../n1-main/m2-bll/reducers/Cards-reducer";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import c from '../../../c1-auth/loading/loading.module.css';
import s from './cardsPage.module.css'


export const CardsPage = () => {
    const dispatch = useDispatch<ThunkDispatchActionType>();
    const isLoad = useSelector<ReduxRootType, boolean>(state => state.loading.isLoad)
    const isLoggedIn = useSelector<ReduxRootType, boolean>(state => state.login.isLoggedIn)
    const navigate = useNavigate()
    const userPack_Id = useSelector<ReduxRootType,string>(state => state.cards.cards[0].cardsPack_id)


    useEffect(() => {
        if (!isLoggedIn) {
            return navigate('/login')
        }
        else dispatch(getCards(userPack_Id))
    }, [isLoggedIn, navigate,dispatch,userPack_Id])


    const addNewCard = () => {
        dispatch(addCard(userPack_Id))
    }

    return (isLoad ?
            <div className={c.preloader}/> :
            <div>
                <CardsTable/>
                <div className={s.button}><button onClick={addNewCard}>Add Card</button></div>
            </div>)
}

