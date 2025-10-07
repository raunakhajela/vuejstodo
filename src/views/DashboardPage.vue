<script setup>
import { ref, computed } from 'vue'
import DashboardHeader from '@/components/DashboardHeader.vue'
import AddTask from '@/components/AddTask.vue'
import TaskCard from '@/components/TaskCard.vue'
import { Plus } from 'lucide-vue-next'

const toggleTaskInput = ref({ BACKLOG: false, TODO: false, INPROGRESS: false })

const listBoards = ref([
  {
    key: "BACKLOG",
    title: "Backlog",
  },
  {
    key: "TODO",
    title: "Todo",
  },
  {
    key: "INPROGRESS",
    title: "In Progress",
  },
  {
    key: "DONE",
    title: "Done",
  }
]);

const tasks = ref([
  {
    "id": 1,
    "title": "Buy groceries",
    "created_at": "2025-09-01",
    "status": "BACKLOG",
    "completed": false
  },
  {
    "id": 2,
    "title": "Call the dentist",
    "created_at": "2025-09-02",
    "status": "TODO",
    "completed": false
  },
  {
    "id": 3,
    "title": "Clean the kitchen",
    "created_at": "2025-09-03",
    "status": "INPROGRESS",
    "completed": false
  },
  {
    "id": 4,
    "title": "Finish reading a book",
    "created_at": "2025-09-04",
    "status": "BACKLOG",
    "completed": true
  },
  {
    "id": 5,
    "title": "Water the plants",
    "created_at": "2025-09-05",
    "status": "TODO",
    "completed": false
  },
  {
    "id": 6,
    "title": "Pay electricity bill",
    "created_at": "2025-09-06",
    "status": "INPROGRESS",
    "completed": false
  },
  {
    "id": 7,
    "title": "Organize closet",
    "created_at": "2025-09-07",
    "status": "BACKLOG",
    "completed": false
  },
  {
    "id": 8,
    "title": "Take the car for service",
    "created_at": "2025-09-08",
    "status": "TODO",
    "completed": true
  },
  {
    "id": 9,
    "title": "Plan weekend trip",
    "created_at": "2025-09-09",
    "status": "INPROGRESS",
    "completed": false
  },
  {
    "id": 10,
    "title": "Buy birthday gift",
    "created_at": "2025-09-10",
    "status": "BACKLOG",
    "completed": false
  },
  {
    "id": 11,
    "title": "Cook dinner for friends",
    "created_at": "2025-09-11",
    "status": "TODO",
    "completed": false
  },
  {
    "id": 12,
    "title": "Do laundry",
    "created_at": "2025-09-12",
    "status": "INPROGRESS",
    "completed": true
  },
  {
    "id": 13,
    "title": "Fix leaking tap",
    "created_at": "2025-09-13",
    "status": "BACKLOG",
    "completed": false
  },
  {
    "id": 14,
    "title": "Go for a morning walk",
    "created_at": "2025-09-14",
    "status": "TODO",
    "completed": true
  },
  {
    "id": 15,
    "title": "Write journal entry",
    "created_at": "2025-09-15",
    "status": "INPROGRESS",
    "completed": false
  },
  {
    "id": 16,
    "title": "Buy new shoes",
    "created_at": "2025-09-16",
    "status": "BACKLOG",
    "completed": false
  },
  {
    "id": 17,
    "title": "Update resume",
    "created_at": "2025-09-17",
    "status": "TODO",
    "completed": false
  },
  {
    "id": 18,
    "title": "Clean laptop screen",
    "created_at": "2025-09-18",
    "status": "INPROGRESS",
    "completed": true
  },
  {
    "id": 19,
    "title": "Call parents",
    "created_at": "2025-09-19",
    "status": "BACKLOG",
    "completed": false
  },
  {
    "id": 20,
    "title": "Practice guitar",
    "created_at": "2025-09-20",
    "status": "TODO",
    "completed": false
  }
]);

function addTask({title, status}) {
  console.log(title, status);
  tasks.value.push({
    id: tasks.value.length + 1,
    title,
    created_at: new Date().toISOString().split('T')[0],
    status,
    completed: false
  })
  console.log(tasks.value)
}

function removeTask(task) {
  console.log(task)
  tasks.value = tasks.value.filter(t => t !== task)
}

const taskByStatus = computed(() => ({
  BACKLOG: tasks.value.filter(t => !t.completed && t.status == 'BACKLOG'),
  TODO: tasks.value.filter(t => !t.completed && t.status == 'TODO'),
  INPROGRESS: tasks.value.filter(t => !t.completed && t.status == 'INPROGRESS'),
  DONE: tasks.value.filter(t => t.completed)
}))
</script>

<template>
  <div class="min-h-screen bg-[#e8e8e8]">
    <DashboardHeader />

    <main class="w-full h-screen mx-auto py-6 sm:px-6 lg:px-8">
      <div class="w-full h-full pb-20 grid grid-cols-4 gap-4 cursor-default">

        <div v-for="board in listBoards" :key="board.key"
          class="bg-[#F5F4F4] border border-[#cccccc] rounded-lg px-4 py-3">
          <div class="flex items-center justify-between text-lg font-bold text-gray-900 mb-4">
            <h2>{{ board.title }}</h2>
            <Plus size="18" @click="toggleTaskInput[board.key] = !toggleTaskInput[board.key]" class="cursor-pointer" />
          </div>
          <div v-if="toggleTaskInput[board.key]" class="flex flex-col gap-2 mb-4">
            <AddTask @on-add-task="addTask" :board="board.key" />
          </div>
          <ul class="space-y-4 text-gray-600 text-base">
            <TaskCard
              v-for="task in taskByStatus[board.key]"
              :key="task.id"
              :task="task"
              @update:completed="task.completed = $event"
              @remove="removeTask"
            />
          </ul>
        </div>

      </div>
      <!-- <pre>
          {{ tasks }}
        </pre> -->
    </main>
  </div>
</template>