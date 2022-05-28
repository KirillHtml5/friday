import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import LoginReducer from "../reducers/Login-reducer";
import NewPasswordReducer from "../reducers/New-Password-reducer";
import ProfileReducer from "../reducers/Profile-reducer";
import {registrationReducer} from "../../../n2-common/c1-auth/registration/r2-bll/registrationReducer";
import RecoveryReducer from "../reducers/Recovery-reducer";
import thunk from "redux-thunk";

let rootReducer = combineReducers({
    login: LoginReducer,
    registration: registrationReducer,
    profile: ProfileReducer,
    recoveryPassword: RecoveryReducer,
    newPassword: NewPasswordReducer

})

let store = legacy_createStore(rootReducer, applyMiddleware(thunk))


export type ReduxStoreType = typeof store
export type ReduxRootType = ReturnType<typeof rootReducer>

export default store

