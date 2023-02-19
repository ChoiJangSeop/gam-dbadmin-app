import { createApp } from 'vue'
import { BootstrapIconsPlugin } from 'bootstrap-icons-vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)
app.use(BootstrapIconsPlugin)
app.mount('#app')
