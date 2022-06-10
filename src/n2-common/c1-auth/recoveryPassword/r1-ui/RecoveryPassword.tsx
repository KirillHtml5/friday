import React, {ChangeEvent, FC} from 'react'
import s from './RecoveryPassword.module.css'
import SuperButton from "../../../../n1-main/m1-ui/common/c2-SuperButton/SuperButton";
import SuperInputText from "../../../../n1-main/m1-ui/common/c1-SuperInputText/SuperInputText";
import c from "../../loading/loading.module.css";

type RecoveryPropsType = {
    email: string
    setEmail: (e: ChangeEvent<HTMLInputElement>) => void
    recovery: () => void
    loading: boolean
    error: null | string
    isSuccess: boolean
    navigateToLogin: () => void
}

export const RecoveryPassword: FC<RecoveryPropsType> = (
    {email, setEmail, recovery, loading, error, isSuccess, navigateToLogin}
) => {
    return (
        <div className={s.container}>
            <h2>RECOVERY PASSWORD</h2>
            <h3>Forgot your password?</h3>
            {isSuccess
                ?
                <>
                    <h3>Check Email</h3>
                    <p>We've sent an email with instructions to</p>
                    <p>{email}</p>
                    <SuperButton onClick={navigateToLogin}>
                        Cancel
                    </SuperButton>
                </>
                :
                <>
                    <SuperInputText
                        className={s.input}
                        name={"email"}
                        type={"text"}
                        value={email}
                        onChange={setEmail}
                        placeholder={"Enter email..."}
                    />
                    {loading && <div className={c.preloader}/>}
                    {error && <p className={s.error}>{error}</p>}
                    <p>
                        Enter your email address and we will send you further instructions
                    </p>
                    <SuperButton onClick={recovery} disabled={loading}>
                        Send instructions
                    </SuperButton>
                    <p>
                        Did you remember your password?
                    </p>
                    <SuperButton onClick={navigateToLogin}>
                        Try loggin in
                    </SuperButton>
                </>}
        </div>
    )
};