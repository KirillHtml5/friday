import {AppThunk} from "../../../../n1-main/m2-bll/store/ReduxStore";
import {recoveryAPI} from "../r3-dal/recoveryAPI";
import {loadingACType} from "../../loading/bll/loadingReducer";


const SET_LOADING = "RECOVERY/SET_LOADING"
const SET_ERROR = "RECOVERY/SET_ERROR"
const SENDING_TOKEN = "RECOVERY/SENDING_TOKEN"

const initialRecoveryState: InitRecoveryType = {
    loading: false,
    error: null,
    isSuccess: false,
}

export const recoveryReducer = (state = initialRecoveryState, action: RecoveryActionsType): InitRecoveryType => {
    switch (action.type) {
        case SET_LOADING:
            return {...state, loading: action.loading}
        case SET_ERROR:
            return {...state, error: action.error}
        case SENDING_TOKEN:
            return {...state, isSuccess: action.isSuccess}
        default:
            return state
    }
}

//actions
export const setLoading = (loading: boolean) => ({type: SET_LOADING, loading} as const)
export const setError = (error: null | string) => ({type: SET_ERROR, error} as const)
export const sendingToken = (isSuccess: boolean) => ({type: SENDING_TOKEN, isSuccess} as const)

//thunks
export const recoveryPassword = (email: string): AppThunk => {
    return async (dispatch) => {
        dispatch(setLoading(true))
        try {
            await recoveryAPI.sendPassword(email)
            dispatch(sendingToken(true))
        } catch (e: any) {
            console.log(e)
            const error = e.response.data
                ? e.response.data.error
                : (e.message + ', more details in the console')
            dispatch(setError(error))
        }
        dispatch(setLoading(false))
    }
}

//types
export type InitRecoveryType = {
    loading: boolean
    error: null | string
    isSuccess: boolean
}
export type RecoveryActionsType =
    | ReturnType<typeof setLoading>
    | ReturnType<typeof setError>
    | ReturnType<typeof sendingToken>
