import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import routes from "@/router/index.js";
import { createRouter, createWebHashHistory } from "vue-router";
import store from "@/store/store.js";
const router = createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHashHistory(),
    routes, // `routes: routes` 的缩写
});

const app = createApp(App)
app.use(store);
app.use(router);
app.use(ElementPlus)
app.mount('#app')
