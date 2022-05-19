<script setup lang="ts">
import NewContractButton from '../components/NewContractButton.vue'
import ContractsTable from '../components/ContractsTable.vue'
import SearchBox from '../components/SearchBox.vue'
import { useBaseStore } from '@/stores/base'

const props = useBaseStore()
</script>

<template>
  <h1 class="mb-4 text-2xl font-bold">My Contracts</h1>

  <ContractsTable :contracts="props" />

  <NewContractButton />

  <p class="my-4 text-center">or</p>

  <SearchBox />
</template>
