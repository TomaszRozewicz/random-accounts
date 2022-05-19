<script setup lang="ts">
import { ethers, Contract } from 'ethers'
import { ref, Ref, onBeforeMount, defineProps, defineEmits } from 'vue'
import { abi } from '../../../hardhat/artifacts/contracts/RandomAccounts.sol/RandomAccounts.json'
import { getSigner } from '@/utils/signer'
import { useBaseStore } from '@/stores/base'

const props = defineProps({
  contractNumber: {
    type: String,
    default: ''
  },
  isUserParticipant: {
    type: Boolean,
    default: false
  },
  isUserManager: {
    type: Boolean,
    default: false
  },
  isContractOpen: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['fetchContractData'])
const baseStore = useBaseStore()
let contractInstance: Ref<Contract | undefined> = ref()

const fetchContractInstance = async () => {
  const signer = await getSigner()

  contractInstance.value = await new ethers.Contract(
    props.contractNumber,
    abi,
    signer
  )
}

const join = async () => {
  try {
    baseStore.setPopupMessage(
      'Please confirm transaction in your metamask wallet'
    )

    const transaction = await contractInstance.value?.join()

    baseStore.setPopupMessage('Joining to lottery')
    await transaction.wait()
    await emit('fetchContractData')
    baseStore.pushNotification({
      text: 'You joined to lottery',
      type: 'success'
    })
  } catch (error: any) {
    baseStore.pushNotification({
      text: error?.error?.message ?? 'Problem occured. Please try again',
      type: 'error'
    })
  } finally {
    baseStore.setPopupMessage('')
  }
}

const leave = async () => {
  try {
    baseStore.setPopupMessage(
      'Please confirm transaction in your metamask wallet'
    )

    const transaction = await contractInstance.value?.leave()

    baseStore.setPopupMessage('Leaving lottery')
    await transaction.wait()
    await emit('fetchContractData')
    baseStore.pushNotification({
      text: 'You left lottery',
      type: 'success'
    })
  } catch (error: any) {
    baseStore.pushNotification({
      text: error?.error?.message ?? 'Problem occured. Please try again',
      type: 'error'
    })
  } finally {
    baseStore.setPopupMessage('')
  }
}

const reset = async () => {
  try {
    baseStore.setPopupMessage(
      'Please confirm transaction in your metamask wallet'
    )

    const transaction = await contractInstance.value?.reset()

    baseStore.setPopupMessage('Resetting lottery')
    await transaction.wait()
    await emit('fetchContractData')
    baseStore.pushNotification({
      text: 'You reset lottery',
      type: 'success'
    })
  } catch (error: any) {
    baseStore.pushNotification({
      text: error?.message ?? 'Problem occured. Please try again',
      type: 'error'
    })
  } finally {
    baseStore.setPopupMessage('')
  }
}

const draw = async () => {
  try {
    baseStore.setPopupMessage(
      'Please confirm transaction in your metamask wallet'
    )

    const transaction = await contractInstance.value?.drawParticipant()

    baseStore.setPopupMessage('Drawing participant')
    await transaction.wait()
    await emit('fetchContractData')
    baseStore.pushNotification({
      text: 'You drew participant',
      type: 'success'
    })
  } catch (error: any) {
    baseStore.pushNotification({
      text: 'Problem occured. Please try again',
      type: 'error'
    })
  } finally {
    baseStore.setPopupMessage('')
  }
}

onBeforeMount(async () => {
  await fetchContractInstance()
})
</script>

<template>
  <div>
    <p class="mb-4 font-bold">Available actions:</p>

    <div>
      <button
        v-if="!props.isUserParticipant && props.isContractOpen"
        type="button"
        class="mr-2 mb-2 rounded-lg bg-blue-600 py-2 px-4 text-center text-base font-semibold text-white shadow-md transition duration-200 ease-in hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200"
        @click="join"
      >
        Join
      </button>

      <button
        v-if="props.isUserParticipant && props.isContractOpen"
        type="button"
        class="mr-2 mb-2 rounded-lg bg-blue-600 py-2 px-4 text-center text-base font-semibold text-white shadow-md transition duration-200 ease-in hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200"
        @click="leave"
      >
        Leave
      </button>

      <button
        v-if="props.isUserManager"
        type="button"
        class="mr-2 mb-2 rounded-lg bg-blue-600 py-2 px-4 text-center text-base font-semibold text-white shadow-md transition duration-200 ease-in hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200"
        @click="reset"
      >
        Reset contract
      </button>

      <button
        v-if="props.isUserManager"
        type="button"
        class="mr-2 mb-2 rounded-lg bg-blue-600 py-2 px-4 text-center text-base font-semibold text-white shadow-md transition duration-200 ease-in hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200"
        @click="draw"
      >
        Draw participant
      </button>
    </div>
  </div>
</template>
