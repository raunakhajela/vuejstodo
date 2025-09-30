<script setup>
import { useAuth } from '../composables/useAuth'

const { user, logout } = useAuth()

const handleLogout = () => {
  logout()
}

const dummyTasks = [
  {
    "id": 1,
    "title": "Buy groceries",
    "created_at": "2025-09-01",
    "status": "backlog",
    "completed": false
  },
  {
    "id": 2,
    "title": "Call the dentist",
    "created_at": "2025-09-02",
    "status": "todo",
    "completed": false
  },
  {
    "id": 3,
    "title": "Clean the kitchen",
    "created_at": "2025-09-03",
    "status": "inProgress",
    "completed": false
  },
  {
    "id": 4,
    "title": "Finish reading a book",
    "created_at": "2025-09-04",
    "status": "backlog",
    "completed": true
  },
  {
    "id": 5,
    "title": "Water the plants",
    "created_at": "2025-09-05",
    "status": "todo",
    "completed": false
  },
  {
    "id": 6,
    "title": "Pay electricity bill",
    "created_at": "2025-09-06",
    "status": "inProgress",
    "completed": false
  },
  {
    "id": 7,
    "title": "Organize closet",
    "created_at": "2025-09-07",
    "status": "backlog",
    "completed": false
  },
  {
    "id": 8,
    "title": "Take the car for service",
    "created_at": "2025-09-08",
    "status": "todo",
    "completed": true
  },
  {
    "id": 9,
    "title": "Plan weekend trip",
    "created_at": "2025-09-09",
    "status": "inProgress",
    "completed": false
  },
  {
    "id": 10,
    "title": "Buy birthday gift",
    "created_at": "2025-09-10",
    "status": "backlog",
    "completed": false
  },
  {
    "id": 11,
    "title": "Cook dinner for friends",
    "created_at": "2025-09-11",
    "status": "todo",
    "completed": false
  },
  {
    "id": 12,
    "title": "Do laundry",
    "created_at": "2025-09-12",
    "status": "inProgress",
    "completed": true
  },
  {
    "id": 13,
    "title": "Fix leaking tap",
    "created_at": "2025-09-13",
    "status": "backlog",
    "completed": false
  },
  {
    "id": 14,
    "title": "Go for a morning walk",
    "created_at": "2025-09-14",
    "status": "todo",
    "completed": true
  },
  {
    "id": 15,
    "title": "Write journal entry",
    "created_at": "2025-09-15",
    "status": "inProgress",
    "completed": false
  },
  {
    "id": 16,
    "title": "Buy new shoes",
    "created_at": "2025-09-16",
    "status": "backlog",
    "completed": false
  },
  {
    "id": 17,
    "title": "Update resume",
    "created_at": "2025-09-17",
    "status": "todo",
    "completed": false
  },
  {
    "id": 18,
    "title": "Clean laptop screen",
    "created_at": "2025-09-18",
    "status": "inProgress",
    "completed": true
  },
  {
    "id": 19,
    "title": "Call parents",
    "created_at": "2025-09-19",
    "status": "backlog",
    "completed": false
  },
  {
    "id": 20,
    "title": "Practice guitar",
    "created_at": "2025-09-20",
    "status": "todo",
    "completed": false
  }
]
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <nav class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <h1 class="text-xl font-semibold text-gray-900">Dashboard</h1>
          </div>
          <div class="flex items-center space-x-4">
            <span class="text-gray-700">{{ user?.email }}</span>
            <button
              @click="handleLogout"
              class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>

    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="p=4 sm:px-0">
        <div class="grid grid-cols-4 h-fit gap-4">
          <div class="border-2 border-dashed border-gray-200 rounded-lg p-6">
            <h2 class="text-lg font-bold text-gray-900 mb-4">Backlog</h2>
            <ul class="space-y-4 text-gray-600 text-base">
              <li v-for="task in dummyTasks">
                <input type="checkbox" class="mr-2" :checked="task.completed" />
                {{ task.title }}</li>
            </ul>
          </div>

          <div class="border-2 border-dashed border-gray-200 rounded-lg p-6">
            <h2 class="text-lg font-bold text-gray-900 mb-4">Todo</h2>
            <ul class="space-y-4 text-gray-600 text-base">
              <li v-for="task in dummyTasks">
                <input type="checkbox" class="mr-2" :checked="task.completed" />
                {{ task.title }}</li>
            </ul>
          </div>

          <div class="border-2 border-dashed border-gray-200 rounded-lg p-6">
            <h2 class="text-lg font-bold text-gray-900 mb-4">In progress</h2>
            <ul class="space-y-4 text-gray-600 text-base">
              <li v-for="task in dummyTasks">
                <input type="checkbox" class="mr-2" :checked="task.completed" />
                {{ task.title }}</li>
            </ul>
          </div>

          <div class="border-2 border-dashed border-gray-200 rounded-lg p-6">
            <h2 class="text-lg font-bold text-gray-900 mb-4">Done</h2>
            <ul class="space-y-4 text-gray-600 text-base">
              <li v-for="task in dummyTasks">
                <input type="checkbox" class="mr-2" :checked="task.completed" />
                {{ task.title }}</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>