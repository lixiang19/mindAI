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
        ></Dialogue>
      </div>
    </div>
    <ChatInput class="w-full h-15rem" @submit="handleSubmit" @eraser="handleEraser"></ChatInput>
  </div>
</template>

<script setup lang="ts">
import { computed, onUpdated, reactive, watch } from 'vue'
import Dialogue from '../components/Dialogue.vue'
import ChatInput from '../components/ChatInput.vue'
import { ref } from 'vue'
import { last } from 'lodash-es'
import {
  initCharacterMessages,
  addUserMessage,
  addSystemWaitMessage,
  addSystemMessage
} from '@renderer/backend/chat'
const props = defineProps<{
  character: CharacterType
}>()
const messages = ref<Messages>([])
watch(
  () => props.character,
  (character) => {
    const newMessages = initCharacterMessages(character.id, character)
    console.log('🚀 ~ file: ChatBlock.vue:38 ~ newMessages:', newMessages)
    messages.value = newMessages
  },
  {
    immediate: true
  }
)

const dialogueBox = ref<HTMLElement | null>(null)

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

async function handleEraser() {
  const newMessages = await initCharacterMessages(props.character.id, props.character)
  messages.value = newMessages
}
async function handleSubmit(content: string) {
  let newMessages = addUserMessage(props.character.id, content)
  newMessages = addSystemWaitMessage(props.character.id)
  messages.value = newMessages
  addSystemMessage(props.character.id, (str) => {
    last(messages.value)!.content = str
  })
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
