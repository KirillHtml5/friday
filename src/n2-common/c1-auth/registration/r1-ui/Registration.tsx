import React, {ChangeEvent, FC} from 'react'
import s from './Registration.module.css'

type RegistrationPropsType = {
    email: string
    setEmail: (e: ChangeEvent<HTMLInputElement>) => void
    password: string
    setPassword: (e: ChangeEvent<HTMLInputElement>) => void
    password2: string
    setPassword2: (e: ChangeEvent<HTMLInputElement>) => void
}


export const Registration: FC<RegistrationPropsType> = (
    {email, setEmail, password, setPassword, password2, setPassword2}
) => {
    return (
        <div className={s.container}>
            <h1>it-incubator</h1>
            <h3>Sign Up</h3>

            <input
                name={"email"}
                type={"text"}
                value={email}
                onChange={setEmail}
                placeholder={"Enter your email..."}
            />

            <input
                name={"password"}
                type={"password"}
                value={password}
                onChange={setPassword}
                placeholder={"Enter your password..."}
            />

            <input name={"password2"}
                   type={"password"}
                   value={password2}
                   onChange={setPassword2}
                   placeholder={"Confirm your password..."}
            />

            <div className={s.buttonsBlock}>
                <button>Cancel</button>
                <button type={"submit"}>Register</button>
            </div>
        </div>
    )
};