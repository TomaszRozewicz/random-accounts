<script setup lang="ts">
import { ethers } from 'ethers'
import {
  abi,
  bytecode
} from '../../../hardhat/artifacts/contracts/RandomAccounts.sol/RandomAccounts.json'
import { getSigner } from '@/utils/signer'
import { useBaseStore } from '@/stores/base'

const baseStore = useBaseStore()

const createContract = async () => {
  try {
    baseStore.setPopupMessage(
      'Please confirm transaction in your metamask wallet'
    )

    const signer = await getSigner()
    const Contract = await new ethers.ContractFactory(abi, bytecode, signer)
    let contract = await Contract.deploy()

    baseStore.setPopupMessage('Deploying contract')
    await contract.deployed()
    baseStore.pushNotification({
      text: 'Contract deployed',
      type: 'success'
    })
    baseStore.setContracts(contract.address)
  } catch (error: any) {
    baseStore.pushNotification({
      text: error.message,
      type: 'error'
    })
    console.error(error)
  } finally {
    baseStore.setPopupMessage('')
  }
}
</script>

<template>
  <div class="mx-auto flex w-full justify-center">
    <button
      type="button"
      class="rounded-lg bg-blue-600 py-2 px-3 text-center text-base font-semibold text-white shadow-md transition duration-200 ease-in hover:bg-blue-700 md:py-4 md:px-6"
      @click="createContract"
    >
      Create contract
    </button>
  </div>
</template>
