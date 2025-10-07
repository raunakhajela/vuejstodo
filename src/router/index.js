import { createWebHistory, createRouter } from 'vue-router'
import { getCurrentUser } from 'vuefire'
import routes from './routes'

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from) => {
  const user = await getCurrentUser()

  // Handle root route redirect based on auth state
  if (to.meta.redirectToAuth) {
    return user ? '/dashboard' : '/signup'
  }

  // Protect authenticated routes
  if (to.meta.requiresAuth && !user) {
    return '/signup'
  }

  // Redirect authenticated users away from guest pages
  if (to.meta.requiresGuest && user) {
    return '/dashboard'
  }
})

export default router