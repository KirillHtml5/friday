import {learnAPI} from "../l3-dal/learnAPI";
import {AppThunk} from "../../../n1-main/m2-bll/store/ReduxStore";

const SET_CARDS = 'LEARN/SET_CARDS'

export const initialLearnState = {
    cards: [] as CardType[],
    cardsTotalCount: 0,
    packUserId: '',
    packName: '',
}

export const LearnReducer = (state = initialLearnState, action: LearnActionsType): InitialLearnType => {
    switch (action.type) {
        case SET_CARDS:
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

//thunks
export const getCards = (id: string): AppThunk => {
    return async (dispatch) => {
        try {
            const {cards, cardsTotalCount, packUserId} = await learnAPI.getCards(id)
            dispatch(setCards(cards, cardsTotalCount, packUserId))
        } catch (e: any) {
            const error = e.response.data
                ? e.response.data.error
                : (e.message + ', more details in the console');
            console.log(error)
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