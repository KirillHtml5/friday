import {profileApi} from "../k3-dal/profileApi";
import {setAccountInfoAC, ThunkDispatchActionType, ThunkType} from "../../../../n1-main/m2-bll/reducers/Login-reducer";
import {loadingAC, loadingACType} from "../../loading/bll/loadingReducer";

export type UserType = {
    _id: string;
    email: string;
    name: string;
    avatar: string;
    publicCardPacksCount: number;

    created: Date;
    updated: Date;
    isAdmin: boolean;
    verified: boolean;
    rememberMe: boolean;
}
export type ProfileActionType = setUserACType | loadingACType
export type profileInitStateType = typeof profileInitState
export const firstUser: UserType = {
    _id: "",
    email: "",
    name: "",
    avatar: "hello",
    publicCardPacksCount: 0,

    created: new Date(),
    updated: new Date(),
    isAdmin: false,
    verified: false,
    rememberMe: false,
}
export const profileInitState = {
    user: firstUser
}

export const profileReducer = (state: profileInitStateType = profileInitState, action: ProfileActionType): profileInitStateType => {
    switch (action.type) {
        case "profile/SET-USER": {
            return {...state, user: action.user}
        }
        default: {
            return state
        }
    }
}

export const setUserAC = (user: UserType) => {
    return ({type: 'profile/SET-USER', user} as const)
}
export type setUserACType = ReturnType<typeof setUserAC>

export const getUserTC = (): ThunkType => (dispatch: ThunkDispatchActionType) => {
    dispatch(loadingAC(true))
    profileApi.getMe().then((res) => {
        dispatch(setUserAC(res.data))
        dispatch(setAccountInfoAC(true))
        dispatch(loadingAC(false))
    })
}
export const updateUserTC = (name: string, avatar: string | undefined): ThunkType => (dispatch: ThunkDispatchActionType) => {
    dispatch(loadingAC(true))
    profileApi.updateUser(name, avatar)
        .then((res) => {
            dispatch(setUserAC(res.data))
            dispatch(loadingAC(false))
            console.log(res.data)
        })
        .catch((error) => {
            console.log('ee', {...error})
        })

}

// type ThunkDispatchActionType = ThunkDispatch<ReduxRootType, unknown, ProfileActionType>