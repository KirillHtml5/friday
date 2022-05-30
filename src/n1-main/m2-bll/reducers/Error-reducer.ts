let initialState = {
    error:''
}


export type initialStateType = {
    error?:string
}
const ErrorReducer = (state: initialStateType = initialState, action: setErrorACType): initialStateType => {

    switch (action.type) {
        case 'SET-ERROR':
            return {
                ...state,error:action.error
            }
        default:
            return state
    }
}

export type setErrorACType = ReturnType<typeof setErrorAC>

export const setErrorAC = (error:string) => ({type: 'SET-ERROR',error} as const)

export default ErrorReducer