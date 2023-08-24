<template>
  <div id="ChatBlock" class="w-full h-full flex flex-column justify-content-between">
    <div class="w-full overflow-auto px-2 py-3 dialogueWrapper">
      <div ref="dialogueBox" class="w-full flex flex-column">
        <Dialogue
          v-for="(message, index) in messagesWithoutSystem"
          :key="index"
          :role="message.role"
          :content="message.content"
          :character="character"
          :show-refresh="index === messagesWithoutSystem.length - 1 && !showStopBtn"
          @del="(index) => handleDel(index)"
          @refresh="handleRefresh"
        ></Dialogue>
      </div>
    </div>
    <ChatInput
      :show-stop-btn="showStopBtn"
      class="w-full h-15rem"
      @submit="handleSubmit"
      @eraser="handleEraser"
    ></ChatInput>
  </div>
</template>

<script setup lang="ts">
import { computed, onUpdated, reactive, watch } from 'vue'
import Dialogue from './Dialogue.vue'
import ChatInput from './ChatInput.vue'
import { ref } from 'vue'
import { last } from 'lodash-es'
import {
  initCharacterMessages,
  addUserMessage,
  addSystemWaitMessage,
  addSystemMessage,
  delMessage
} from '@renderer/chat/chat'
const props = defineProps<{
  character: CharacterType
}>()
const messages = ref<Messages>([])
const userInput = ref('')
const showStopBtn = ref(false)
watch(
  () => props.character,
  (character) => {
    const newMessages = initCharacterMessages(character.$id, character)
    messages.value = newMessages
  },
  {
    immediate: true
  }
)

const dialogueBox = ref<HTMLElement | null>(null)
function handleDel(index: number) {
  const newMessages = delMessage(props.character.$id, index)
  messages.value = newMessages
}
async function handleRefresh() {
  handleDel(messages.value.length - 1)
  await handleSubmit(userInput.value)
}
function handleEraser() {
  const newMessages = initCharacterMessages(props.character.$id, props.character)
  messages.value = newMessages
}
const messagesWithoutSystem = computed(() => {
  return messages.value.filter((message) => message.role !== 'system')
})

onUpdated(() => {
  if (dialogueBox.value) {
    dialogueBox.value!.scrollIntoView({
      behavior: 'smooth',
      block: 'end'
    })
  }
})

async function handleSubmit(content: string) {
  userInput.value = content
  showStopBtn.value = true
  let newMessages = addUserMessage(props.character.$id, content)
  newMessages = addSystemWaitMessage(props.character.$id)
  messages.value = newMessages
  await addSystemMessage(props.character.$id, (str) => {
    last(messages.value)!.content = str
  })
  showStopBtn.value = false
}
</script>

<style lang="less" scoped>
#ChatBlock {
  background-color: #f2f3f5;
  .dialogueWrapper {
    height: calc(100% - 20rem);
  }
}
</style>
@renderer/chat/chat
