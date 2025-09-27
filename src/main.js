import './assets/main.css'

import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import { firebaseApp } from "@/firebase";

const app = createApp(App)

// Plugins
app.use(router);

// Third-party Providers
app.provide("firebaseApp", firebaseApp);
app.mount("#app");

