import React, {ChangeEvent, useEffect, useState} from 'react'
import SuperInputText from "../../../n1-main/m1-ui/common/c1-SuperInputText/SuperInputText";
import SuperButton from "../../../n1-main/m1-ui/common/c2-SuperButton/SuperButton";
import s from './newPassword.module.css'
import {Navigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {ReduxRootType} from "../../../n1-main/m2-bll/store/ReduxStore";
import {setNewPassword, ThunkDispatchActionType} from "../../../n1-main/m2-bll/reducers/New-Password-reducer";

type NewPasswordType = {
    password: string,
    setPassword: (e: ChangeEvent<HTMLInputElement>) => void,
    error: string,
    token: string,
    changePassword: () => void
}


const NewPassword: React.FC<NewPasswordType> = (props) => {
    const {password, setPassword, changePassword, token, error} = props
    return <div className={s.page}>
        <h2>NEW PASSWORD</h2>
        <div>
            <SuperInputText value={password} onChange={setPassword} className={s.input}
                            placeholder={'Enter new password'}/>
        </div>
        <h5>{token}</h5>
        <span className={s.error}>{error}</span>
        <div><SuperButton onClick={changePassword}>Confirm</SuperButton></div>
    </div>
}

export default NewPassword