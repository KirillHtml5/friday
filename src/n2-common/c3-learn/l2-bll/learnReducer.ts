import {learnAPI} from "../l3-dal/learnAPI";
import {AppThunk} from "../../../n1-main/m2-bll/store/ReduxStore";

const SET_CARDS = 'LEARN/SET_CARDS'
const SET_CURRENT_CARD = 'LEARN/SET_CURRENT_CARD'
const SET_FETCHING_CARDS = 'LEARN/SET_FETCHING_CARDS'
const SET_NEW_GRADE = 'LEARN/SET_NEW_GRADE'

export const initialLearnState = {
    cards: [] as CardType[],
    cardsTotalCount: 0,
    packUserId: '',
    isFetching: false,
    currentCard: {} as CardType,
}

export const LearnReducer = (state = initialLearnState, action: LearnActionsType): InitialLearnType => {
    switch (action.type) {
        case SET_CARDS:
        case SET_FETCHING_CARDS:
        case SET_CURRENT_CARD:
            return {...state, ...action.payload}
        case SET_NEW_GRADE:
            return {
                ...state,
                cards: state.cards.map(c => {
                    return c._id === action.payload.cardId ?
                        {...c, grade: action.payload.newGrade} : c
                })
            }
        default:
            return state
    }
}

//actions
export const setCards = (cards: CardType[], cardsTotalCount: number, packUserId: string) => ({
    type: SET_CARDS,
    payload: {cards, cardsTotalCount, packUserId}
} as const)
export const setCurrentCard = (card: CardType) => ({type: SET_CURRENT_CARD, payload: {currentCard: card}} as const)
export const setFetchingCards = (isFetching: boolean) => ({type: SET_FETCHING_CARDS, payload: {isFetching}} as const)
export const setNewGrade = (newGrade: number, cardId: string) => {
    return {
        type: SET_NEW_GRADE,
        payload: {newGrade, cardId}
    } as const
};

//thunks
export const getCards = (id: string): AppThunk => {
    return async (dispatch) => {
        dispatch(setFetchingCards(true))
        try {
            const {cards, cardsTotalCount, packUserId} = await learnAPI.getCards(id)
            dispatch(setCards(cards, cardsTotalCount, packUserId))
        } catch (e: any) {
            const error = e.response.data
                ? e.response.data.error
                : (e.message + ', more details in the console');
            console.log(error)
        } finally {
            dispatch(setFetchingCards(false))
        }
    }
}
export const updateGrade = (grade: number, card_id: string): AppThunk => {
    return async (dispatch) => {
        dispatch(setFetchingCards(true))
        try {
            const res = await learnAPI.updatedGrade(grade, card_id)
            dispatch(setNewGrade(res.grade, card_id))
        } catch (e: any) {
            const error = e.response.data
                ? e.response.data.error
                : (e.message + ', more details in the console');
            console.log(error)
        } finally {
            dispatch(setFetchingCards(false))
        }
    }
}

//types
type InitialLearnType = typeof initialLearnState
type CardType = {
    answer: string,
    question: string,
    cardsPack_id: string,
    grade: number
    shots: number
    user_id: string,
    created: string,
    updated: string,
    _id: string,
}
export type LearnActionsType =
    | ReturnType<typeof setCards>
    | ReturnType<typeof setFetchingCards>
    | ReturnType<typeof setCurrentCard>
    | ReturnType<typeof setNewGrade>