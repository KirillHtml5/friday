import axios from "axios"

const instance = axios.create({
    baseURL: "https://neko-back.herokuapp.com/2.0",
    withCredentials: true,
})

export const recoveryAPI = {
    sendPassword: (email: string) => {
        return instance.post("/auth/forgot", {
            email,
            from: "test-front-admin <ai73a@yandex.by>",
            message: `
<div style="background-color: #80bdff; color: white; padding: 15px">
password recovery link: 
<a href='http://localhost:3000/friday#/new-password/$token$'>
link</a>
</div>
`,
        })
    }
};