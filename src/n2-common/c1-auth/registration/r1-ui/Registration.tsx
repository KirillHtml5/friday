import React, {ChangeEvent, FC} from 'react'
import { NavLink } from 'react-router-dom'
import s from './Registration.module.css'

type RegistrationPropsType = {
    email: string
    setEmail: (e: ChangeEvent<HTMLInputElement>) => void
    password: string
    setPassword: (e: ChangeEvent<HTMLInputElement>) => void
    password2: string
    setPassword2: (e: ChangeEvent<HTMLInputElement>) => void
    error: null | string
    signUp: () => void
    loading: boolean
}


export const Registration: FC<RegistrationPropsType> = (
    {
        email, setEmail, password,
        setPassword, password2, setPassword2,
        error, signUp, loading
    }
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
                type={"text"}
                value={password}
                onChange={setPassword}
                placeholder={"Enter your password..."}
            />
            <input name={"password2"}
                   type={"text"}
                   value={password2}
                   onChange={setPassword2}
                   placeholder={"Confirm your password..."}
            />
            <div className={s.buttonsBlock}>
                <NavLink to="/login">
                    Cancel
                </NavLink>
                <button
                    type={"submit"}
                    onClick={signUp}
                    disabled={loading}
                >
                    Register
                </button>
            </div>
            <div>{error}</div>
        </div>
    )
};