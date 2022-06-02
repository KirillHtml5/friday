import React, {ChangeEvent, useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {ReduxRootType} from "../../../n1-main/m2-bll/store/ReduxStore";
import {Navigate} from 'react-router-dom';
import {getAuthUserData, LoginTC, ThunkDispatchActionType} from "../../../n1-main/m2-bll/reducers/Login-reducer";
import {Login} from "./Login";


export const LoginContainer = () => {

    const isLoad = useSelector<ReduxRootType, boolean>(state => state.loading.isLoad)
    const isLoggedIn = useSelector<ReduxRootType, boolean>(state => state.login.isLoggedIn)
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [rememberMe, setRememberMe] = useState<boolean>(false);
    const error = useSelector<ReduxRootType, string | undefined>(state => state.error.error)
    const dispatch = useDispatch<ThunkDispatchActionType>();
    const [viewError, setViewError] = useState<string>('');

    useEffect(() => {

        dispatch(getAuthUserData())
    }, [dispatch])

    if (isLoggedIn) return <Navigate to={'/'}/>

    const tryLogin = () => {
        error ? setViewError(error) : setViewError('')
        dispatch(LoginTC({email, password, rememberMe}))
    }


    const changeEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value)
        setViewError('')
    }

    const changePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value)
        setViewError('')
    }
    return (<Login isLoad={isLoad} email={email} setEmail={changeEmail} password={password} setPassword={changePassword}
                   rememberMe={rememberMe} setRememberMe={setRememberMe} tryLogin={tryLogin} error={viewError}/>)

}

