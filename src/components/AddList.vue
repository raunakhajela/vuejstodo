<script setup>
import { ref } from 'vue';

const newListName = ref('');
const newListColor = ref('rainbow');
const error = ref(null);

const emit = defineEmits(['add-list', 'cancel']);

const availableColors = [
  { value: 'rainbow', name: 'Rainbow', class: 'conic-gradient' },
  { value: '#f87171', name: 'Red', class: 'bg-red-400' },
  { value: '#4ade80', name: 'Green', class: 'bg-green-400' },
  { value: '#60a5fa', name: 'Blue', class: 'bg-blue-400' },
  { value: '#facc15', name: 'Yellow', class: 'bg-yellow-400' },
  { value: '#f472b6', name: 'Pink', class: 'bg-pink-400' },
  { value: '#22d3ee', name: 'Cyan', class: 'bg-cyan-400' },
];

function selectColor(colorValue) {
  newListColor.value = colorValue;
}

function handleSubmit() {
  if (!newListName.value) {
    error.value = "List name cannot be empty";
    return;
  }

  emit('add-list', {
    name: newListName.value,
    color: newListColor.value
  })

  newListName.value = '';
  newListColor.value = 'rainbow';
  error.value = null;
}

function handleCancel() {
  newListName.value = '';
  newListColor.value = 'rainbow';
  error.value = null;
  emit('cancel')
}
</script>

<template>
  <div class="flex flex-col gap-4 bg-white border border-zinc-200 rounded-md shadow-sm p-4">
    <!-- Color Picker -->
    <div class="flex items-center justify-center gap-2">
      <div v-for="color in availableColors" :key="color.value" @click="selectColor(color.value)" :class="[
        'w-6 h-6 rounded-full border-2 transition-all cursor-pointer',
        color.class,
        newListColor === color.value ? 'border-gray-800 scale-110' : 'border-transparent'
      ]" :title="color.name"></div>
    </div>

    <!-- List Name Input -->
    <input type="text" placeholder="List name" v-model="newListName" @keyup.enter="handleSubmit"
      class="px-3 py-2 text-sm border border-zinc-200 rounded-md focus:outline-none" />

    <!-- Action Buttons -->
    <div class="flex gap-2">
      <button @click="handleSubmit"
        class="flex-1 bg-emerald-700 hover:bg-emerald-800 text-white text-sm p-1 border border-transparent rounded-md">
        Create list
      </button>
      <button @click="handleCancel"
        class="flex-1 bg-white hover:bg-transparent text-zinc-700 text-sm p-1 border border-zinc-200 rounded-md">
        Clear
      </button>
    </div>

    <div v-if="error" class="text-red-500 text-sm">{{ error }}</div>
  </div>
</template>

<style scoped>
.conic-gradient {
  background: conic-gradient(from 90deg at 50% 50%, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #8b00ff, #ff0000);
}
</style>
