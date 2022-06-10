import React, {ChangeEvent} from 'react'
import SuperInputText from "../../../n1-main/m1-ui/common/c1-SuperInputText/SuperInputText";
import SuperCheckbox from "../../../n1-main/m1-ui/common/c3-SuperCheckbox/SuperCheckbox";
import SuperButton from "../../../n1-main/m1-ui/common/c2-SuperButton/SuperButton";
import s from './login.module.css'
import c from "../loading/loading.module.css";

type LoginType = {
    isLoad: boolean,
    email: string,
    setEmail: (e: ChangeEvent<HTMLInputElement>) => void,
    password: string,
    setPassword: (e: ChangeEvent<HTMLInputElement>) => void,
    rememberMe: boolean,
    setRememberMe: (rememberMe: boolean) => void,
    tryLogin: () => void
    error: string
}

export const Login: React.FC<LoginType> = (props) => {

    const {
        isLoad, email, setEmail, password, setPassword, rememberMe, setRememberMe,
        tryLogin, error
    } = props

    return <div>
        {isLoad
            ? (<div className={c.preloader}/>)
            : (<div>
                <h2>LOGIN</h2>
                <div className={s.page}>
                    <div>
                        <SuperInputText
                            className={s.input}
                            name={"email"}
                            placeholder={'Enter email...'}
                            value={email}
                            onChange={setEmail}/>
                    </div>
                    <div>
                        <SuperInputText
                            className={s.input}
                            name={"password"}
                            type={'password'}
                            placeholder={'Enter password...'}
                            value={password}
                            onChange={setPassword}/>
                    </div>
                    <div>
                        <SuperCheckbox
                            checked={rememberMe}
                            onChangeChecked={setRememberMe}
                        >
                            Remember Me
                        </SuperCheckbox>
                    </div>
                    <span className={s.error}>{error}</span>
                    <div><SuperButton onClick={tryLogin}>Login</SuperButton></div>
                </div>
            </div>)}

    </div>
}
