<template>
  <div id="ChatInput" class="w-full surface-0 flex flex-column pb-3 px-2">
    <div class="w-full h-4rem flex align-items-center">
      <i class="pi pi-ban mr-2 cursor-pointer" @click="handleStop"></i>
      <div class="divider"></div>
      <i class="pi pi-eraser mr-2 cursor-pointer" @click="handleEraser"></i>
      <div class="divider"></div>
      <div class="divider"></div>
      <div class="ml-auto">显示插件结果：</div>
      <InputSwitch v-model="operationAreaStore.allowShowChain" />
    </div>
    <Textarea
      v-model="value"
      rows="4"
      auto-resize
      class="w-full flex-auto"
      placeholder="输入问题，按回车键发送"
      @keydown.enter="handleSubmit"
    />
  </div>
</template>

<script setup lang="ts">
// 。?开头可以使用搜索引擎，!开头使用当前所有查询结果，#开头仅使用知识库，输入网址可以读取网页。
import Textarea from 'primevue/textarea'
import { ref } from 'vue'
import modelApi from '../api/modelApi'
import InputSwitch from 'primevue/inputswitch'
import { useOperationAreaStore } from '@renderer/store/OperationAreaStore'
const operationAreaStore = useOperationAreaStore()
const emit = defineEmits(['submit', 'eraser', 'typeChange'])
const value = ref('')

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
