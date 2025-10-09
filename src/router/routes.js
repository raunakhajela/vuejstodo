import Auth from '@/views/layouts/Auth.vue'
import DashboardLayout from '@/views/layouts/DashboardLayout.vue'
import SignupPage from '@/views/pages/SignupPage.vue'
import LoginPage from '@/views/pages/LoginPage.vue'
import DashboardPage from '@/views/pages/DashboardPage.vue'
import TasksPage from '@/views/pages/TasksPage.vue'

const routes = [
  { path: '/', redirect: '/signup', meta: { redirectToAuth: true } },
  { path: '/signup', component: SignupPage, meta: { requiresGuest: true } },
  { path: '/login', component: LoginPage, meta: { requiresGuest: true } },
  { path: '/dashboard', component: DashboardPage, meta: { requiresAuth: true } },
  { path: '/tasks', component: TasksPage, meta: { requiresAuth: true } },
  { path: '/auth', component: Auth },
  { path: '/dashboard-layout', component: DashboardLayout },
  { path: '/:pathMatch(.*)*', redirect: '/dashboard' }, // change to NotFound.vue component later
]

export default routes