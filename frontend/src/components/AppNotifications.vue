<script setup lang="ts">
import VueInlineSvg from 'vue-inline-svg'
import { useBaseStore } from '@/stores/base'

const baseStore = useBaseStore()
</script>

<template>
  <div class="absolute right-0 p-4">
    <div
      v-for="(item, index) in baseStore.notifications"
      :key="index"
      :class="`
        mb-4 flex w-72 items-center justify-between rounded-lg p-4
        ${item.type === 'success' ? 'bg-green-200 text-green-700' : ''}
        ${item.type === 'error' ? 'bg-red-200 text-red-700' : ''}
      `"
    >
      <div class="text-sm font-medium">
        {{ item.text }}
      </div>

      <button
        type="button"
        :class="`
          ml-3 inline-flex h-8 w-8 rounded-lg p-1.5
          ${item.type === 'success' ? 'text-green-500 hover:bg-green-200' : ''}
          ${item.type === 'error' ? 'text-red-500 hover:bg-red-200' : ''}
        `"
        @click="baseStore.removeNotification(index)"
      >
        <span class="sr-only">Close</span>

        <VueInlineSvg src="/close.svg" class="h-5 w-5 text-green-500" />
      </button>
    </div>
  </div>
</template>
