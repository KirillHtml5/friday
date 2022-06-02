import axios from "axios"

export const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'https://neko-back.herokuapp.com/2.0',
    withCredentials: true,
})

export type newPasswordType = {
    password: string,
    resetPasswordToken: string
}

export const NewPasswordAPI = {
    set(data:newPasswordType){
        return instance.post('auth/set-new-password',data)
    }
}