const SET_LOADING = "RECOVERY/SET_LOADING"
const SET_ERROR = "RECOVERY/SET_ERROR"

const initialRecoveryState: InitialRecoveryType = {
    loading: false,
    error: null,
}

export const recoveryReducer = (state = initialRecoveryState, action: RecoveryActionsType): InitialRecoveryType => {
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


//types
type InitialRecoveryType = {
    loading: boolean
    error: null | string
}
export type RecoveryActionsType = ReturnType<typeof setLoading> | ReturnType<typeof setError>