import {instance} from "../../../../n1-main/m3-bll/instance";

export const registrationAPI = {
    signUp: (email: string, password: string) => {
        return instance.post<RegistrationDataType>('/auth/register', {email, password})
    }
}

type RegistrationDataType = {
    error: string
}