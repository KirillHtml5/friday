import {authAPI} from "../../../n2-common/c1-auth/login/loginAPI";
import {ThunkAction, ThunkDispatch} from "redux-thunk/";
import {ReduxRootType} from "../store/ReduxStore";
import {setErrorAC, setErrorACType} from "./Error-reducer";


const initialState: InitialStateType = {
    isLoggedIn: false,
    email: '',
    name: '',
    avatar: '',
    rememberMe: false
}

type InitialStateType = {
    isLoggedIn: boolean
    email: string
    name: string
    avatar?: string
    rememberMe: boolean
}


const LoginReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {

    switch (action.type) {
        case 'SET-LOGIN':
            return {
                ...state, ...action.payload
            }
        default:
            return state
    }
}
type ActionType = ReturnType<typeof setAccountInfoAC> | setErrorACType

//actions
export const setAccountInfoAC = (isLoggedIn: boolean, email: string, name: string, avatar: string, rememberMe: boolean) => ({
    type: 'SET-LOGIN',
    payload: {isLoggedIn, email, name, avatar, rememberMe}
} as const)


//thunks

type ThunkType = ThunkAction<void, ReduxRootType, unknown, ActionType>
export type ThunkDispatchActionType = ThunkDispatch<ReduxRootType, unknown, ActionType>

export const getAuthUserData = (): ThunkType => (dispatch: ThunkDispatchActionType) => {
    authAPI.me()
        .then(res => {
            const {email, name, avatar, rememberMe} = res.data
            dispatch(setAccountInfoAC(true, email, name, avatar, rememberMe))
        })
}

export const LoginTC = (data: {email:string,password:string,rememberMe:boolean}): ThunkType => (dispatch: ThunkDispatchActionType) => {

    authAPI.login(data)
        .then(res => {
            dispatch(getAuthUserData())
            console.log('Res', {...res.data})
        })
        .catch((e) => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console')
            console.log('Error: ', {...e})
            dispatch(setErrorAC(error))
        })
}

export const LogOutTC = (): ThunkType => (dispatch: ThunkDispatchActionType) => {
    authAPI.logout()
        .then(res => {
            dispatch(setAccountInfoAC(false, '', '', '', false))
            console.log('Res', {...res.data})
        })
        .catch((e) => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console')
            console.log('Error: ', {...e})
            dispatch(setErrorAC(error))
        })
}


export default LoginReducer