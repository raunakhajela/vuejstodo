<script setup>
const props = defineProps({
  list: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['click'])
</script>

<template>
  <li
    @click="emit('click', list)"
    class="flex items-center justify-start gap-2 bg-transparent hover:bg-zinc-200 rounded-md px-2 py-1 cursor-pointer">
    <div class="w-3 h-3 rounded-sm bg-zinc-300"></div>
    <span class="text-sm text-zinc-700 hover:text-zinc-900">{{ list.name }}</span>
  </li>
</template>
