import {CreatePackParamsType, EditPackParamsType, GetPacksParamsType, PacksAPI, PackType} from "../p3-dal/packsAPI";
import {AppThunk, ReduxRootType} from "../../../../n1-main/m2-bll/store/ReduxStore";
import {loadingAC} from "../../../c1-auth/loading/bll/loadingReducer";

const GET_PACKS = "PACKS/GET_PACKS"
const SET_ERROR = "PACKS/SET_ERROR"
const SET_CARD_PACKS_TOTAL_COUNT = "PACKS/SET_CARD_PACKS_TOTAL_COUNT"
const SET_MAX = "PACKS/SET_MAX"
const SET_MIN = "PACKS/SET_MIN"
const SET_CURRENT_PAGE = 'PACKS/SET_CURRENT_PAGE'
const GET_PACK_NAME = 'PACKS/GET_PACK_NAME'
const GET_SORT_PACKS = 'PACKS/GET_SORT_PACKS'
const SET_BELONGING = 'PACKS/SET_BELONGING'
const SET_DOUBLE_RANGE = 'PACKS/SET_DOUBLE_RANGE_VALUES'
const GET_MIN_MAX_VALUES = 'PACKS/GET_MIN_MAX_VALUES'
const SET_PAGE_COUNT = 'PACKS/SET_PAGE_COUNT'

export enum PACKS_ACTIONS_TYPE {
    GET_PACKS = 'GET_PACKS',
    GET_SEARCHING_PACKS = 'GET_SEARCHING_PACKS',
    SET_DOUBLE_RANGE_VALUES = 'SET_DOUBLE_RANGE_VALUES',
    GET_MIN_MAX_CARDS = 'GET_MIN_CARDS',
    SORT_PACKS = 'SORT_PACKS',
    ALL_MY_PACKS = 'ALL_MY_PACKS',
    SET_CARD_PACKS_TOTAL_COUNT = 'SET_CARD_PACKS_TOTAL_COUNT',
    SET_PAGE = 'SET_PAGE',
    SET_PAGE_COUNT = 'SET_PAGE_SIZE',
}

const initialState = {
    cardPacks: [] as PackType[],
    cardPacksTotalCount: 0,
    maxCardsCount: 150,
    minCardsCount: 0,
    error: '',
    params: {
        packName: '',
        min: 0,
        max: 0,
        sortPacks: '',
        page: 1,
        pageCount: 10,
        user_id: '',
    } as GetPacksParamsType
}

export const PacksReducer = (state = initialState, action: PacksActionsType): InitPacksStateType => {
    switch (action.type) {
        case GET_PACKS:
            return {...state, cardPacks: action.cardPacks}
        case SET_ERROR:
            return {...state, error: action.error}
        case GET_PACK_NAME:
            return {...state, params: {...state.params, packName: action.packName}}
        case SET_DOUBLE_RANGE:
            return {...state, minCardsCount: action.min, maxCardsCount: action.max}
        case GET_MIN_MAX_VALUES:
            return {...state, params: {...state.params, min: action.min, max: action.max}}
        case GET_SORT_PACKS:
            return {...state, params: {...state.params, sortPacks: action.sortPacks}}
        case SET_BELONGING:
            return {...state, params: {...state.params, user_id: action.user_id}}
        case SET_CARD_PACKS_TOTAL_COUNT:
            return {...state, cardPacksTotalCount: action.cardPacksTotalCount}
        case SET_CURRENT_PAGE:
            return {...state, params: {...state.params, page: action.page}}
        case SET_PAGE_COUNT:
            return {...state, params: {...state.params, pageCount: action.pageCount}}
        default:
            return state
    }
}

//actions
export const getPacks = (cardPacks: PackType[]) => ({type: GET_PACKS, cardPacks} as const)
export const setError = (error: string) => ({type: SET_ERROR, error} as const)

export const getPackName = (packName: string) => ({type: GET_PACK_NAME, packName} as const)
export const setDoubleRange = (min: number, max: number) => ({type: SET_DOUBLE_RANGE, min, max} as const)
export const getMinMaxValues = (min: number, max: number) => ({type: GET_MIN_MAX_VALUES, min, max} as const)
export const getSortPacks = (sortPacks: string) => ({type: GET_SORT_PACKS, sortPacks} as const)
export const setBelonging = (id: string) => ({type: SET_BELONGING, user_id: id} as const)
export const setCardPacksTotalCount = (cardPacksTotalCount: number) => ({
    type: SET_CARD_PACKS_TOTAL_COUNT, cardPacksTotalCount
} as const)
export const setCurrentPage = (page: number) => ({type: SET_CURRENT_PAGE, page} as const)
export const setPageCount = (pageCount: number) => ({type: SET_PAGE_COUNT, pageCount} as const)

//thunks
export const getPacksTC = (): AppThunk => {
    return async (dispatch, getState: () => ReduxRootType) => {
        dispatch(loadingAC(true))
        try {
            const params = getState().packs.params
            const res = await PacksAPI.getPacks(params)
            dispatch(getPacks(res.cardPacks))
            dispatch(setDoubleRange(res.minCardsCount, res.maxCardsCount))
            dispatch(setCardPacksTotalCount(res.cardPacksTotalCount))
        } catch (e: any) {
            const error = e.response.data
                ? e.response.data.error
                : (e.message + ', more details in the console');
            dispatch(setError(error))
        } finally {
            dispatch(loadingAC(false))
        }
    }
}
export const addPack = (params: CreatePackParamsType): AppThunk => {
    return async (dispatch) => {
        try {
            dispatch(loadingAC(true))
            await PacksAPI.addPack(params)
            await dispatch(getPacksTC())
        } catch (e: any) {
            const error = e.response.data
                ? e.response.data.error
                : (e.message + ', more details in the console');
            dispatch(setError(error))
        }
        dispatch(loadingAC(false))
    }
}
export const deletePack = (pack_id: string): AppThunk => {
    return async (dispatch) => {
        try {
            await PacksAPI.deletePack(pack_id)
            await dispatch(getPacksTC())
        } catch (e: any) {
            const error = e.response.data
                ? e.response.data.error
                : (e.message + ', more details in the console');
            dispatch(setError(error))
        }
    }
}
export const updatePack = (params: EditPackParamsType): AppThunk => {
    return async (dispatch) => {
        try {
            await PacksAPI.updatePack(params)
            dispatch(getPacksTC())
        } catch (e: any) {
            const error = e.response.data
                ? e.response.data.error
                : (e.message + ', more details in the console');
            dispatch(setError(error))
        }
    }
}
export const getPacksByPage = (pageNumber:number): AppThunk => {
    return async (dispatch, getState) => {
        dispatch(loadingAC(true))
        const {page,...params} = getState().packs.params;
        const payload = {page: pageNumber, ...params}
        try {
            const res = await PacksAPI.getPacks(payload)
            dispatch(getPacks(res.cardPacks))
            dispatch(setDoubleRange(res.minCardsCount, res.maxCardsCount))
            dispatch(setCardPacksTotalCount(res.cardPacksTotalCount))
            dispatch(setCurrentPage(pageNumber))
        } catch (e: any) {
            const error = e.response.data
                ? e.response.data.error
                : (e.message + ', more details in the console');
            dispatch(setError(error))
        } finally {
            dispatch(loadingAC(false))
        }
    }
}
//types
export type InitPacksStateType = typeof initialState

export type PacksActionsType =
    | ReturnType<typeof getPacks>
    | ReturnType<typeof setError>
    | ReturnType<typeof getPackName>
    | ReturnType<typeof setDoubleRange>
    | ReturnType<typeof getMinMaxValues>
    | ReturnType<typeof getSortPacks>
    | ReturnType<typeof setBelonging>
    | ReturnType<typeof setCardPacksTotalCount>
    | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof setPageCount>