import React, {ChangeEvent, useState} from 'react';
import {Registration} from "./Registration";

export const RegistrationContainer = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [password2, setPassword2] = useState<string>('')

    const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value)
    }
    const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value)
    }
    const onChangePassword2 = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword2(e.currentTarget.value)
    }

    return (
        <Registration email={email} setEmail={onChangeEmail}
                  password={password} setPassword={onChangePassword}
                  password2={password2} setPassword2={onChangePassword2}
        />
    );
};