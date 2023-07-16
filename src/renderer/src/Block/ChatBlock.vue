<template>
  <div id="ChatBlock" class="w-full h-full flex flex-column">
    <div class="w-full h-auto flex-auto p-2 flex flex-column overflow-auto">
      <Dialogue
        v-for="(message, index) in messagesWithoutSystem"
        :key="index"
        :role="message.role"
        :content="message.content"
      ></Dialogue>
    </div>
    <ChatInput class="w-full h-20rem" @submit="handleSubmit"></ChatInput>
  </div>
</template>

<script setup lang="ts">
import { READ_EVENT } from '../evnet/readEvent'
import { onMounted, computed } from 'vue'
import Dialogue from '../components/Dialogue.vue'
import ChatInput from '../components/ChatInput.vue'
import { useChatStore } from '../store/chatStore'

const chatStore = useChatStore()

// 去除system的消息
const messagesWithoutSystem = computed(() => {
  return chatStore.messages.filter((message) => message.role !== 'system')
})
console.log(
  '🚀 ~ file: ChatBlock.vue:26 ~ messagesWithoutSystem ~ messagesWithoutSystem:',
  messagesWithoutSystem
)
READ_EVENT.on('READ_SEARCH_LOAD', () => {
  console.log('READ_SEARCH_LOAD')
})
function handleSubmit(content: string): void {
  chatStore.addUserMessage(content)
  chatStore.addSystemMessage()
}
</script>

<style lang="less" scoped>
#ChatBlock {
  background-color: #f2f3f5;
}
</style>
