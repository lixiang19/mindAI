<template>
  <div id="ChatInput" class="w-full surface-0 flex flex-column pb-3 px-2">
    <div class="w-full h-4rem flex align-items-center">
      <i class="pi pi-ban mr-2 cursor-pointer" @click="handleStop"></i>
      <div class="divider"></div>
      <i class="pi pi-eraser mr-2 cursor-pointer" @click="handleEraser"></i>
      <div class="divider"></div>
      <i class="pi pi-download cursor-pointer"></i>
      <div class="divider"></div>
      <Dropdown
        v-model="selectedType"
        :options="typeOptions"
        option-label="name"
        option-value="code"
        placeholder="选择回答类型"
        class="ml-auto"
      />
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
import Dropdown from 'primevue/dropdown'
import { ref } from 'vue'
import modelApi from '../api/modelApi'
import { useChatStore } from '../store/chatStore'
const { eraser, test } = useChatStore()

const emit = defineEmits(['submit'])
const value = ref('')
const selectedType = ref('current')
const typeOptions = ref([
  { name: '从搜索回答', code: 'search' },
  { name: '从当前页面回答', code: 'current' },
  { name: '仅通过模型', code: 'model' }
])
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
