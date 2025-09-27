<script setup>
import { RouterView } from 'vue-router'
// import { ref } from 'vue'

// const name = ref('John Doe')
// const email = ref('john@acme.org')
</script>

<template>
  <!-- <main class="min-h-screen flex items-center justify-center gap-8 p-4">
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
  </main> -->
  <!-- <nav>
    <RouterLink to="/auth">Auth</RouterLink>
    <RouterLink to="/dashboard">Dashboard</RouterLink>
  </nav> -->
  <RouterView />
</template>