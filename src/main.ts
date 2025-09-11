console.log('Hello Vite + Vue3 + TS!')

import './style/reset.css'
import './style/color.css'
import './style/common.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')
