<script setup lang="ts">
import AppPopup from './components/AppPopup.vue'
import AppNotifications from './components/AppNotifications.vue'
import { useBaseStore } from '@/stores/base'
import { onBeforeMount } from 'vue'
import { getSigner } from '@/utils/signer'

const baseStore = useBaseStore()

onBeforeMount(async () => {
  try {
    await getSigner()
  } catch (error: any) {
    baseStore.setPopupMessage(
      'There is a problem with connection to your metamask wallet. Please make sure that you have metamask properly installed and refresh the page.'
    )
    console.error(error)
  }
})
</script>

<template>
  <AppNotifications v-if="baseStore.notifications.length" />

  <AppPopup v-if="baseStore.popupMessage" />

  <div
    class="min-w-24 flex min-h-screen w-full items-center justify-center bg-gray-100"
  >
    <div class="flex max-w-full rounded-lg bg-white p-6 shadow">
      <div>
        <RouterView />
      </div>
    </div>
  </div>
</template>
