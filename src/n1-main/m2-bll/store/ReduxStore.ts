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
import {PacksActionsType, PacksReducer} from "../../../n2-common/c2-cards/packs/p2-bll/packsReducer";

let rootReducer = combineReducers({
    login: LoginReducer,
    registration: registrationReducer,
    profile: profileReducer,
    recovery: recoveryReducer,
    newPassword: NewPasswordReducer,
    loading: loadingReducer,
    error: ErrorReducer,
    packs: PacksReducer,
})

let store = legacy_createStore(rootReducer, applyMiddleware(thunk))


export type ReduxStoreType = typeof store
export type ReduxRootType = ReturnType<typeof rootReducer>

export default store

type RootActionsType =
    | RegistrationActionsType
    | RecoveryActionsType
    | PacksActionsType

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, ReduxRootType, unknown, RootActionsType>