import React, {ChangeEvent, useState} from 'react';
import {Registration} from "./Registration";
import {useDispatch, useSelector} from "react-redux";
import {ReduxRootType} from "../../../../n1-main/m2-bll/store/ReduxStore";
import {register} from "../r2-bll/registrationReducer";

export const RegistrationContainer = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [password2, setPassword2] = useState<string>('')

    const loading = useSelector<ReduxRootType, boolean>(state => state.registration.loading)
    const error = useSelector<ReduxRootType, null | string>(state => state.registration.error)
    const dispatch = useDispatch<any>()

    const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value)
    }
    const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value)
    }
    const onChangePassword2 = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword2(e.currentTarget.value)
    }
    const signUp = () => {
        dispatch(register(email, password))
    }

    return (
        <Registration email={email} setEmail={onChangeEmail}
                      password={password} setPassword={onChangePassword}
                      password2={password2} setPassword2={onChangePassword2}
                      error={error} signUp={signUp} loading={loading}
        />
    );
};