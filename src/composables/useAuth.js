import { ref, computed, watch } from 'vue'
import { useFirebaseAuth, useCurrentUser } from 'vuefire'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth'
import { useRouter } from 'vue-router'

const loading = ref(true)

export function useAuth() {
  const auth = useFirebaseAuth()
  const user = useCurrentUser()
  const router = useRouter()

  const isAuthenticated = computed(() => !!user.value)

  const initializeAuth = () => {
    watch(user, (firebaseUser, previousUser) => {
      loading.value = false

      // Only redirect on auth state changes, not on initial load
      if (previousUser === undefined) return

      // User just logged out
      if (!firebaseUser && previousUser) {
        router.push('/login')
      }
    }, { immediate: true })
  }

  const login = async (email, password) => {
    try {
      loading.value = true
      await signInWithEmailAndPassword(auth, email, password)
      router.push('/dashboard')
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    } finally {
      loading.value = false
    }
  }

  const signup = async (email, password) => {
    try {
      loading.value = true
      await createUserWithEmailAndPassword(auth, email, password)
      router.push('/dashboard')
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    } finally {
      loading.value = false
    }
  }

  const logout = async () => {
    try {
      await signOut(auth)
      router.push('/login')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return {
    user,
    isAuthenticated,
    loading: computed(() => loading.value),
    login,
    signup,
    logout,
    initializeAuth
  }
}