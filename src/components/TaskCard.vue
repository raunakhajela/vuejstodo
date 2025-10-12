<script setup>
import { Trash2 } from 'lucide-vue-next'

const props = defineProps({
  task: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update:completed', 'remove'])
</script>

<template>
  <li class="flex items-center justify-start gap-2 bg-zinc-100 hover:bg-zinc-200 rounded-md px-2 py-1">
    <input type="checkbox" :checked="task.completed" @change="emit('update:completed', !task.completed)" />
    <span>{{ task.title }}</span>
    <button @click="emit('remove', task)" class="text-red-400">
      <Trash2 size="15" />
    </button>
  </li>
</template>
