import Auth from '@/views/layouts/Auth.vue'
import DashboardLayout from '@/views/layouts/DashboardLayout.vue'
import SignupPage from '@/views/SignupPage.vue'
import LoginPage from '@/views/LoginPage.vue'
import DashboardPage from '@/views/DashboardPage.vue'

const routes = [
  { path: '/', redirect: '/signup', meta: { redirectToAuth: true } },
  { path: '/signup', component: SignupPage, meta: { requiresGuest: true } },
  { path: '/login', component: LoginPage, meta: { requiresGuest: true } },
  { path: '/dashboard', component: DashboardPage, meta: { requiresAuth: true } },
  { path: '/auth', component: Auth },
  { path: '/dashboard-layout', component: DashboardLayout },
  { path: '/:pathMatch(.*)*', redirect: '/dashboard' }, // change to NotFound.vue component later
]

export default routes