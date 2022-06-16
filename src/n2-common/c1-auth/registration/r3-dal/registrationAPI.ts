import {instance} from "../../../../n1-main/m3-dal/instance";

export const registrationAPI = {
    signUp: (email: string, password: string) => {
        return instance.post<RegistrationDataType>('/auth/register', {email, password})
    }
}

type RegistrationDataType = {
    error: string
}