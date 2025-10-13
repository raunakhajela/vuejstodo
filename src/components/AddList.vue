<script setup>
import { ref, computed, onMounted } from 'vue';
import { Check } from 'lucide-vue-next';

const newListName = ref('');
const newListColor = ref('rainbow');
const lastCustomColor = ref('rainbow');
const error = ref(null);
const colorPickerRef = ref(null);

const emit = defineEmits(['add-list', 'cancel']);

const availableColors = [
  { value: 'custom', name: 'Custom Color', isCustom: true },
  { value: '#f87171', name: 'Red', class: 'bg-red-400' },
  { value: '#4ade80', name: 'Green', class: 'bg-green-400' },
  { value: '#60a5fa', name: 'Blue', class: 'bg-blue-400' },
  { value: '#facc15', name: 'Yellow', class: 'bg-yellow-400' },
  { value: '#f472b6', name: 'Pink', class: 'bg-pink-400' },
  { value: '#22d3ee', name: 'Cyan', class: 'bg-cyan-400' },
];

// Get preset colors
const presetColors = availableColors.filter(c => !c.isCustom);

// Select random color on mount
onMounted(() => {
  const randomIndex = Math.floor(Math.random() * presetColors.length);
  newListColor.value = presetColors[randomIndex].value;
});

// Check if current color is custom (not in preset list and not rainbow)
const isCustomColor = computed(() => {
  return newListColor.value !== 'rainbow' &&
         !availableColors.some(c => c.value === newListColor.value && !c.isCustom);
});

// Check if custom button should show rainbow
const showRainbow = computed(() => {
  return lastCustomColor.value === 'rainbow';
});

function selectColor(colorValue, isCustom = false) {
  if (isCustom) {
    // Open native color picker directly
    colorPickerRef.value?.click();
  } else {
    newListColor.value = colorValue;
  }
}

function onColorChange(event) {
  // Update color in real-time as user selects
  newListColor.value = event.target.value;
  lastCustomColor.value = event.target.value; // Remember the custom color
}

function handleSubmit() {
  if (!newListName.value) {
    error.value = "List name cannot be empty";
    return;
  }

  // If rainbow is selected (user didn't pick custom color), use a default color
  const colorToSave = newListColor.value === 'rainbow' ? '#60a5fa' : newListColor.value;

  emit('add-list', {
    name: newListName.value,
    color: colorToSave
  })

  newListName.value = '';
  newListColor.value = 'rainbow';
  error.value = null;
}

function handleReset() {
  // Reset to defaults with random color
  newListName.value = '';

  // Select a new random color
  const randomIndex = Math.floor(Math.random() * presetColors.length);
  newListColor.value = presetColors[randomIndex].value;

  lastCustomColor.value = 'rainbow';
  error.value = null;
}
</script>

<template>
  <div class="flex flex-col gap-4 bg-white border border-zinc-200 rounded-md shadow-sm p-4 relative overflow-visible">
    <!-- Color Picker -->
    <div class="flex items-center justify-center gap-2">
      <div
        v-if="availableColors[0].isCustom"
        @click="selectColor(availableColors[0].value, true)"
        :style="showRainbow ? {} : { backgroundColor: lastCustomColor }"
        class="w-6 h-6 rounded-full transition-all cursor-pointer relative flex items-center justify-center"
        :class="showRainbow ? 'conic-gradient' : ''"
        :title="availableColors[0].name"
      >
        <Check
          v-if="newListColor === 'rainbow' || isCustomColor"
          :size="14"
          :stroke-width="3"
          class="text-white drop-shadow-sm"
          :class="{ 'text-gray-800': !showRainbow && (lastCustomColor === '#dddddd' || lastCustomColor === '#ffffff') }"
        />
      </div>

      <!-- Preset Colors -->
      <div
        v-for="color in availableColors.slice(1)"
        :key="color.value"
        @click="selectColor(color.value, color.isCustom)"
        class="w-6 h-6 rounded-full transition-all cursor-pointer relative flex items-center justify-center"
        :class="color.class"
        :title="color.name"
      >
        <Check
          v-if="newListColor === color.value"
          :size="14"
          :stroke-width="3"
          class="text-white drop-shadow-sm"
        />
      </div>
    </div>

    <input
      ref="colorPickerRef"
      type="color"
      @input="onColorChange"
      class="absolute opacity-0 pointer-events-none"
      style="left: 50%; top: 50%; transform: translate(-50%, -50%);"
    />

    <!-- List Name Input -->
    <input type="text" placeholder="List name" v-model="newListName" @keyup.enter="handleSubmit"
      class="px-3 py-2 text-sm border border-zinc-200 rounded-md focus:outline-none" />

    <!-- Action Buttons -->
    <div class="flex gap-2">
      <button @click="handleSubmit"
        class="flex-1 bg-emerald-700 hover:bg-emerald-800 text-white text-sm p-1 border border-transparent rounded-md">
        Create list
      </button>
      <button @click="handleReset"
        class="flex-1 bg-white hover:bg-zinc-50 text-zinc-700 text-sm p-1 border border-zinc-200 rounded-md">
        Reset
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
