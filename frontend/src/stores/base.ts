import { defineStore } from 'pinia'
import { Notification } from '@/types/global'

export const useBaseStore = defineStore('base', {
  state: () => {
    return {
      isLoading: false as boolean,
      contracts: [] as string[],
      notifications: [] as Notification[],
      popupMessage: '' as string
    }
  },
  actions: {
    setContracts(contractNumber: string) {
      this.contracts.push(contractNumber)
    },
    pushNotification(notification: Notification) {
      this.notifications.push(notification)
    },
    removeNotification(notificationIndex: number) {
      this.notifications.splice(notificationIndex, 1)
    },
    setPopupMessage(message: string) {
      this.popupMessage = message
    }
  }
})
