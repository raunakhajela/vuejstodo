<script setup>
import { ref } from 'vue'
import { useCollection, useFirestore, useCurrentUser } from 'vuefire'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { Plus } from 'lucide-vue-next'
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

    toggleAddList.value = false
  } catch (e) {
    console.error("Error adding list: ", e)
  }
}

function handleCancel() {
  toggleAddList.value = false
}

function handleListClick(list) {
  console.log("List clicked:", list)
}
</script>

<template>
  <div class="w-64 h-full flex flex-col gap-4">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <h2 class="text-lg font-semibold text-gray-900">Lists</h2>
      <Plus
        size="18"
        @click="toggleAddList = !toggleAddList"
        class="cursor-pointer"
      />
    </div>

    <!-- Add List Form -->
    <AddList
      v-if="toggleAddList"
      @add-list="handleAddList"
      @cancel="handleCancel"
    />

    <!-- Lists -->
    <ul class="flex flex-col gap-2">
      <ListItem
        v-for="list in lists"
        :key="list.id"
        :list="list"
        @click="handleListClick"
      />
    </ul>
  </div>
</template>
