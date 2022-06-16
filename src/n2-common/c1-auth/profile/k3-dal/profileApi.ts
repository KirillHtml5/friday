import {instance} from "../../../../n1-main/m3-dal/instance";

export const profileApi = {
    getMe() {
        return instance.post('auth/me')
    },
    updateUser(name: string, avatar: string | undefined) {
        return instance.put('auth/me', {name, avatar})
    }
}