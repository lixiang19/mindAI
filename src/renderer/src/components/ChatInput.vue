<template>
  <div id="ChatInput" class="w-full surface-0 flex flex-column pb-3 px-2">
    <div class="w-full h-4rem flex align-items-center">
      <i class="pi pi-ban mr-2 cursor-pointer" @click="handleStop"></i>
      <div class="divider"></div>
      <i class="pi pi-eraser mr-2 cursor-pointer" @click="handleEraser"></i>
      <div class="divider"></div>
      <div class="divider"></div>
      <!-- <div class="ml-auto">AI响应方式：</div>
      <Dropdown
        v-model="selectedType"
        :options="typeOptions"
        option-label="name"
        option-value="code"
        placeholder="选择AI回答方式"
        @change="handleTypeChange"
      /> -->
    </div>
    <Textarea
      v-model="value"
      rows="4"
      auto-resize
      class="w-full flex-auto"
      placeholder="输入问题，按回车键发送。?开头可以使用搜索引擎，!开头使用当前所有查询结果，#开头仅使用知识库，输入网址可以读取网页。"
      @keydown.enter="handleSubmit"
    />
  </div>
</template>

<script setup lang="ts">
import Textarea from 'primevue/textarea'
import { ref } from 'vue'
import modelApi from '../api/modelApi'
// import Dropdown from 'primevue/dropdown'
const emit = defineEmits(['submit', 'eraser', 'typeChange'])
const value = ref('')
// const selectedType = ref('search')
// const typeOptions = ref([
//   { name: '智能', code: 'model' },
//   { name: '互联网及知识库', code: 'search' },
//   { name: '当前页面', code: 'current' }
// ])
// function handleTypeChange(e): void {
//   emit('typeChange', selectedType.value)
// }
function handleSubmit(e): void {
  e.preventDefault()
  if (!e.isComposing) {
    emit('submit', value.value)
    value.value = ''
  }
}
function handleStop(): void {
  modelApi.abort()
}
function handleEraser(): void {
  modelApi.abort()
  emit('eraser')
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
