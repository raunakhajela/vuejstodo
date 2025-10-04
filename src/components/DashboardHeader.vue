<script setup>
import { useAuth } from '@/composables/useAuth'

const { user, logout } = useAuth()

const handleLogout = () => {
  logout()
}
</script>

<template>
    <nav>
        <div class="w-full mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-16">
                <div class="flex items-center">
                    <h1 class="text-xl font-semibold text-gray-900">Dashboard</h1>
                </div>
                <div class="flex items-center space-x-4">
                    <span class="text-gray-700">{{ user?.email }}</span>
                    <button @click="handleLogout"
                        class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                        Logout
                    </button>
                </div>
            </div>
        </div>
    </nav>
</template>