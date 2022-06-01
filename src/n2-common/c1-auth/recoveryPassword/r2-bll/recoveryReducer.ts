import {AppThunk} from "../../../../n1-main/m2-bll/store/ReduxStore";
import {recoveryAPI} from "../r3-dal/recoveryAPI";

const SET_LOADING = "RECOVERY/SET_LOADING"
const SET_ERROR = "RECOVERY/SET_ERROR"

const initialRecoveryState: InitRecoveryType = {
    loading: false,
    error: null,
}

export const recoveryReducer = (state = initialRecoveryState, action: RecoveryActionsType): InitRecoveryType => {
    switch (action.type) {
        case SET_LOADING:
            return {...state, loading: action.loading}
        case SET_ERROR:
            return {...state, error: action.error}
        default:
            return state
    }
}

//actions
export const setLoading = (loading: boolean) => ({type: SET_LOADING, loading} as const)
export const setError = (error: null | string) => ({type: SET_ERROR, error} as const)

//thunks
export const recoveryPassword = (email: string): AppThunk => {
    return async (dispatch) => {
        dispatch(setLoading(true))
        try {
            await recoveryAPI.sendPassword(email)
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
}
export type RecoveryActionsType = ReturnType<typeof setLoading> | ReturnType<typeof setError>