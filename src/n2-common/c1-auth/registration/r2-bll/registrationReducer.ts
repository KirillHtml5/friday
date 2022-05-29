import {registrationAPI} from "../r3-dal/registrationAPI";
import {AppThunk} from "../../../../n1-main/m2-bll/store/ReduxStore";

const SET_LOADING = 'Registration/SET_LOADING'
const SET_ERROR = 'Registration/SET_ERROR'

export const RegistrationInitState: RegistrationInitState = {
    loading: false,
    error: null,
}

export const registrationReducer = (state = RegistrationInitState, action: RegistrationActionsType) => {
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
export const register = (email: string, password: string): AppThunk => {
    return async (dispatch) => {
        dispatch(setLoading(true))
        try {
            await registrationAPI.signUp(email, password)
        } catch (e: any) {
            const error = e.response.data
                ? e.response.data.error
                : (e.message + ', more details in the console');
            dispatch(setError(error))
        }
        dispatch(setLoading(false))
    }
}

//types
type RegistrationInitState = {
    loading: boolean
    error: null | string
}
export type RegistrationActionsType =
    | ReturnType<typeof setLoading>
    | ReturnType<typeof setError>