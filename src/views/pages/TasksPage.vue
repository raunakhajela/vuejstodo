<script setup>
import { ref, computed } from 'vue'
import { useCollection, useFirestore, useCurrentUser } from 'vuefire'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import AddTask from '@/components/AddTask.vue'
import TaskCard from '@/components/TaskCard.vue'
import { Plus } from 'lucide-vue-next'

const db = useFirestore();
const user = useCurrentUser();
const loading = ref(false);
const error = ref(null);
const tasks = useCollection(collection(db, 'tasks'));
const newListName = ref('')

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

async function addTask({ title, status }) {
  console.log(title, status);

  try {
    const newTask = {
      title,
      status,
      completed: false,
      owner: user.value.uid,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    const docRef = await addDoc(collection(db, 'tasks'), newTask);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
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
  <div>
    <main class="w-full py-6 sm:px-6 lg:px-8">
      <div class="w-full grid grid-cols-4 gap-6 cursor-default">

        <div v-for="board in listBoards" :key="board.key"
          class="">
          <div class="flex items-center justify-between text-lg font-bold text-gray-900 mb-4">
            <h2>{{ board.title }}</h2>
            <Plus size="18" @click="toggleTaskInput[board.key] = !toggleTaskInput[board.key]" class="cursor-pointer" />
          </div>
          <div v-if="toggleTaskInput[board.key]" class="flex flex-col gap-2 mb-4">
            <AddTask @on-add-task="addTask" :board="board.key" />
          </div>
          <ul class="space-y-4 text-gray-600 text-base">
            <TaskCard v-for="task in taskByStatus[board.key]" :key="task.id" :task="task"
              @update:completed="task.completed = $event" @remove="removeTask" />
          </ul>
        </div>

      </div>
    </main>
  </div>
</template>