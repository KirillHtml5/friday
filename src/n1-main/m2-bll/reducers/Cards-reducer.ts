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
    cardsPack_id: string
    cardAnswer?: string,
    cardQuestion?: string,
    min?: number,
    max?: number,
    sortCards?: string,
    page?: number,
    pageCount?: number
}

const initState: CardsStateType = {
    cards: [],
    cardsPack_id: '',
    cardAnswer: '',
    cardQuestion: '',
    min: 1,
    max: 10,
    sortCards: '0grade',
    page: 1,
    pageCount: 3
}

export const CardsReducer = (state = initState, action: ActionCards): CardsStateType => {
    switch (action.type) {
        case 'SET-CARDS': {
            return {
                ...state, cards: action.cards
            }
        }
        default: {
            return state
        }
    }
}

////actions
export type ActionCards = ReturnType<typeof setCards> | setErrorACType | loadingACType

export const setCards = (cards: CardsType[]) => ({
    type: 'SET-CARDS', cards
} as const)


////thunks
export type ThunkType = ThunkAction<void, ReduxRootType, unknown, ActionCards>
export type ThunkDispatchActionType = ThunkDispatch<ReduxRootType, unknown, ActionCards>


export const getCards = (cardsPack_id: string): ThunkType => (dispatch: ThunkDispatchActionType) => {
    dispatch(loadingAC(true))
    CardsApi.getCards(cardsPack_id)
        .then(res => {
            dispatch(setCards(res.cards))
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