import './assets/main.css'

import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import { firebaseApp } from "@/firebase";
import { VueFire, VueFireAuth } from 'vuefire'

const app = createApp(App)

// Plugins
app.use(router);
app.use(VueFire, {
  firebaseApp,
  modules: [VueFireAuth()],
});

app.mount("#app");

