import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {ReduxRootType} from "../store/ReduxStore";
import {CardsApi} from "../../../n2-common/c2-cards/cards/CardsApi";
import {setErrorAC, setErrorACType} from "./Error-reducer";
import {loadingAC, loadingACType} from "../../../n2-common/c1-auth/loading/bll/loadingReducer";


export type CardsType = {
    answer: string
    answerImg: string
    answerVideo: string
    cardsPack_id: string
    comments: string
    created: string
    grade: number
    more_id: string
    question: string
    questionImg: string
    questionVideo: string
    rating: number
    shots: number
    type: string
    updated: string
    user_id: string
    __v: number
    _id: string
}

export type CardsStateType = {
    cards: Array<CardsType>,
    packUserId: string
    cardsPack_id: string
    cardAnswer?: string,
    cardQuestion?: string,
    min?: number,
    max?: number,
    sortCards?: string,
    page: number,
    pageCount: number,
    cardsTotalCount: number
}

const initState: CardsStateType = {
    cards: [],
    packUserId: '',
    cardsPack_id: '',
    cardAnswer: '',
    cardQuestion: '',
    min: 1,
    max: 10,
    sortCards: '0grade',
    page: 1,
    pageCount: 10,
    cardsTotalCount: 0
}

export const CardsReducer = (state = initState, action: ActionCards): CardsStateType => {
    switch (action.type) {
        case 'SET-CARDS': {
            return {
                ...state, cards: action.cards, packUserId: action.packUserId
            }
        }
        case "SET_CURRENT_PAGE_CARDS":
        case "SET_CARDS_TOTAL_COUNT": {
            return {...state, ...action.payload}
        }
        default: {
            return state
        }
    }
}

////actions
export type ActionCards =
    ReturnType<typeof setCards>
    | ReturnType<typeof setCurrentPageCards>
    | ReturnType<typeof setCardsTotalCount>
    | setErrorACType
    | loadingACType

export const setCards = (cards: CardsType[], packUserId: string) => ({
    type: 'SET-CARDS', cards, packUserId
} as const)
export const setCurrentPageCards = (page: number) => ({type: 'SET_CURRENT_PAGE_CARDS', payload: {page}} as const)
export const setCardsTotalCount = (cardsTotalCount: number) => ({
    type: 'SET_CARDS_TOTAL_COUNT',
    payload: {cardsTotalCount}
} as const)


////thunks
export type ThunkType = ThunkAction<void, ReduxRootType, unknown, ActionCards>
export type ThunkDispatchActionType = ThunkDispatch<ReduxRootType, unknown, ActionCards>


export const getCards = (cardsPack_id: string): ThunkType => (dispatch: ThunkDispatchActionType, getState: () => ReduxRootType) => {
    dispatch(loadingAC(true))
    const {min, max, page, pageCount} = getState().cards
    CardsApi.getCards({cardsPack_id, page, pageCount})
        .then(res => {
            dispatch(setCards(res.cards, res.packUserId))
            dispatch(setCardsTotalCount(res.cardsTotalCount))
            console.log('cards', res.cards)
        })
        .catch((e) => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console')
            dispatch(setErrorAC(error))
        })
        .finally(() => dispatch(loadingAC(false)))
}

export const addCard = (id: string): ThunkType => (dispatch: ThunkDispatchActionType) => {
    dispatch(loadingAC(true))
    CardsApi.addCard(id)
        .then(res => {
            dispatch(getCards(id))
            console.log('add', res)
        })
        .catch((e) => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console')
            dispatch(setErrorAC(error))
        })
        .finally(() => dispatch(loadingAC(false)))
}

export const updateCard = (id: string, cardId: string) => (dispatch: ThunkDispatchActionType) => {
    dispatch(loadingAC(true))
    CardsApi.updateCard(cardId)
        .then(res => {
            dispatch(getCards(id))
            console.log('update', res)
        })
        .catch((e) => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console')
            dispatch(setErrorAC(error))
        })
        .finally(() => dispatch(loadingAC(false)))
}

export const deleteCard = (id: string, cardId: string) => (dispatch: ThunkDispatchActionType) => {
    dispatch(loadingAC(true))
    CardsApi.deleteCard(cardId)
        .then(res => {
            dispatch(getCards(id))
            console.log('delete', res)
        })
        .catch((e) => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console')
            dispatch(setErrorAC(error))
        })
        .finally(() => dispatch(loadingAC(false)))
}



