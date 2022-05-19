<script setup lang="ts">
import { useBaseStore } from '@/stores/base'

const baseStore = useBaseStore()
</script>

<template>
  <div class="mb-4 max-w-full">
    <table
      v-if="baseStore.contracts.length"
      class="max-w-full rounded-lg leading-normal shadow"
    >
      <thead>
        <tr>
          <th
            scope="col"
            class="border-b border-gray-200 bg-white px-3 py-3 text-left text-sm font-normal uppercase text-gray-800 md:px-5"
          >
            #
          </th>
          <th
            scope="col"
            class="border-b border-gray-200 bg-white px-3 py-3 text-left text-sm font-normal uppercase text-gray-800 md:px-5"
          >
            Contract
          </th>
          <th
            scope="col"
            class="border-b border-gray-200 bg-white px-3 py-3 text-left text-sm font-normal uppercase text-gray-800 md:px-5"
          >
            Actions
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(contract, key) in baseStore.contracts" :key="key">
          <td
            class="border-b border-gray-200 bg-white px-3 py-3 text-sm md:px-5"
          >
            {{ key + 1 }}
          </td>
          <td
            class="break-all border-b border-gray-200 bg-white px-3 py-3 text-sm md:px-5"
          >
            {{ contract }}
          </td>
          <td
            class="border-b border-gray-200 bg-white px-3 py-3 text-sm md:px-5"
          >
            <router-link
              :to="`/contracts/${contract}`"
              class="text-blue-600 hover:text-blue-700"
            >
              Edit
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-else>
      There is no any contract yet. Click "Create Contract" to create one.
    </div>
  </div>
</template>
