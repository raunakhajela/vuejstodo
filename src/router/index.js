import { createWebHistory, createRouter } from 'vue-router'
import { getAuth } from 'firebase/auth'
import routes from './routes'

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, _from, next) => {
  const auth = getAuth()
  const user = auth.currentUser

  if (to.meta.requiresAuth && !user) {
    next('/signup')
  } else if (to.meta.requiresGuest && user) {
    next('/dashboard')
  } else {
    next()
  }
})

export default router