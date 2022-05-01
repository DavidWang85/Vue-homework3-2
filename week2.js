import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.31/vue.esm-browser.min.js";

const site = 'https://vue3-course-api.hexschool.io/v2'; 
const api_path = 'david-frontend';

const app = createApp({
    data() {
        return {
            products: [],
            tempProduct: {},
        }
    },
    methods: {
        checkLogin(){
            const token = document.cookie.replace(/(?:(?:^|.*;\s*)davidToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
            //以後每次請求時都把token加進去
            axios.defaults.headers.common['Authorization'] = token;
            const url = `${site}/api/user/check`;
            axios.post(url)
                .then(res => {
                    console.log(res);
                    this.getProducts();
                })
                .catch(() =>{
                    window.location = './login.html';
                })
        },
        getProducts(){
            const url = `${site}/api/${api_path}/admin/products/all`;
            axios.get(url)
                .then(res => {
                    console.log(res);
                    this.products = res.data.products;
                })
        },
    },
    mounted() {
        this.checkLogin();
    }
});
app.mount("#app")