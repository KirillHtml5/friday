import {CardsTable} from "../x1-table/CardsTable";
import {useDispatch, useSelector} from "react-redux";
import {ReduxRootType} from "../../../../n1-main/m2-bll/store/ReduxStore";
import {
    addCard,
    getCards,
    setCurrentPageCards,
    ThunkDispatchActionType
} from "../../../../n1-main/m2-bll/reducers/Cards-reducer";
import {useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import c from '../../../c1-auth/loading/loading.module.css';
import s from './cardsPage.module.css';
import {Pagination} from "../../../k2-pagination/pagination";


export const CardsPage = () => {
    const dispatch = useDispatch<ThunkDispatchActionType>();
    const isLoad = useSelector<ReduxRootType, boolean>(state => state.loading.isLoad)
    const isLoggedIn = useSelector<ReduxRootType, boolean>(state => state.login.isLoggedIn)
    const navigate = useNavigate()
    const userId = useSelector<ReduxRootType, string>(state => state.profile.user._id)
    const packUserId = useSelector<ReduxRootType, string>(state => state.cards.packUserId)
    const pageCount = useSelector<ReduxRootType, number>(state => state.cards.pageCount)
    const totalCount = useSelector<ReduxRootType, number>(state => state.cards.cardsTotalCount)
    const currentPage = useSelector<ReduxRootType, number>(state => state.cards.page)
    console.log('totalCount', totalCount)
    console.log('pageCount', pageCount)
    console.log('currentPage', currentPage)

    const {id} = useParams()

    let packId = ''
    if (id) {
        packId = id
    }

    // useEffect(() => {
    //     if (!isLoggedIn) {
    //         return navigate('/login')
    //     } else dispatch(getCards(packId))
    // }, [isLoggedIn, navigate, dispatch, packId, currentPage])
    useEffect(() => {
        if (!isLoggedIn) {
            return navigate('/login')
        }
    }, [isLoggedIn, navigate])
    useEffect(() => {
        dispatch(getCards(packId))
    }, [currentPage, packId, dispatch])


    const addNewCard = () => {
        dispatch(addCard(packId))
    }

    return (isLoad ?
        <div className={c.preloader}/> :
        <div>
            <CardsTable/>
            <div className={s.button}>

                {userId === packUserId ? <button onClick={addNewCard}>Add Card</button> : ""}

            </div>
            <Pagination pageCount={pageCount} totalCount={totalCount} currentPage={currentPage}
                        setCurrentPage={setCurrentPageCards}/>
        </div>)
}

