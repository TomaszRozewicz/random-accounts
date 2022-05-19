<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  contractNumber: {
    type: String,
    default: ''
  },
  manager: {
    type: String,
    default: ''
  },
  participants: {
    type: Array,
    default: []
  },
  chosenParticipants: {
    type: Array,
    default: []
  },
  isUserParticipant: {
    type: Boolean,
    default: false
  },
  isUserManager: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <p class="mb-4 break-all text-gray-500">
    Contract no. {{ props.contractNumber }}
  </p>

  <div class="mb-4">
    <p v-if="props.isUserManager">You are contract manager.</p>

    <p v-else>
      <strong> Contract manager: </strong>

      <span>
        {{ props.manager }}
      </span>
    </p>

    <p v-if="props.isUserParticipant">You are participant.</p>
  </div>

  <div class="mt-4 mb-4">
    <template v-if="props.participants.length">
      <p class="font-bold">All Participants:</p>

      <div
        v-for="(participant, key) in props.participants"
        :key="key"
        class="break-all"
      >
        {{ participant }}
      </div>
    </template>

    <p v-else>There is no participants yet.</p>
  </div>

  <div v-if="props.chosenParticipants.length" class="mb-4">
    <p class="font-bold">Chosen Participants:</p>

    <div
      v-for="(chosenParticipant, key) in props.chosenParticipants"
      :key="key"
      class="break-all"
    >
      {{ chosenParticipant }}
    </div>
  </div>
</template>
