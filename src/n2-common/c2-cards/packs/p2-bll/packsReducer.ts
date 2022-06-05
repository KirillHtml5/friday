import {PacksAPI, PackType} from "../p3-dal/packsAPI";
import {AppThunk, ReduxRootType} from "../../../../n1-main/m2-bll/store/ReduxStore";
import {loadingAC} from "../../../c1-auth/loading/bll/loadingReducer";

const SET_USER_ID = "PACKS/SET_USER_ID"
const SET_PACKS = "PACKS/SET_PACKS"
const SET_ERROR = "PACKS/SET_ERROR"
const SET_PACKS_TOTAL_COUNT = "PACKS/SET_PACKS_TOTAL_COUNT"

const initialState: InitPacksStateType = {
    cardPacks: [],
    cardPacksTotalCount: 0,
    max: 103,
    min: 0,
    page: 1,
    pageCount: 10,
    packName: '',
    sortPacks: '0updated',
    user_id: null,
    error: null,
}

export const PacksReducer = (state = initialState, action: PacksActionsType): InitPacksStateType => {
    switch (action.type) {
        case SET_USER_ID:
            return {...state, user_id: action.user_id}
        case SET_PACKS:
            return {...state, cardPacks: action.cardPacks}
        case SET_ERROR:
            return {...state, error: action.error}
        case SET_PACKS_TOTAL_COUNT:
            return {...state, ...action.payload}
        default:
            return state
    }
}

//actions
export const setUserID = (user_id: string) => ({type: SET_USER_ID, user_id} as const)
export const setPacks = (cardPacks: PackType[]) => ({type: SET_PACKS, cardPacks} as const)
export const setError = (error: null | string) => ({type: SET_ERROR, error} as const)
export const setPacksTotalCount = (totalCount: number) => ({
    type: SET_PACKS_TOTAL_COUNT,
    payload: {totalCount}
} as const)

//thunks
export const getPacks = (): AppThunk => {
    return async (dispatch, getState: () => ReduxRootType) => {
        try {
            dispatch(loadingAC(true))
            const {packName, min, max, sortPacks, page, pageCount} = getState().packs
            const res = await PacksAPI.getPacks({packName, min, max, sortPacks, page, pageCount})
            dispatch(setPacks(res.cardPacks))
            dispatch(setPacksTotalCount(res.cardPacksTotalCount))
        } catch (e: any) {
            const error = e.response.data
                ? e.response.data.error
                : (e.message + ', more details in the console');
            dispatch(setError(error))
        }
        dispatch(loadingAC(false))
    }
}
export const addPack = (): AppThunk => {
    return async (dispatch) => {
        try {
            dispatch(loadingAC(true))
            await PacksAPI.addPack('React')
            dispatch(getPacks())
        } catch (e: any) {
            const error = e.response.data
                ? e.response.data.error
                : (e.message + ', more details in the console');
            dispatch(setError(error))
        }
        dispatch(loadingAC(false))
    }
}

//types
export type InitPacksStateType = {
    cardPacks: PackType[]
    cardPacksTotalCount: number
    max: number
    min: number
    page: number
    pageCount: number
    packName: string
    sortPacks: string
    user_id: string | null
    error: string | null
}
export type PacksActionsType =
    | ReturnType<typeof setUserID>
    | ReturnType<typeof setPacks>
    | ReturnType<typeof setError>
    | ReturnType<typeof setPacksTotalCount>