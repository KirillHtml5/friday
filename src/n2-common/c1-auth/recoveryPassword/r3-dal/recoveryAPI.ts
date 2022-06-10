import {instance} from "../../../../n1-main/m3-bll/instance";

export const recoveryAPI = {
    sendPassword: (email: string) => {
        return instance.post("/auth/forgot", {
            email,
            from: "test-front-admin <neko.cafe@outlook.com>",
            message: `
<div style="padding: 15px">
password recovery link: 
<a href='https://KirillHtml5.github.io/friday/#/set-new-password/$token$'>
follow the link</a>
</div>
`,
        })
    }
};

