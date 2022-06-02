import {authAPI} from "../../../n2-common/c1-auth/login/loginAPI";
import {ThunkAction, ThunkDispatch} from "redux-thunk/";
import {ReduxRootType} from "../store/ReduxStore";
import {setErrorAC, setErrorACType} from "./Error-reducer";
import {setUserAC, setUserACType} from "../../../n2-common/c1-auth/profile/k2-bll/profileReducer";
import {loadingAC, loadingACType} from "../../../n2-common/c1-auth/loading/bll/loadingReducer";


const initialState: InitialStateType = {
    isLoggedIn: false,
    // email: '',
    // name: '',
    // avatar: '',
    // rememberMe: false
}

type InitialStateType = {
    isLoggedIn: boolean
    // email?: string
    // name?: string
    // avatar?: string
    // rememberMe?: boolean
}


const LoginReducer = (state: InitialStateType = initialState, action: loginActionType): InitialStateType => {

    switch (action.type) {
        case 'SET-LOGIN':
            return {
                ...state, ...action.payload
            }
        default:
            return state
    }
}
export type loginActionType = ReturnType<typeof setAccountInfoAC> | setErrorACType | setUserACType | loadingACType

//actions
// export const setAccountInfoAC = (isLoggedIn: boolean, email?: string, name?: string, avatar?: string, rememberMe?: boolean) => ({
//     type: 'SET-LOGIN',
//     payload: {isLoggedIn, email, name, avatar, rememberMe}
// } as const)
export const setAccountInfoAC = (isLoggedIn: boolean) => ({
    type: 'SET-LOGIN',
    payload: {isLoggedIn}
} as const)


//thunks

export type ThunkType = ThunkAction<void, ReduxRootType, unknown, loginActionType>
export type ThunkDispatchActionType = ThunkDispatch<ReduxRootType, unknown, loginActionType>

// export const getAuthUserData = (): ThunkType => (dispatch: ThunkDispatchActionType) => {
//     authAPI.me()
//         .then(res => {
//             const {email, name, avatar, rememberMe} = res.data
//             dispatch(setAccountInfoAC(true, email, name, avatar, rememberMe))
//         })
// }

export const getAuthUserData = (): ThunkType => (dispatch: ThunkDispatchActionType) => {
    dispatch(loadingAC(true))
    authAPI.me()
        .then(res => {
            dispatch(setAccountInfoAC(true))
            dispatch(setUserAC(res.data))
            dispatch(loadingAC(false))
        })
        .catch(e=>{
            dispatch(loadingAC(false))
        })
}

export const LoginTC = (data: { email: string, password: string, rememberMe: boolean }): ThunkType => (dispatch: ThunkDispatchActionType) => {
    dispatch(loadingAC(true))
    authAPI.login(data)
        .then(res => {
            dispatch(getAuthUserData())
            // dispatch(setAccountInfoAC(true))
            dispatch(loadingAC(false))
            console.log('Res', {...res.data})
        })
        .catch((e) => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console')
            console.log('Error: ', {...e})
            dispatch(setErrorAC(error))
            dispatch(loadingAC(false))
        })
}

// export const LogOutTC = (): ThunkType => (dispatch: ThunkDispatchActionType) => {
//     authAPI.logout()
//         .then(res => {
//             dispatch(setAccountInfoAC(false, '', '', '', false))
//             console.log('Res', {...res.data})
//         })
//         .catch((e) => {
//             const error = e.response
//                 ? e.response.data.error
//                 : (e.message + ', more details in the console')
//             console.log('Error: ', {...e})
//             dispatch(setErrorAC(error))
//         })
// }
export const LogOutTC = (): ThunkType => (dispatch: ThunkDispatchActionType) => {
    dispatch(loadingAC(true))
    authAPI.logout()
        .then(res => {
            dispatch(setAccountInfoAC(false))
            dispatch(loadingAC(false))
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