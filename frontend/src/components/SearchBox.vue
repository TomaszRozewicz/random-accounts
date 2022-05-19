<script setup lang="ts">
declare let window: any

import { ethers } from 'ethers'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
let contractAddress = ref('')
let isContractExists = ref()

const fetchContractInstance = async () => {
  try {
    const provider = await new ethers.providers.Web3Provider(window.ethereum)
    await provider.getCode(contractAddress.value)
    await router.push({
      name: 'contract',
      params: { id: contractAddress.value }
    })
  } catch (error: any) {
    isContractExists.value = false
    console.error(error)
  }
}
</script>

<template>
  <div class="w-full text-center md:flex md:items-center">
    <input
      v-model="contractAddress"
      type="text"
      placeholder="Type contract address"
      class="mb-4 w-full flex-1 rounded-lg border border-gray-200 p-2 text-base focus:outline-none md:mb-0 md:rounded-r-none md:p-4"
    />

    <button
      type="button"
      class="rounded-lg border border-blue-600 bg-blue-600 py-2 px-3 text-center text-base font-semibold text-white outline-none transition duration-200 ease-in hover:bg-blue-700 md:rounded-l-none md:py-4 md:px-6"
      @click="fetchContractInstance"
    >
      Search
    </button>
  </div>

  <p v-if="isContractExists === false" class="mt-3 text-sm text-red-700">
    Contract doesn't exist.
  </p>
</template>
