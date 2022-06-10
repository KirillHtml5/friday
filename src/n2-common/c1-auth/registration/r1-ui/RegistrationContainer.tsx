import React, {ChangeEvent, useEffect, useState} from 'react';
import {Registration} from "./Registration";
import {useDispatch, useSelector} from "react-redux";
import {ReduxRootType} from "../../../../n1-main/m2-bll/store/ReduxStore";
import {register, RegistrationInitState, setError, setRegistration} from "../r2-bll/registrationReducer";
import {useNavigate} from "react-router-dom";

export const RegistrationContainer = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [password2, setPassword2] = useState<string>('')

    const {
        loading,
        error,
        isRegistered
    } = useSelector<ReduxRootType, RegistrationInitState>(state => state.registration)

    const dispatch = useDispatch<any>()
    const navigate = useNavigate()

    const navigateToLogin = () => {
        return navigate("/login")
    }

    useEffect(() => {
        if (isRegistered) {
            return navigate("/login")
        }
        return () => {
            dispatch(setRegistration(false))
            dispatch(setError(null))
        }
    }, [isRegistered, dispatch, navigate]);

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
                      navigateToLogin={navigateToLogin}
        />
    );
};