import {learnAPI} from "../l3-dal/learnAPI";
import {AppThunk} from "../../../n1-main/m2-bll/store/ReduxStore";

const SET_CARDS = 'LEARN/SET_CARDS'

export const initialLearnState = {
    cards: [] as Cards[],
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
export const setCards = (cards: Cards[], cardsTotalCount: number, packUserId: string) => ({
    type: SET_CARDS,
    payload: {cards, cardsTotalCount, packUserId}
})

//thunks
export const getCards = (id: string): AppThunk => {
    return async (dispatch) => {
        const {cards, cardsTotalCount, packUserId} = await learnAPI.getCards(id)
        dispatch(setCards(cards, cardsTotalCount, packUserId))
        console.log(cards, cardsTotalCount, packUserId)
    }
}


//types
type InitialLearnType = typeof initialLearnState
type Cards = {
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
export type LearnActionsType = ReturnType<typeof setCards>