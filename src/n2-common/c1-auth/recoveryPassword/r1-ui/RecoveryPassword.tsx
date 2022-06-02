import React, {ChangeEvent, FC} from 'react'
import {NavLink} from 'react-router-dom';
import s from './RecoveryPassword.module.css'

type RecoveryPropsType = {
    email: string
    setEmail: (e: ChangeEvent<HTMLInputElement>) => void
    recovery: () => void
    loading: boolean
    error: null | string
    isSuccess: boolean
}

export const RecoveryPassword: FC<RecoveryPropsType> = (
    {email, setEmail, recovery, loading, error, isSuccess}
) => {
    return (
        <div className={s.container}>
            <h1>IT-incubator</h1>
            <h3>Forgot your password?</h3>
            {isSuccess
                ?
                <>
                    <h3>Check Email</h3>
                    <p>We've sent an email with instructions to</p>
                    <p>{email}</p>
                </>
                :
                <>
                    <input
                        name={"email"}
                        type={"text"}
                        value={email}
                        onChange={setEmail}
                        placeholder={"Enter your email..."}
                    />
                    {loading && <p>Loading...</p>}
                    {error && <p>{error}</p>}
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
                </>}
        </div>
    )
};