import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.31/vue.esm-browser.min.js";

const site = 'https://vue3-course-api.hexschool.io/v2'; 
const api_path = 'david-frontend';

let productModal = {};
let delProductModal = {};
const app = createApp({
    data() {
        return {
            products: [],
            tempProduct: {
                imagesUrl: [],
            },
            isNew: false,
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
        openModal(status, product){
            if(status === 'isNew'){
                this.tempProduct = {
                    imagesUrl: [],
                };
                productModal.show(); 
                this.isNew = true; //如果是新增 把狀態改成true
            }else if(status === 'edit'){
                this.tempProduct = {...product};
                this.isNew = false;  //如果是編輯 把狀態改成false
                if(this.tempProduct.imagesUrl){
                    productModal.show();
                }else{
                    this.tempProduct.imagesUrl=[];
                    productModal.show();
                }
            }else if(status === 'delete'){
                delProductModal.show(); //打開刪除的modal
                this.tempProduct = {...product};  //使用淺拷貝把品項(item)帶過來
            }
        },
        updateProduct(){
            let url = `${site}/api/${api_path}/admin/product`;
            let method = 'post';

            if (!this.isNew){
                url = `${site}/api/${api_path}/admin/product/${this.tempProduct.id}`;
                method = 'put';
            }
            axios[method](url, {data: this.tempProduct})
                .then(() => {
                    this.getProducts();
                    productModal.hide();
                })
        },
        delProduct(){
            const url = `${site}/api/${api_path}/admin/product/${this.tempProduct.id}`;
            axios.delete(url)
                .then(res => {
                    this.getProducts(); //1.所以重新取得產品列表
                    delProductModal.hide(); //2.使用完把modal關起來
                })
        }
    },
    mounted() {
        this.checkLogin();
        productModal = new bootstrap.Modal(document.getElementById('productModal'), {
        keyboard: false
        })
        delProductModal = new bootstrap.Modal(document.getElementById('delProductModal'), {
        keyboard: false
        })
    }
});
app.mount("#app")