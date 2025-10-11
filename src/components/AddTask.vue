<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
    board: {
        type: String,
        required: true
    },
})

const emit = defineEmits(['onAddTask']);
const inputTitle = ref('');

const onAddTask = () => {
    if (inputTitle.value.trim() === '') return;
    emit('onAddTask', { title: inputTitle.value, status: props.board });
    inputTitle.value = '';
};
</script>

<template>
    <input type="text" class="px-3 py-2 text-sm border border-zinc-200 rounded-md focus:outline-none" id="addTask" name="addTask" required
        placeholder="Add new task" v-model="inputTitle" />
    <button @click="onAddTask" class="bg-emerald-700 hover:bg-emerald-800 text-white text-sm p-1 border border-transparent rounded-md">
        Add task</button>
</template>