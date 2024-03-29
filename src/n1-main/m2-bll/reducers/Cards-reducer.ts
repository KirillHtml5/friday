import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {ReduxRootType} from "../store/ReduxStore";
import {CardsApi, CardsParamsType} from "../../../n2-common/c2-cards/cards/CardsApi";
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
    packUserId: string,
    cardsPack_id: string,
    cardsTotalCount: number,
    cardAnswer: string,
    cardQuestion: string,
    min: number,
    max: number,
    sortCards: string,
    page: number,
    pageCount: number,
}

const initState: CardsStateType = {
    cards: [],
    packUserId: '',
    cardsPack_id: '',
    cardAnswer: '',
    cardQuestion: '',
    min: 0,
    max: 6,
    cardsTotalCount: 0,
    sortCards: '',
    page: 1,
    pageCount: 5
}

export const CardsReducer = (state = initState, action: ActionCards): CardsStateType => {
    switch (action.type) {
        case 'SET-CARDS': {
            return {
                ...state,...action.payload
            }
        }
        case "SET_CURRENT_CARDS_PER_PAGE": {
            return {...state, pageCount: action.pageCount}
        }
        case "SET_CURRENT_CARDS_PAGE": {
            return {...state, page: action.page}
        }
        case "CHANGE-SORT-TYPE": {
            return {...state, sortCards: action.sortCards}
        }
        case "SEARCH-CARD-BY": {
            return {...state, cardQuestion: action.question, cardAnswer: action.answer}
        }
        default: {
            return state
        }
    }
}

////actions
export type ActionCards =
    ReturnType<typeof setCards>
    | setErrorACType
    | loadingACType
    | ReturnType<typeof setCurrentCardPage>
    | ReturnType<typeof changeCardsPerPage>
    | ReturnType<typeof changeSort>
    | ReturnType<typeof changeSearchBy>


export const setCards = (payload: CardsParamsType) => ({
    type: 'SET-CARDS', payload
} as const)
export const setCurrentCardPage = (page: number) => ({type: "SET_CURRENT_CARDS_PAGE", page} as const)
export const changeCardsPerPage = (pageCount: number) => ({type: "SET_CURRENT_CARDS_PER_PAGE", pageCount} as const)
export const changeSort = (sortCards: string) => ({type: "CHANGE-SORT-TYPE", sortCards} as const)
export const changeSearchBy = (question: string, answer: string) => ({
    type: "SEARCH-CARD-BY",
    question,
    answer
} as const)


////thunks
export type ThunkType = ThunkAction<void, ReduxRootType, unknown, ActionCards>
export type ThunkDispatchActionType = ThunkDispatch<ReduxRootType, unknown, ActionCards>


export const getCards = (cardsPack_id: string) => (dispatch: ThunkDispatchActionType, getState: () => ReduxRootType) => {
    dispatch(loadingAC(true))
    const {sortCards, pageCount, cardQuestion, page, cardAnswer, min, max} = getState().cards
    CardsApi.getCards({cardsPack_id, cardAnswer, cardQuestion, sortCards, page, pageCount, min, max})
        .then(res => {
            dispatch(setCards(res))
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

export const addCard = (id: string, question: string, answer: string): ThunkType => (dispatch: ThunkDispatchActionType) => {
    dispatch(loadingAC(true))
    CardsApi.addCard(id, question, answer)
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

export const updateCard = (id: string, cardId: string, question: string, answer: string) => (dispatch: ThunkDispatchActionType) => {
    dispatch(loadingAC(true))
    CardsApi.updateCard(cardId, question, answer)
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