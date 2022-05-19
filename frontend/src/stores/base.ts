import { defineStore } from 'pinia'
import { Message } from '@/types/global'

export const useBaseStore = defineStore('base', {
  state: () => {
    return {
      isLoading: false as boolean,
      contracts: [] as string[],
      messages: [] as Message[],
      fullscreenMessage: '' as string
    }
  },
  actions: {
    setContracts(contractNumber: string) {
      this.contracts.push(contractNumber)
    },
    pushMessage(message: Message) {
      this.messages.push(message)
    },
    removeMessage(messageIndex: number) {
      this.messages.splice(messageIndex, 1)
    },
    setFullscreenMessage(message: string) {
      this.fullscreenMessage = message
    }
  }
})
