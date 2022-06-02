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
            ? (<div className={c.preloader}></div>)
            : (<div>
                <h2>LOGIN</h2>
                <div className={s.page}>
                    <div>
                        <SuperInputText className={s.input} placeholder={'Enter email'} value={email}
                                        onChange={setEmail}/></div>
                    <div>
                        <SuperInputText className={s.input} placeholder={'Enter password'} value={password}
                                        onChange={setPassword}/></div>
                    <div>
                        <SuperCheckbox checked={rememberMe} onChangeChecked={setRememberMe}>Remember Me</SuperCheckbox>
                    </div>
                    <span className={s.error}>{error}</span>
                    <div><SuperButton onClick={tryLogin}>Login</SuperButton></div>
                </div>
            </div>)}

    </div>
}

// const Login = () => {
//
//     const isLoad = useSelector<ReduxRootType, boolean>(state => state.loading.isLoad)
//     const isLoggedIn = useSelector<ReduxRootType, boolean>(state => state.login.isLoggedIn)
//     const [email, setEmail] = useState<string>('');
//     const [password, setPassword] = useState<string>('');
//     const [rememberMe, setRememberMe] = useState<boolean>(false);
//     const error = useSelector<ReduxRootType, string | undefined>(state => state.error.error)
//     const dispatch = useDispatch<ThunkDispatchActionType>();
//
//     useEffect(() => {
//
//         dispatch(getAuthUserData())
//     }, [dispatch])
//
//     if (isLoggedIn) return <Navigate to={'/'}/>
//
//     const Login = () => {
//         dispatch(LoginTC({email, password, rememberMe}))
//     }
//
//     return <div>
//         {isLoad
//             ? (<div className={c.preloader}></div>)
//             : (<div>
//                 <h2>LOGIN</h2>
//                 <div className={s.page}>
//                     <span>email</span>
//                     <div>
//                         <SuperInputText className={s.input} value={email} onChangeText={setEmail}/></div>
//                     <span>password</span>
//                     <div>
//                         <SuperInputText className={s.input} value={password} onChangeText={setPassword}/></div>
//                     <div>
//                         <SuperCheckbox checked={rememberMe} onChangeChecked={setRememberMe}>Remember Me</SuperCheckbox>
//                     </div>
//                     {error}
//                     <div><SuperButton onClick={Login}>Login</SuperButton></div>
//                 </div>
//             </div>)
//         }
//
//     </div>
// }
//
// export default Login