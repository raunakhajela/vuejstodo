import { getAuth } from 'firebase/auth'

import Auth from '@/views/layouts/Auth.vue'
import DashboardLayout from '@/views/layouts/DashboardLayout.vue'
import SignupPage from '@/views/SignupPage.vue'
import LoginPage from '@/views/LoginPage.vue'
import DashboardPage from '@/views/DashboardPage.vue'

const routes = [
  {
    path: '/',
    redirect: () => {
      const auth = getAuth()
      return auth.currentUser ? '/dashboard' : '/signup'
    }
  },
  { path: '/signup', component: SignupPage, meta: { requiresGuest: true } },
  { path: '/login', component: LoginPage, meta: { requiresGuest: true } },
  { path: '/dashboard', component: DashboardPage, meta: { requiresAuth: true } },
  { path: '/auth', component: Auth },
  { path: '/dashboard-layout', component: DashboardLayout },
]

export default routes