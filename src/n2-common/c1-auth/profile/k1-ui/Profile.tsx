import React, {useCallback, useState} from 'react'
import SuperEditableSpan from "../../../../n1-main/m1-ui/common/c4-SuperEditableSpan/SuperEditableSpan";
import {useDispatch, useSelector} from "react-redux";
import {updateUserTC, UserType} from "../k2-bll/profileReducer";
import {ReduxRootType} from "../../../../n1-main/m2-bll/store/ReduxStore";
import {Navigate} from "react-router-dom";
import {LogOutTC, ThunkDispatchActionType} from "../../../../n1-main/m2-bll/reducers/Login-reducer";
import s from "../../loading/loading.module.css";
import c from "./Profile.module.css"
import SuperButton from "../../../../n1-main/m1-ui/common/c2-SuperButton/SuperButton";


const Profile = () => {
    const isLoad = useSelector<ReduxRootType, boolean>(state => state.loading.isLoad)
    const isLogged = useSelector<ReduxRootType, boolean>(state => state.login.isLoggedIn)
    const userName = useSelector<ReduxRootType, string>((state) => state.profile.user.name)
    const avatarName = useSelector<ReduxRootType, string | undefined>((state) => state.profile.user.avatar)

    const [name, setName] = useState(userName)
    const [avatar, setAvatar] = useState<string | undefined>(avatarName)
    const dispatch = useDispatch<ThunkDispatchActionType>()


    const updateUser = useCallback(() => {
        dispatch(updateUserTC(name, avatar))
    }, [dispatch, name, avatar])

    const logoutUser = useCallback(() => {
        dispatch(LogOutTC())
    }, [dispatch])

    if (!isLogged) return <Navigate to={'/login'}/>


    return <div>
        {isLoad
            ? (<div className={s.preloader}></div>)
            : (<div className={c.mainBlock}>
                <h2>PROFILE INFORMATION</h2>
                <div>avatar</div>
                {/*<div>avatar url :<SuperEditableSpan value={avatar} onChangeText={setAvatar} onBlur={updateUser}/>*/}
                {/*</div>*/}
                <div>
                    <div>
                        name: <SuperEditableSpan value={name} onChangeText={setName} onBlur={updateUser}/>
                    </div>
                    <div>
                        <SuperButton onClick={logoutUser}>Log out</SuperButton>
                    </div>
                </div>
            </div>)
        }

    </div>
}

export default Profile