<script setup>
import { ref, computed } from 'vue'
import DashboardHeader from '@/components/DashboardHeader.vue'
import { Trash2, Plus } from 'lucide-vue-next'

const toggleBacklogTask = ref(false)
const toggleTodoTask = ref(false)
const toggleInProgressTask = ref(false)
const newBacklogTask = ref('')
const newTodoTask = ref('')
const newInProgressTask = ref('')
const tasks = ref([
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
]);

function addTask(currentStatus, title) {
  console.log(title)
  if (!title) return;
  tasks.value.push({
    id: tasks.value.length + 1,
    title,
    created_at: new Date().toISOString().split('T')[0],
    status: currentStatus,
    completed: false
  })

  // Reset depending on status
  if (currentStatus === 'backlog') newBacklogTask.value = ''
  if (currentStatus === 'todo') newTodoTask.value = ''
  if (currentStatus === 'inProgress') newInProgressTask.value = ''
}

function removeTask(task) {
  console.log(task)
  tasks.value = tasks.value.filter(t => t !== task)
}

const backlogTasks = computed(() => tasks.value.filter(t => !t.completed && t.status == 'backlog'))
const todoTasks = computed(() => tasks.value.filter(t => !t.completed && t.status == 'todo'))
const inProgressTasks = computed(() => tasks.value.filter(t => !t.completed && t.status == 'inProgress'))
const doneTasks = computed(() => tasks.value.filter(t => t.completed))
</script>

<template>
  <div class="min-h-screen bg-[#e8e8e8]">
    <DashboardHeader />

    <main class="w-full h-screen mx-auto py-6 sm:px-6 lg:px-8">
      <div class="w-full h-full pb-20 grid grid-cols-4 gap-4 cursor-default">
        <div class="bg-[#F5F4F4] border border-[#cccccc] rounded-lg px-4 py-3">
          <div class="flex items-center justify-between text-lg font-bold text-gray-900 mb-4">
            <h2>Backlog</h2>
            <Plus size="18" @click="toggleBacklogTask = !toggleBacklogTask" class="cursor-pointer" />
          </div>
          <div v-if="toggleBacklogTask" class="flex flex-col gap-2 mb-4">
            <input type="text" class="w-full p-2 border border-gray-300 rounded-md" id="addTask" name="addTask" required
              placeholder="Add new task" v-model="newBacklogTask" />
            <button @click="addTask('backlog', newBacklogTask)"
              class="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700">Add
              task</button>
          </div>
          <ul class="space-y-4 text-gray-600 text-base">
            <li v-for="task in backlogTasks" :key="task.id"
              class="flex items-center justify-start gap-2 bg-white rounded-[8px] px-3 py-2.5">
              <input type="checkbox" v-model="task.completed" />
              <span>{{ task.title }}</span>
              <button @click="removeTask(task)" class="text-red-400">
                <Trash2 size="15" />
              </button>
            </li>
          </ul>
        </div>

        <div class="bg-[#F5F4F4] border border-[#cccccc] rounded-lg px-4 py-3">
          <div class="flex items-center justify-between text-lg font-bold text-gray-900 mb-4">
            <h2>Todo</h2>
            <Plus size="18" @click="toggleTodoTask = !toggleTodoTask" class="cursor-pointer" />
          </div>
          <div v-if="toggleTodoTask" class="flex flex-col gap-2 mb-4">
            <input type="text" class="w-full p-2 border border-gray-300 rounded-md" id="addTask" name="addTask" required
              placeholder="Add new task" v-model="newTodoTask" />
            <button @click="addTask('todo', newTodoTask)" type="submit"
              class="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700">Add
              task</button>
          </div>
          <ul class="space-y-4 text-gray-600 text-base">
            <li v-for="task in todoTasks" :key="task.id"
              class="flex items-center justify-start gap-2 bg-white rounded-[8px] px-3 py-2.5">
              <input type="checkbox" class="mr-2" v-model="task.completed" />
              <span>{{ task.title }}</span>
              <button @click="removeTask(task)" class="text-red-400">
                <Trash2 size="15" />
              </button>
            </li>
          </ul>
        </div>

        <div class="bg-[#F5F4F4] border border-[#cccccc] rounded-lg px-4 py-3">
          <div class="flex items-center justify-between text-lg font-bold text-gray-900 mb-4">
            <h2>In progress</h2>
            <Plus size="18" @click="toggleInProgressTask = !toggleInProgressTask" class="cursor-pointer" />
          </div>
          <div v-if="toggleInProgressTask" class="flex flex-col gap-2 mb-4">
            <input type="text" class="w-full p-2 border border-gray-300 rounded-md" id="addTask" name="addTask" required
              placeholder="Add new task" v-model="newInProgressTask" />
            <button @click="addTask('inProgress', newInProgressTask)"
              class="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700">Add
              task</button>
          </div>
          <ul class="space-y-4 text-gray-600 text-base">
            <li v-for="task in inProgressTasks" :key="task.id"
              class="flex items-center justify-start gap-2 bg-white rounded-[8px] px-3 py-2.5">
              <input type="checkbox" class="mr-2" v-model="task.completed" />
              <span>{{ task.title }}</span>
              <button @click="removeTask(task)" class="text-red-400">
                <Trash2 size="15" />
              </button>
            </li>
          </ul>
        </div>

        <div class="bg-[#F5F4F4] border border-[#cccccc] rounded-lg px-4 py-3">
          <h2 class="text-lg font-bold text-gray-900 mb-4">Done</h2>
          <ul class="space-y-4 text-gray-600 text-base">
            <li v-for="task in doneTasks" :key="task.id"
              class="flex items-center justify-start gap-2 bg-white rounded-[8px] px-3 py-2.5 line-through">
              <input type="checkbox" class="mr-2" v-model="task.completed" />
              <span>{{ task.title }}</span>
            </li>
          </ul>
        </div>
      </div>
      <!-- <pre>
          {{ tasks }}
        </pre> -->
    </main>
  </div>
</template>