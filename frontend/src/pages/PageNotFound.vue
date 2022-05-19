<script setup lang="ts">
import { useBaseStore } from '@/stores/base'

const props = useBaseStore()
</script>

<template>
  <div class="w-full min-w-64 md:min-w-120">
    <h1 class="mb-4 text-2xl font-bold">Page not found</h1>

    <p class="mb-4 md:mb-12">Page doesn't exist.</p>

    <div class="flex justify-center">
      <router-link
        to="/"
        class="inline-flex rounded-lg bg-blue-600 py-2 px-3 text-center text-base font-semibold text-white shadow-md transition duration-200 ease-in hover:bg-blue-700 md:py-4 md:px-6"
      >
        Back To Home
      </router-link>
    </div>
  </div>
</template>
