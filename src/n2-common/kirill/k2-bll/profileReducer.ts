import {Dispatch} from "redux";
import { ThunkDispatch } from "redux-thunk/es/types";
import {profileApi} from "../k3-dal/profileApi";
import {ReduxRootType} from "../../../n1-main/m2-bll/store/ReduxStore";

export type UserType = {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number;

    created: Date;
    updated: Date;
    isAdmin: boolean;
    verified: boolean;
    rememberMe: boolean;
}
export type ProfileActionType = setUserACType
export type profileInitStateType = typeof profileInitState
export const profileInitState = {
    user: {}
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

export const getUserTC = (): any => (dispatch: Dispatch) => {
    profileApi.getMe().then((res) => {
        dispatch(setUserAC(res.data))
    })
}
export const updateUserTC = (name: string): any => (dispatch: Dispatch) => {
    profileApi.updateUser(name)
        .then((res) => {
        dispatch(setUserAC(res.data))
        console.log(res.data)
    })
        .catch((error)=>{
            console.log('ee', {...error})
        })

}

// type ThunkDispatchActionType = ThunkDispatch<ReduxRootType, unknown, ProfileActionType>