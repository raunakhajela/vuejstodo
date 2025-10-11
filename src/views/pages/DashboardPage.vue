<script setup>
import { ref } from 'vue';
import { useCollection, useFirestore, useCurrentUser } from 'vuefire'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { Plus } from 'lucide-vue-next'
import TasksPage from './TasksPage.vue';

const db = useFirestore();
const user = useCurrentUser();
const loading = ref(false);
const error = ref(null);
const lists = useCollection(collection(db, 'lists'));
const newListName = ref('');
const newListColor = ref('#6366f1');
const toggleAddList = ref(false);

async function addList() {
  if (!user.value) {
    error.value = "User not authenticated";
    return;
  };

  if (!newListName.value) {
    error.value = "List name cannot be empty";
    return;
  };

  try {
    const newList = {
      name: newListName.value,
      owner: user.value.uid,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    const docRef = await addDoc(collection(db, 'lists'), newList);
    console.log("Document written with ID: ", docRef.id);

    newListName.value = '';
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

function cancel() {
  newListName.value = '';
}
</script>

<template>
  <div class="min-h-screen bg-zinc-50">
    <main class="w-full h-screen mx-auto p-4">
      <div class="w-full h-full flex gap-4 cursor-default">
        <div class="w-64 h-full flex flex-col gap-4">
          <!-- Header -->
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-semibold text-gray-900">Lists</h2>
            <Plus size="18" @click="toggleAddList = !toggleAddList" class="cursor-pointer" />
          </div>

          <!-- Create List Form -->
          <div v-if="toggleAddList"
            class="flex flex-col gap-4 bg-white border border-zinc-200 rounded-md shadow-sm p-4">
            <!-- Color Picker -->
            <div class="flex items-center justify-center gap-2">
              <div class="w-6 h-6 rounded-full conic-gradient transition-all"></div>
              <div class="w-6 h-6 rounded-full bg-red-400 border-transparent border-2 transition-all"></div>
              <div class="w-6 h-6 rounded-full bg-green-400 border-transparent border-2 transition-all"></div>
              <div class="w-6 h-6 rounded-full bg-blue-400 border-transparent border-2 transition-all"></div>
              <div class="w-6 h-6 rounded-full bg-yellow-400 border-transparent border-2 transition-all"></div>
              <div class="w-6 h-6 rounded-full bg-pink-400 border-transparent border-2 transition-all"></div>
              <div class="w-6 h-6 rounded-full bg-cyan-400 border-transparent border-2 transition-all"></div>
            </div>

            <!-- List Name Input -->
            <input type="text" placeholder="List name" v-model="newListName"
              class="px-3 py-2 text-sm border border-zinc-200 rounded-md focus:outline-none" />

            <!-- Action Buttons -->
            <div class="flex gap-2">
              <button @click="addList"
                class="flex-1 bg-emerald-700 hover:bg-emerald-800 text-white text-sm p-1 border border-transparent rounded-md">
                Create list
              </button>
              <button v-if="toggleAddList" @click="cancel"
                class="flex-1 bg-white hover:bg-transparent text-zinc-700 text-sm p-1 border border-zinc-200 rounded-md">
                Clear
              </button>
            </div>

            <div v-if="error" class="text-red-500 text-sm">{{ error }}</div>
          </div>

          <ul class="flex flex-col gap-2">
            <li v-for="list in lists"
              class="flex items-center justify-start gap-2 bg-transparent hover:bg-zinc-200 rounded-md px-2 py-1 cursor-pointer">
              <div class="w-3 h-3 rounded-sm bg-zinc-300"></div>
              <span class="text-sm text-zinc-700 hover:text-zinc-900">{{ list.name }}</span>
            </li>
          </ul>
        </div>
        <div class="w-full bg-white border border-zinc-200 rounded-lg shadow-sm">
          <TasksPage />
        </div>
      </div>
    </main>
  </div>
</template>

<style>
.conic-gradient {
  background: conic-gradient(from 90deg at 50% 50%, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #8b00ff, #ff0000);
}
</style>