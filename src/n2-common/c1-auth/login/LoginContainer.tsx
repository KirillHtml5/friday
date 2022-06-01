import React, {ChangeEvent, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {ReduxRootType} from "../../../n1-main/m2-bll/store/ReduxStore";
import {Navigate} from 'react-router-dom';
import {LoginTC, ThunkDispatchActionType} from "../../../n1-main/m2-bll/reducers/Login-reducer";
import { Login } from './Login';


export const LoginContainer = () => {
    const isLoggedIn = useSelector<ReduxRootType,boolean>(state => state.login.isLoggedIn)
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [rememberMe, setRememberMe] = useState<boolean>(false);
    const error = useSelector<ReduxRootType, string | undefined>(state => state.error.error)
    const dispatch = useDispatch<ThunkDispatchActionType>();
    const [viewError, setViewError] = useState<string>('');

    if (isLoggedIn) return <Navigate to={'/'}/>

    const tryLogin = () => {
        dispatch(LoginTC({email, password, rememberMe}))
        error ? setViewError(error) : setViewError('')
    }

    const ChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value)
        setViewError('')
    }

    const ChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value)
        setViewError('')
    }
    return (<Login email={email} setEmail={ChangeEmail} password={password} setPassword={ChangePassword}
                   rememberMe={rememberMe} setRememberMe={setRememberMe} tryLogin={tryLogin} error={viewError}/>)

}

