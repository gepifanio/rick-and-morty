import { createApp } from "vue";
//store

import { store } from './store/index'
import App from "../App";  

const app = createApp(App);
// Install the store instance as a plugin
app.use(store)
app.mount("#app");