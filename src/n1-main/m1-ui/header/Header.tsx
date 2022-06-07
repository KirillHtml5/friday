import React from 'react';
import s from './Header.module.css'
import {NavLink} from "react-router-dom";


const Header = () => {
    return (
        <nav className={s.nav}>
            <div className={s.item}>
                <NavLink to='/login'
                         className={({isActive}) => isActive ? s.activeLink : ''}>LOGIN</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/registration'
                         className={({isActive}) => isActive ? s.activeLink : ''}>REGISTRATION</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/'
                         className={({isActive}) => isActive ? s.activeLink : ''}>PROFILE</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/404'
                         className={({isActive}) => isActive ? s.activeLink : ''}>404</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/recovery-password'
                         className={({isActive}) => isActive ? s.activeLink : ''}>RECOVERY PASSWORD</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/set-new-password'
                         className={({isActive}) => isActive ? s.activeLink : ''}>NEW
                    PASSWORD</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/test'
                         className={({isActive}) => isActive ? s.activeLink : ''}>TEST</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/packs'
                         className={({isActive}) => isActive ? s.activeLink : ''}>PACKS</NavLink>
            </div>
        </nav>
    )
}
export default Header