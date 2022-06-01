import React from 'react'
import {NavLink} from 'react-router-dom';
import s from './RecoveryPassword.module.css'


export const RecoveryPassword = () => {
    return (
        <div className={s.container}>
            <h1>IT-incubator</h1>
            <h3>Forgot your password?</h3>
            <input
                name={"email"}
                type={"text"}
                value={""}
                // onChange={setEmail}
                placeholder={"Enter your email..."}
            />
            <p>
                Enter your email address and we will send you further instructions
            </p>
            <button>
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