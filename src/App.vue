<script setup>
import { onMounted } from "vue";
import { useAuth } from "./composables/useAuth";

const { initializeAuth } = useAuth();

onMounted(() => {
  initializeAuth();
});
</script>

<template>
  <RouterView />
</template>