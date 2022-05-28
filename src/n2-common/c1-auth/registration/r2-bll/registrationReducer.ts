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

//types
type RegistrationInitState = {
    loading: boolean
    error: null | string
}
type RegistrationActionsType =
    | ReturnType<typeof setLoading>
    | ReturnType<typeof setError>