import axios from "axios";

export const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    withCredentials: true,
})

export type LoginType = {
    email: string
    password: string
    rememberMe?: boolean
}

export const authAPI = {
    me() {
        return instance.post('auth/me', {})
    },
    login(data:LoginType){
        return instance.post<LoginType>('/auth/login',data)
    },
    logout() {
        return instance.delete('auth/me')
    }
}