import React, {ChangeEvent, useEffect, useState} from 'react';
import {RecoveryPassword} from "./RecoveryPassword";
import {useDispatch, useSelector} from "react-redux";
import {InitRecoveryType, recoveryPassword, sendingToken, setError} from "../r2-bll/recoveryReducer";
import {ReduxRootType} from "../../../../n1-main/m2-bll/store/ReduxStore";

export const RecoveryPasswordContainer = () => {
    const [email, setEmail] = useState<string>('')
    const {loading, error, isSuccess} = useSelector<ReduxRootType, InitRecoveryType>(state => state.recovery)
    const dispatch = useDispatch<any>()

    useEffect(() => {
        dispatch(setError(null))
        dispatch(sendingToken(false))
    }, [])

    const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value)
    }
    const recoveryHandler = () => {
        error && dispatch(setError(null))
        dispatch(recoveryPassword(email))
    }

    return (
        <RecoveryPassword
            email={email}
            setEmail={onChangeEmail}
            recovery={recoveryHandler}
            loading={loading}
            error={error}
            isSuccess={isSuccess}
        />
    )
};