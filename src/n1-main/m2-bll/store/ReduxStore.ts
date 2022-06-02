import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import LoginReducer from "../reducers/Login-reducer";
import NewPasswordReducer from "../reducers/New-Password-reducer";

import RecoveryReducer from "../reducers/Recovery-reducer";
import ErrorReducer from "../reducers/Error-reducer";
import {
    RegistrationActionsType,
    registrationReducer
} from "../../../n2-common/c1-auth/registration/r2-bll/registrationReducer";
import thunk, {ThunkAction} from "redux-thunk";
import {profileReducer} from "../../../n2-common/c1-auth/profile/k2-bll/profileReducer";
import {loadingReducer} from "../../../n2-common/c1-auth/loading/bll/loadingReducer";

let rootReducer = combineReducers({
    login: LoginReducer,
    registration: registrationReducer,
    profile: profileReducer,
    recoveryPassword: RecoveryReducer,
    newPassword: NewPasswordReducer,
    loading: loadingReducer,
    error: ErrorReducer,

})

let store = legacy_createStore(rootReducer, applyMiddleware(thunk))


export type ReduxStoreType = typeof store
export type ReduxRootType = ReturnType<typeof rootReducer>

export default store

type RootActionsType = RegistrationActionsType
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, ReduxRootType, unknown, RootActionsType>