import {ThunkType} from "./Login-reducer"
import {NewPasswordAPI, newPasswordType} from "../../../n2-common/c1-auth/NewPassword/NewPasswordAPI";
import {setErrorAC, setErrorACType} from "./Error-reducer";
import {ThunkDispatch} from "redux-thunk";
import {ReduxRootType} from "../store/ReduxStore";

let initialState = {passwordChanged:false}
export type initialStateType = typeof initialState
const NewPasswordReducer = (state: initialStateType = initialState, action: ActionType): initialStateType => {

    switch (action.type) {
        case 'SET-NEW-PASSWORD':
            return {
                ...state, passwordChanged: action.passwordChanged
            }
        default:
            return state
    }
}
type ActionType = setNewPasswordACType | setErrorACType
type setNewPasswordACType = ReturnType<typeof setNewPasswordAC>

////actions
export const setNewPasswordAC = (passwordChanged:boolean) => ({type: 'SET-NEW-PASSWORD',passwordChanged} as const)
export type ThunkDispatchActionType = ThunkDispatch<ReduxRootType, unknown, ActionType>


////thunk
export const setNewPassword = (data:newPasswordType):ThunkType => (dispatch:ThunkDispatchActionType)=>{
    NewPasswordAPI.set(data)
        .then(res =>{
            console.log('res',res.data)
            dispatch(setNewPasswordAC(true))
        })
        .catch((e)=>{
            const error = e.response
                ? e.response.data.error
                : e.message
            console.log('Error',{...e})
            dispatch(setErrorAC(error))
        })
}


export default NewPasswordReducer