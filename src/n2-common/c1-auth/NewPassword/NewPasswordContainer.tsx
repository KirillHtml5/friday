import React, {ChangeEvent, useState} from 'react'
import {Navigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {ReduxRootType} from "../../../n1-main/m2-bll/store/ReduxStore";
import {setNewPassword, ThunkDispatchActionType} from "../../../n1-main/m2-bll/reducers/New-Password-reducer";
import NewPassword from "./NewPassword";

export const NewPasswordContainer = () => {

    const passwordChanged = useSelector<ReduxRootType, boolean>(state => state.newPassword.passwordChanged)
    const error = useSelector<ReduxRootType, string | undefined>(state => state.error.error)
    const {token} = useParams();
    const [password, setPassword] = useState<string>('')
    const dispatch = useDispatch<ThunkDispatchActionType>()
    const [viewError, setViewError] = useState<string>('');
    let resetPasswordToken = '';

    if (token !== undefined) {
        resetPasswordToken = token
    }

    if (passwordChanged) return <Navigate to={'/login'}/>

    const changePassword = () => {
        error ? setViewError(error) : setViewError('')
        dispatch(setNewPassword({password, resetPasswordToken}))
    }

    const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value)
        setViewError('')
    }

    return <NewPassword password={password} setPassword={onPasswordChange} error={viewError} token={resetPasswordToken}
                        changePassword={changePassword}/>
}

