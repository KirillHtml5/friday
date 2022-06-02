import {ProfileActionType} from "../../profile/k2-bll/profileReducer";
import {loginActionType} from "../../../../n1-main/m2-bll/reducers/Login-reducer";

export type ActionType = loadingACType | ProfileActionType | loginActionType


const initState = {
    isLoad: false
}
export type initStateType = typeof initState


export const loadingReducer = (state: initStateType = initState, action: ActionType): initStateType => { // fix any
    switch (action.type) {
        case 'LOADING': {
            return {...state, isLoad: action.isLoad}
        }
        default:
            return state
    }
}

export const loadingAC = (isLoad: boolean) => {
    return ({type: "LOADING", isLoad} as const)
}
export type loadingACType = ReturnType<typeof loadingAC>
// fix any