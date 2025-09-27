<script setup>
defineProps({
  msg: {
    type: String,
    required: true,
  },
})

import { ref } from 'vue'

const name = ref('John Doe')
const email = ref('john@acme.org')
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>
      You’ve successfully created a project with
      <a href="https://vite.dev/" target="_blank" rel="noopener">Vite</a> +
      <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>.
    </h3>
  </div>
  <main class="min-h-screen flex items-center justify-center gap-8 p-4">
    <form action="" class="flex flex-col gap-4 text-white">
      <div class="flex flex-col gap-2">
        <label for="name">Your full name*</label>
        <input class="text-black" type="text" :placeholder="name" v-model="name" />
      </div>
      <div class="flex flex-col gap-2">
        <label for="email">Your email*</label>
        <input class="text-black" type="email" :placeholder="email" v-model="email" />
      </div>
    </form>
    <aside>
      <p>{{ name }}</p>
      <p>{{ email }}</p>
    </aside>
  </main>
  <nav>
    <RouterLink to="/auth">Auth</RouterLink>
    <RouterLink to="/dashboard">Dashboard</RouterLink>
  </nav>
</template>
