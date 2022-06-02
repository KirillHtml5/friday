import axios from "axios";
//https://neko-back.herokuapp.com/2.0
//'http://localhost:7542/2.0/'
export const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'https://neko-back.herokuapp.com/2.0',
    withCredentials: true,
})

export const profileApi = {
    getMe() {
        return instance.post('auth/me')
    },
    updateUser(name: string, avatar: string | undefined) {
        return instance.put('auth/me', {name, avatar})
    }
}