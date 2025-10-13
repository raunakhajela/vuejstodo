<script setup>
import Sidebar from '@/components/Sidebar.vue'
import TasksPage from './TasksPage.vue'
</script>

<template>
  <div class="min-h-screen bg-zinc-50">
    <main class="w-full h-screen mx-auto p-4">
      <div class="w-full h-full flex gap-4 cursor-default">
        <Sidebar />
        <div class="w-full bg-white border border-zinc-200 rounded-lg shadow-sm">
          <TasksPage />
        </div>
      </div>
    </main>
  </div>
</template>