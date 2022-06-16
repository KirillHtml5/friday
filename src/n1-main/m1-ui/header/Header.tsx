import React, {useCallback} from 'react';
import s from './Header.module.css'
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {ReduxRootType} from "../../m2-bll/store/ReduxStore";
import {LogOutTC, ThunkDispatchActionType} from "../../m2-bll/reducers/Login-reducer";
import userLogo from '../assets/userLogo.png';


const Header = () => {
    const isLoggedIn = useSelector<ReduxRootType, boolean>(state => state.login.isLoggedIn)
    const avatar = useSelector<ReduxRootType, string>(state => state.profile.user.avatar)
    const dispatch = useDispatch<ThunkDispatchActionType>()

    const logoutUser = useCallback(() => {
        dispatch(LogOutTC())
    }, [dispatch])

    return (
        <div className={s.header}>
            <div className={s.title}>
                IT-INCUBATOR
            </div>
            <div className={s.links}>
                {isLoggedIn
                    ?
                    <>
                        <div className={s.item}>
                            <NavLink to='/'
                                     className={({isActive}) => isActive ? s.activeLink : ''}>PROFILE</NavLink>
                        </div>
                        <div className={s.item}>
                            <NavLink to='/packs'
                                     className={({isActive}) => isActive ? s.activeLink : ''}>PACKS</NavLink>
                        </div>
                    </>
                    :
                    <>
                        <div className={s.item}>
                            <NavLink to='/login'
                                     className={({isActive}) => isActive ? s.activeLink : ''}>LOGIN</NavLink>
                        </div>
                        <div className={s.item}>
                            <NavLink to='/registration'
                                     className={({isActive}) => isActive ? s.activeLink : ''}>REGISTRATION</NavLink>
                        </div>
                        <div className={s.item}>
                            <NavLink to='/recovery-password'
                                     className={({isActive}) => isActive ? s.activeLink : ''}>RECOVERY</NavLink>
                        </div>
                    </>
                }
            </div>
            {isLoggedIn
                ?
                <div className={s.info}>
                    <img src={avatar ? avatar : userLogo} />
                    <div className={s.dropdownContent}>
                        <NavLink to='/'>PROFILE</NavLink>
                        <NavLink to="#" onClick={logoutUser}>LOG OUT</NavLink>
                    </div>
                </div>
                :
                <div className={s.info}/>
            }
        </div>
    )
}
export default Header