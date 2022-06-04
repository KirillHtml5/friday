import {PackType} from "../p3-dal/packsAPI";

const SET_USER_ID = "PACKS/SET_USER_ID"
const SET_PACKS = "PACKS/SET_PACKS"

const initialState: InitPacksStateType = {
    cardPacks: [],
    cardPacksTotalCount: 0,
    maxCardsCount: 103,
    minCardsCount: 0,
    page: 1,
    pageCount: 10,
    user_id: null
}

export const PacksReducer = (state = initialState, action: PacksActionsType): InitPacksStateType => {
    switch (action.type) {
        case SET_USER_ID:
            return {...state, user_id: action.user_id}
        case SET_PACKS:
            return {...state, cardPacks: action.cardPacks}
        default:
            return state
    }
}

//actions
export const setUserID = (user_id: string) => ({type: SET_USER_ID, user_id} as const)
export const setPacks = (cardPacks: PackType[]) => ({type: SET_PACKS, cardPacks} as const)

//types
export type InitPacksStateType = {
    cardPacks: PackType[]
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
    user_id: string | null
}
export type PacksActionsType =
    | ReturnType<typeof setUserID>
    | ReturnType<typeof setPacks>