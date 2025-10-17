<script setup>
import { computed } from 'vue';
import { Trash2 } from 'lucide-vue-next';
  ;

const props = defineProps({
  list: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['click', 'remove']);

// If list doesn't have a color, use a fallback
const listColor = computed(() => {
  return props.list.color || '#dddddd';
})

// Function to determine if color is rainbow gradient
function isRainbow(color) {
  return color === 'rainbow'
}
</script>

<template>
  <li @click="emit('click', list)"
    class="flex justify-between bg-transparent hover:bg-zinc-200 rounded-md px-2 py-1 cursor-pointer">
    <div class="flex items-center gap-2">
      <div class="w-3 h-3 rounded-sm" :class="{ 'conic-gradient': isRainbow(listColor) }"
        :style="!isRainbow(listColor) ? { backgroundColor: listColor } : {}"></div>
      <span class="text-sm text-zinc-700 hover:text-zinc-900">{{ list.name }}</span>
    </div>
    <button @click="emit('remove', list)" class="text-red-400">
      <Trash2 size="15" />
    </button>
  </li>
</template>

<style scoped>
.conic-gradient {
  background: conic-gradient(from 90deg at 50% 50%, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #8b00ff, #ff0000);
}
</style>
