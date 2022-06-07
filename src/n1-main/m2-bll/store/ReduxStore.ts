import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import LoginReducer from "../reducers/Login-reducer";
import NewPasswordReducer from "../reducers/New-Password-reducer";

import ErrorReducer from "../reducers/Error-reducer";
import {
    RegistrationActionsType,
    registrationReducer
} from "../../../n2-common/c1-auth/registration/r2-bll/registrationReducer";
import thunk, {ThunkAction} from "redux-thunk";
import {profileReducer} from "../../../n2-common/c1-auth/profile/k2-bll/profileReducer";
import {loadingReducer} from "../../../n2-common/c1-auth/loading/bll/loadingReducer";
import {RecoveryActionsType, recoveryReducer} from "../../../n2-common/c1-auth/recoveryPassword/r2-bll/recoveryReducer";
import {reducerPag} from "../../../n2-common/k2-pagination/reducerPag";
import {reducerSort} from "../../../n2-common/k2-sort/reducerSort";

let rootReducer = combineReducers({
    login: LoginReducer,
    registration: registrationReducer,
    profile: profileReducer,
    recovery: recoveryReducer,
    newPassword: NewPasswordReducer,
    loading: loadingReducer,
    error: ErrorReducer,
    pagination: reducerPag,
    sort: reducerSort,

})

let store = legacy_createStore(rootReducer, applyMiddleware(thunk))


export type ReduxStoreType = typeof store
export type ReduxRootType = ReturnType<typeof rootReducer>

export default store

type RootActionsType = RegistrationActionsType | RecoveryActionsType
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, ReduxRootType, unknown, RootActionsType>