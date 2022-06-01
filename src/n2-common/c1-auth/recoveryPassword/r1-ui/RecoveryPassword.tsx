import React, {ChangeEvent, FC} from 'react'
import {NavLink} from 'react-router-dom';
import s from './RecoveryPassword.module.css'

type RecoveryPropsType = {
    email: string
    setEmail: (e: ChangeEvent<HTMLInputElement>) => void
    recovery: () => void
    loading: boolean
    error: null | string
}

export const RecoveryPassword: FC<RecoveryPropsType> = (
    {email, setEmail, recovery, loading, error}
) => {
    return (
        loading
            ?
            <div className={s.container}>
                Loading...
            </div>
            :
            <div className={s.container}>
                <h1>IT-incubator</h1>
                <h3>Forgot your password?</h3>
                <input
                    name={"email"}
                    type={"text"}
                    value={email}
                    onChange={setEmail}
                    placeholder={"Enter your email..."}
                />
                <p>{error}</p>
                <p>
                    Enter your email address and we will send you further instructions
                </p>
                <button onClick={recovery} disabled={loading}>
                    Send instructions
                </button>
                <p>
                    Did you remember your password?
                </p>
                <NavLink to={"/login"}>
                    <p>
                        Try loggin in
                    </p>
                </NavLink>
            </div>
    )
};