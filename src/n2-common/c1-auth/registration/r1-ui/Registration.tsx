import React, {ChangeEvent, FC} from 'react'
import s from './Registration.module.css'
import SuperButton from "../../../../n1-main/m1-ui/common/c2-SuperButton/SuperButton";
import SuperInputText from "../../../../n1-main/m1-ui/common/c1-SuperInputText/SuperInputText";
import c from "../../loading/loading.module.css";

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
    navigateToLogin: () => void
}


export const Registration: FC<RegistrationPropsType> = (
    {
        email, setEmail, password,
        setPassword, password2, setPassword2,
        error, signUp, loading,
        navigateToLogin,
    }
) => {
    return (
        loading
            ?
            <div className={c.preloader}/>
            :
            <div className={s.container}>
                <h2>REGISTRATION</h2>
                <SuperInputText
                    className={s.input}
                    name={"email"}
                    type={"text"}
                    value={email}
                    onChange={setEmail}
                    placeholder={"Enter email..."}
                />
                <SuperInputText
                    className={s.input}
                    name={"password"}
                    type={"text"}
                    value={password}
                    onChange={setPassword}
                    placeholder={"Enter password..."}
                />
                <SuperInputText
                    className={s.input}
                    name={"password2"}
                    type={"text"}
                    value={password2}
                    onChange={setPassword2}
                    placeholder={"Confirm password..."}
                />
                <div className={s.error}>{error}</div>
                <div className={s.buttonsBlock}>
                    <SuperButton onClick={navigateToLogin}>
                        Cancel
                    </SuperButton>
                    <SuperButton
                        onClick={signUp}
                        disabled={loading || password !== password2}
                    >
                        Register
                    </SuperButton>
                </div>
            </div>
    )
};