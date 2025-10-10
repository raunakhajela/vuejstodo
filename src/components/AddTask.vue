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
    <input type="text" class="w-full p-2 border border-gray-300 rounded-md" id="addTask" name="addTask" required
        placeholder="Add new task" v-model="inputTitle" />
    <button @click="onAddTask" class="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700">Add
        task</button>
</template>