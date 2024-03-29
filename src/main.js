import { createApp } from 'vue'
import { BootstrapIconsPlugin } from 'bootstrap-icons-vue'
import axios from 'axios';
import App from './App.vue'
import router from './router'
import { VueCookies } from 'vue-cookies';
import vuex from 'vuex'
import store from './store';
const app = createApp(App)

axios.defaults.baseURL = "http://localhost:8080";

app.use(router)
app.use(BootstrapIconsPlugin)
app.use(vuex)
app.use(store);
app.config.globalProperties.$axios = axios;
app.mount('#app')