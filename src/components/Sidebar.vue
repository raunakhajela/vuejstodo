<script setup>
import { ref } from 'vue'
import { useCollection, useFirestore, useCurrentUser } from 'vuefire'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { Plus, Minus } from 'lucide-vue-next'
import AddList from './AddList.vue'
import ListItem from './ListItem.vue'

const db = useFirestore()
const user = useCurrentUser()
const lists = useCollection(collection(db, 'lists'))
const toggleAddList = ref(false)

async function handleAddList({ name, color }) {
  if (!user.value) {
    console.error("User not authenticated")
    return
  }

  try {
    const newList = {
      name,
      color,
      owner: user.value.uid,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }

    const docRef = await addDoc(collection(db, 'lists'), newList)
    console.log("List created with ID: ", docRef.id)
  } catch (e) {
    console.error("Error adding list: ", e)
  }
}

function handleListClick(list) {
  console.log("List clicked:", list)
}
</script>

<template>
  <div class="w-64 h-full flex flex-col gap-4 flex-shrink-0 overflow-hidden">
    <!-- Header -->
    <div class="flex items-center justify-between flex-shrink-0">
      <h2 class="text-lg font-semibold text-gray-900">Lists</h2>
      <Plus
        v-if="!toggleAddList"
        size="18"
        @click="toggleAddList = !toggleAddList"
        class="cursor-pointer hover:text-gray-600 transition-colors"
      />
      <Minus
        v-else
        size="18"
        @click="toggleAddList = !toggleAddList"
        class="cursor-pointer hover:text-gray-600 transition-colors"
      />
    </div>

    <transition
      enter-active-class="transition-all duration-200 ease-out"
      enter-from-class="opacity-0 transform -translate-y-2"
      enter-to-class="opacity-100 transform translate-y-0"
      leave-active-class="transition-all duration-150 ease-in"
      leave-from-class="opacity-100 transform translate-y-0"
      leave-to-class="opacity-0 transform -translate-y-2"
    >
      <div v-if="toggleAddList" class="flex-shrink-0">
        <AddList @add-list="handleAddList" />
      </div>
    </transition>

    <!-- Lists -->
    <div class="flex-1 overflow-y-auto overflow-x-hidden min-h-0 custom-scrollbar">
      <ul class="flex flex-col gap-2 pr-2">
        <ListItem
          v-for="list in lists"
          :key="list.id"
          :list="list"
          @click="handleListClick"
        />
      </ul>
    </div>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 0px;
  display: none;
}

.custom-scrollbar {
  scrollbar-width: none;
  -ms-overflow-style: none;
}
</style>
