import {instance} from "../../../n1-main/m3-dal/instance";

export type newPasswordType = {
    password: string,
    resetPasswordToken: string
}

export const NewPasswordAPI = {
    set(data:newPasswordType){
        return instance.post('auth/set-new-password',data)
    }
}