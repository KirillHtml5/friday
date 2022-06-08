import {instance} from "../../../../n1-main/m3-bll/instance";

export const recoveryAPI = {
    sendPassword: (email: string) => {
        return instance.post("/auth/forgot", {
            email,
            from: "test-front-admin <ai73a@yandex.by>",
            message: `
<div style="background-color: #80bdff; color: white; padding: 15px">
password recovery link: 
<a href='https://KirillHtml5.github.io/friday/#/set-new-password/$token$'>
link</a>
</div>
`,
        })
    }
};

