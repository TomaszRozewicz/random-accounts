<script setup lang="ts">
import ContractActions from '../components/ContractActions.vue'
import ContractDetails from '../components/ContractDetails.vue'

import { ethers, Contract } from 'ethers'
import { ref, onBeforeMount, computed, Ref } from 'vue'
import { abi } from '../../../hardhat/artifacts/contracts/RandomAccounts.sol/RandomAccounts.json'
import { getSigner } from '@/utils/signer'
import { useRoute } from 'vue-router'
import VueInlineSvg from 'vue-inline-svg'

const route = useRoute()
const contractNumber = route.params.id.toString()
const manager = ref('')
const userAddress = ref('')
let contractInstance: Ref<Contract | undefined> = ref()
let participants = ref([])
let chosenParticipants = ref([])
let isContractOpen = ref(false)

const isUserParticipant = computed(() => {
  const result = participants.value.find((item) => {
    return item === userAddress.value
  })

  return !!result
})

const isUserManager = computed(() => {
  return manager.value === userAddress.value
})

const fetchContractInstance = async () => {
  const signer = await getSigner()

  userAddress.value = await signer.getAddress()
  contractInstance.value = await new ethers.Contract(
    contractNumber,
    abi,
    signer
  )
}

const fetchContractData = async () => {
  manager.value = await contractInstance.value?.manager()
  participants.value = await contractInstance.value?.getParticipants()
  chosenParticipants.value =
    await contractInstance.value?.getChosenParticipants()
  isContractOpen.value = await contractInstance.value?.isOpenForParticipation()
}

onBeforeMount(async () => {
  await fetchContractInstance()
  await fetchContractData()
})
</script>

<template>
  <div class="mb-4 flex items-center">
    <router-link to="/">
      <VueInlineSvg src="/arrow-left.svg" class="mr-2 h-5 text-gray-500" />
    </router-link>

    <h1 class="text-2xl font-bold">Contract details</h1>
  </div>

  <ContractDetails
    :contract-number="contractNumber"
    :is-user-participant="isUserParticipant"
    :is-user-manager="isUserManager"
    :manager="manager"
    :participants="participants"
    :chosen-participants="chosenParticipants"
  />

  <ContractActions
    :contract-number="contractNumber"
    :is-user-participant="isUserParticipant"
    :is-user-manager="isUserManager"
    :is-contract-open="isContractOpen"
    @fetchContractData="fetchContractData"
  />
</template>
