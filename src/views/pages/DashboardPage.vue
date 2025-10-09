<script setup>
import DashboardHeader from '@/components/DashboardHeader.vue'

</script>

<template>
  <div class="min-h-screen bg-[#e8e8e8]">
    <DashboardHeader />

    <main class="w-full h-screen mx-auto py-6 sm:px-6 lg:px-8">
      <div class="w-full h-full pb-20 flex gap-4 cursor-default">
        <div class="w-1/5 bg-white border-r border-gray-200 h-fit flex flex-col">
          <!-- Header -->
          <div class="p-4 border-b border-gray-200">
            <div class="flex items-center justify-between">
              <h2 class="text-lg font-semibold text-gray-900">Lists</h2>
            </div>
          </div>

          <!-- Create List Form -->
          <div class="p-4 border-b border-gray-200 bg-gray-50">
            <div class="space-y-3">
              <!-- Color Picker -->
              <div class="flex gap-2">
                <div class="w-6 h-6 rounded-full conic-gradient transition-all"></div>
                <div class="w-6 h-6 rounded-full bg-red-400 border-transparent border-2 transition-all"></div>
                <div class="w-6 h-6 rounded-full bg-green-400 border-transparent border-2 transition-all"></div>
                <div class="w-6 h-6 rounded-full bg-blue-400 border-transparent border-2 transition-all"></div>
                <div class="w-6 h-6 rounded-full bg-yellow-400 border-transparent border-2 transition-all"></div>
                <div class="w-6 h-6 rounded-full bg-pink-400 border-transparent border-2 transition-all"></div>
                <div class="w-6 h-6 rounded-full bg-cyan-400 border-transparent border-2 transition-all"></div>
                <div class="w-6 h-6 rounded-full bg-purple-400 border-transparent border-2 transition-all"></div>
                <div class="w-6 h-6 rounded-full bg-violet-400 border-transparent border-2 transition-all"></div>
                <div class="w-6 h-6 rounded-full bg-fuchsia-400 border-transparent border-2 transition-all"></div>
              </div>

              <!-- List Name Input -->
              <input type="text" placeholder="List name"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />

              <!-- Action Buttons -->
              <div class="flex gap-2">
                <button class="flex-1 bg-indigo-600 text-white px-3 py-1.5 rounded-md hover:bg-indigo-700 text-sm">
                  Create List
                </button>
                <button
                  class="flex-1 border border-gray-300 text-gray-700 px-3 py-1.5 rounded-md hover:bg-gray-50 text-sm">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="w-4/5">
          <ul class="grid grid-cols-4 gap-4">
            <li class="flex items-center justify-start gap-2 bg-white rounded-[8px] px-3 py-2.5">
              <span>All Lists</span>
            </li>
          </ul>
        </div>
      </div>
    </main>
  </div>
</template>

<style>
.conic-gradient {
  background: conic-gradient(from 90deg at 50% 50%, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #8b00ff, #ff0000);
}
</style>