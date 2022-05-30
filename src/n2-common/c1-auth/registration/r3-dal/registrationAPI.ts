import axios from "axios";

export const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
        // 'https://neko-back.herokuapp.com/2.0',
    withCredentials: true,
})

export const registrationAPI = {
    signUp: (email: string, password: string) => {
        return instance.post<RegistrationDataType>('/auth/register', {email, password})
    }
}

type RegistrationDataType = {
    error: string
}