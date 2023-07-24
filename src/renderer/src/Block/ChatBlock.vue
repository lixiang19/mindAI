<template>
  <div id="ChatBlock" class="w-full h-full flex flex-column justify-content-between">
    <div class="w-full overflow-auto px-2 pb-3 dialogueWrapper">
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

    <ChatInput
      class="w-full h-20rem"
      @submit="handleSubmit"
      @eraser="handleEraser"
      @typeChange="handleTypeChange"
    ></ChatInput>
  </div>
</template>

<script setup lang="ts">
import { computed, onUpdated, watch, watchEffect } from 'vue'
import Dialogue from '../components/Dialogue.vue'
import ChatInput from '../components/ChatInput.vue'
import { useChatStore } from '../store/ChatStore'
import { ref } from 'vue'

const props = defineProps<{
  character: CharacterType
}>()
const chatStore = useChatStore()
watchEffect(() => {
  chatStore.initCharacterMessages(props.character.id, props.character)
})
function handleTypeChange(type: string): void {
  meta.value.type = type
}
const dialogueBox = ref<HTMLElement | null>(null)
const meta = ref({
  type: 'search'
})
// 去除system的消息
const messagesWithoutSystem = computed(() => {
  if (chatStore.characterMessages[props.character.id]) {
    return chatStore.characterMessages[props.character.id].filter(
      (message) => message.role !== 'system'
    )
  } else {
    return []
  }
})
onUpdated(() => {
  if (dialogueBox.value) {
    dialogueBox.value!.scrollIntoView({
      behavior: 'smooth',
      block: 'end'
    })
  }
})
// watch(
//   () => messagesWithoutSystem.value,
//   () => {
//     setTimeout(() => {
//       dialogueBox.value!.scrollIntoView({
//         behavior: 'smooth',
//         block: 'end'
//       })
//     }, 100)
//   }
// )

function handleEraser(): void {
  chatStore.eraser(props.character.id, props.character)
}
function handleSubmit(content: string): void {
  chatStore.addUserMessage(props.character.id, content)
  chatStore.addSystemMessage(props.character.id, meta.value)
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
