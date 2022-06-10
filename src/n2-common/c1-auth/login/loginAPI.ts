import {instance} from "../../../n1-main/m3-bll/instance";

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