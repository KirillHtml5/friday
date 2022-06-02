import React, {useEffect, useState} from 'react'
import SuperInputText from "../../../n1-main/m1-ui/common/c1-SuperInputText/SuperInputText";
import SuperCheckbox from "../../../n1-main/m1-ui/common/c3-SuperCheckbox/SuperCheckbox";
import SuperButton from "../../../n1-main/m1-ui/common/c2-SuperButton/SuperButton";
import {useDispatch, useSelector} from "react-redux";
import {ReduxRootType} from "../../../n1-main/m2-bll/store/ReduxStore";
import {Navigate} from 'react-router-dom';
import {getAuthUserData, LoginTC, ThunkDispatchActionType} from "../../../n1-main/m2-bll/reducers/Login-reducer";
import s from './login.module.css'
import c from "../loading/loading.module.css";


const Login = () => {

    const isLoad = useSelector<ReduxRootType, boolean>(state => state.loading.isLoad)
    const isLoggedIn = useSelector<ReduxRootType, boolean>(state => state.login.isLoggedIn)
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [rememberMe, setRememberMe] = useState<boolean>(false);
    const error = useSelector<ReduxRootType, string | undefined>(state => state.error.error)
    const dispatch = useDispatch<ThunkDispatchActionType>();

    useEffect(() => {

        dispatch(getAuthUserData())
    }, [dispatch])

    if (isLoggedIn) return <Navigate to={'/'}/>

    const Login = () => {
        dispatch(LoginTC({email, password, rememberMe}))
    }

    return <div>
        {isLoad
            ? (<div className={c.preloader}></div>)
            : (<div>
                <h2>LOGIN</h2>
                <div className={s.page}>
                    <span>email</span>
                    <div>
                        <SuperInputText className={s.input} value={email} onChangeText={setEmail}/></div>
                    <span>password</span>
                    <div>
                        <SuperInputText className={s.input} value={password} onChangeText={setPassword}/></div>
                    <div>
                        <SuperCheckbox checked={rememberMe} onChangeChecked={setRememberMe}>Remember Me</SuperCheckbox>
                    </div>
                    {error}
                    <div><SuperButton onClick={Login}>Login</SuperButton></div>
                </div>
            </div>)
        }

    </div>
}

export default Login