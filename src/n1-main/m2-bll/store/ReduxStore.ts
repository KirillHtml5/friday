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
import {loadingACType, loadingReducer} from "../../../n2-common/c1-auth/loading/bll/loadingReducer";
import {RecoveryActionsType, recoveryReducer} from "../../../n2-common/c1-auth/recoveryPassword/r2-bll/recoveryReducer";
import {reducerPag} from "../../../n2-common/k2-pagination/reducerPag";
import {PacksActionsType, PacksReducer} from "../../../n2-common/c2-cards/packs/p2-bll/packsReducer";
import {CardsReducer} from "../reducers/Cards-reducer";
import {LearnActionsType, LearnReducer} from "../../../n2-common/c3-learn/l2-bll/learnReducer";

let rootReducer = combineReducers({
    login: LoginReducer,
    registration: registrationReducer,
    profile: profileReducer,
    recovery: recoveryReducer,
    newPassword: NewPasswordReducer,
    loading: loadingReducer,
    error: ErrorReducer,
    pagination: reducerPag,

    packs: PacksReducer,
    cards: CardsReducer,
    learn: LearnReducer,
})

let store = legacy_createStore(rootReducer, applyMiddleware(thunk))


export type ReduxStoreType = typeof store
export type ReduxRootType = ReturnType<typeof rootReducer>

export default store

type RootActionsType =
    | RegistrationActionsType
    | RecoveryActionsType
    | PacksActionsType
    | loadingACType
    | LearnActionsType

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, ReduxRootType, unknown, RootActionsType>