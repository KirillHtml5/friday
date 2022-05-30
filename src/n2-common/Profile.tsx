import React, {useCallback, useEffect, useState} from 'react'
import SuperEditableSpan from "../n1-main/m1-ui/common/c4-SuperEditableSpan/SuperEditableSpan";
import {useDispatch, useSelector} from "react-redux";
import {getUserTC, updateUserTC} from "./kirill/k2-bll/profileReducer";
import {ReduxRootType} from "../n1-main/m2-bll/store/ReduxStore";

/// copy
const Profile = () => {
    // const userName=useSelector<ReduxRootType>((store)=>store.profile)
    const [name, setName] = useState('userName')
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUserTC())
    }, [])

    const updateUser = useCallback(() => {
        dispatch(updateUserTC(name))
    }, [dispatch, name])

    return <div>
        <h2>PROFILE</h2>
        <div>avatar</div>
        <div>avatar url</div>
        name: <SuperEditableSpan value={name} onChangeText={setName} onBlur={updateUser}/>
    </div>
}

export default Profile