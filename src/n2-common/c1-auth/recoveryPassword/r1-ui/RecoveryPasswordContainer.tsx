import React, {ChangeEvent, useState} from 'react';
import {RecoveryPassword} from "./RecoveryPassword";

export const RecoveryPasswordContainer = () => {
    const [email, setEmail] = useState<string>('')

    const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value)
    }

    return (
        <RecoveryPassword email={email} setEmail={onChangeEmail}/>
    )
};