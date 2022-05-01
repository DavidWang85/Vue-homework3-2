import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.31/vue.esm-browser.min.js";

const site = 'https://vue3-course-api.hexschool.io/v2';  

const app = createApp({
    data() {
        return {
            user: {
                username:'',
                password:'',
            },
        }
    },
    methods: {
        login() {
            const url = `${site}/admin/signin`;
            axios.post(url, this.user)
                .then(res => {
                    const {token, expired} = res.data;
                    console.log(token, expired);
                    document.cookie = `davidToken=${token}; expires=${new Date(expired)}`;
                    window.location = './week2.html';
                })
                .catch(err => {
                    console.log(err);
                })
        },
    }
});
app.mount("#app");