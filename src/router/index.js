import { createWebHistory, createRouter } from 'vue-router'

import HelloWorld from '../components/HelloWorld.vue'
import Auth from '../views/layouts/Auth.vue'
import DashboardLayout from '../views/layouts/DashboardLayout.vue'

const routes = [
  { path: '/', component: HelloWorld },
  { path: '/auth', component: Auth },
  { path: '/dashboard', component: DashboardLayout },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router