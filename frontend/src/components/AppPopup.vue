<script setup lang="ts">
import VueInlineSvg from 'vue-inline-svg'
import { useBaseStore } from '@/stores/base'

const baseStore = useBaseStore()
</script>

<template>
  <div>
    <div class="absolute h-full w-full bg-blue-600 text-white">
      <div
        class="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 transform text-center"
      >
        <div class="mb-6 flex justify-center">
          <VueInlineSvg
            src="/spin.svg"
            class="h-20 w-20 animate-spin text-white"
          />
        </div>

        <span class="text-xl">
          {{ baseStore.popupMessage }}
        </span>
      </div>
    </div>
  </div>
</template>
