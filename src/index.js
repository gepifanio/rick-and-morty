import { createApp } from "vue";
import { store } from './store/index'

import App from "./App.vue";  
import './index.css'

const app = createApp(App);
// Install the store instance as a plugin
app.use(store)
app.mount("#app");