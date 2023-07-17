<template>
  <div id="ChatInput" class="w-full surface-0 flex flex-column pb-3 px-2">
    <div class="w-full h-4rem flex align-items-center">
      <i class="pi pi-ban mr-2 cursor-pointer" @click="handleStop"></i>
      <div class="divider"></div>
      <i class="pi pi-eraser mr-2 cursor-pointer" @click="handleEraser"></i>
      <div class="divider"></div>
      <i class="pi pi-download cursor-pointer"></i>
      <div class="divider"></div>
    </div>
    <Textarea
      v-model="value"
      rows="4"
      auto-resize
      class="w-full flex-auto"
      @keyup.enter="handleSubmit"
    />
  </div>
</template>

<script setup lang="ts">
import Textarea from 'primevue/textarea'

import { ref } from 'vue'
import modelApi from '../api/modelApi'
import { useChatStore } from '../store/ChatStore'
const { eraser, test } = useChatStore()

const emit = defineEmits(['submit'])
const value = ref('')

function handleSubmit(): void {
  emit('submit', value.value)
  value.value = ''
}
function handleStop(): void {
  // completionApi.abort()
  test()
}
function handleEraser(): void {
  modelApi.abort()
  eraser()
  console.log('handleEraser')
}
</script>

<style lang="less" scoped>
#ChatInput {
  .divider {
    height: 2rem;
    width: 1px;
    background-color: #f2f3f5;
    margin: 0 1rem;
  }
}
</style>
