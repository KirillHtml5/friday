import {learnAPI} from "../l3-dal/learnAPI";
import {AppThunk} from "../../../n1-main/m2-bll/store/ReduxStore";

const SET_CARDS = 'LEARN/SET_CARDS'
const SET_FETCHING_CARDS = 'LEARN/SET_FETCHING_CARDS'

export const initialLearnState = {
    cards: [] as CardType[],
    cardsTotalCount: 0,
    packUserId: '',
    isFetching: false,
}

export const LearnReducer = (state = initialLearnState, action: LearnActionsType): InitialLearnType => {
    switch (action.type) {
        case SET_CARDS:
        case SET_FETCHING_CARDS:
            return {...state, ...action.payload}
        default:
            return state
    }

}

//actions
export const setCards = (cards: CardType[], cardsTotalCount: number, packUserId: string) => ({
    type: SET_CARDS,
    payload: {cards, cardsTotalCount, packUserId}
})
export const setFetchingCards = (isFetching: boolean) => ({type: SET_FETCHING_CARDS, payload: {isFetching}})

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
export const updateGrade = (grade: number, card_id: string, packId: string): AppThunk => {
    return async (dispatch) => {
        dispatch(setFetchingCards(true))
        try {
            await learnAPI.updatedGrade(grade, card_id)
            dispatch(getCards(packId))
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