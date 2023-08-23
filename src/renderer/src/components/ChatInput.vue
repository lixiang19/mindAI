<template>
  <div id="ChatInput" class="w-full surface-0 flex flex-column pb-3 px-2 relative">
    <div class="w-full h-4rem flex align-items-center">
      <t-tooltip content="线路设置">
        <i class="ri-list-settings-line"></i>
      </t-tooltip>
      <div class="divider"></div>
      <!-- <t-tooltip content="历史记录">
        <i class="ri-history-fill"></i>
      </t-tooltip>
      <div class="divider"></div> -->
      <t-tooltip content="新话题">
        <i class="ri-windy-line" @click="handleEraser"></i>
      </t-tooltip>
      <div class="divider"></div>
      <div class="ml-auto">显示插件结果：</div>
      <InputSwitch v-model="operationAreaStore.allowShowChain" />
    </div>
    <div v-if="showStopBtn" class="stop_btn shadow-1">
      <StopBtn @click="handleStop"></StopBtn>
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
import StopBtn from './StopBtn.vue'
// 。?开头可以使用搜索引擎，!开头使用当前所有查询结果，#开头仅使用知识库，输入网址可以读取网页。
import Textarea from 'primevue/textarea'
import { ref } from 'vue'
import modelApi from '../api/modelApi'
import InputSwitch from 'primevue/inputswitch'
import { useOperationAreaStore } from '@renderer/store/OperationAreaStore'
const operationAreaStore = useOperationAreaStore()
const emit = defineEmits(['submit', 'eraser', 'typeChange'])
const value = ref('')
defineProps<{
  showStopBtn: boolean
}>()
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
  .stop_btn {
    width: 3.5rem;
    height: 2.5rem;
    border-radius: 0.5rem;
    background-color: #fff;
    position: absolute;
    left: 50%;
    top: -1rem;
    transform: translateX(-50%);
  }
}
</style>
../api/aiApi/modelApi
