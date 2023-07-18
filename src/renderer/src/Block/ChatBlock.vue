<template>
  <div id="ChatBlock" class="w-full h-full flex flex-column">
    <div class="w-full h-auto flex-auto p-2 flex flex-column overflow-auto">
      <Dialogue
        v-for="(message, index) in messagesWithoutSystem"
        :key="index"
        :role="message.role"
        :content="message.content"
        :character="character"
      ></Dialogue>
    </div>
    <ChatInput class="w-full h-20rem" @submit="handleSubmit" @eraser="handleEraser"></ChatInput>
  </div>
</template>

<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import Dialogue from '../components/Dialogue.vue'
import ChatInput from '../components/ChatInput.vue'
import { useChatStore } from '../store/ChatStore'
const props = defineProps<{
  character: CharacterType
}>()
const chatStore = useChatStore()
watchEffect(() => {
  chatStore.initChatacterMessages(props.character.id, props.character)
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
function preSubmit(content: string): boolean {
  let isDefaultContinue = true
  switch (props.character.id) {
    case 1:
      // 这个是联网搜索助手，不要默认的继续
      isDefaultContinue = false
      chatStore.addUserMessage(
        props.character.id,
        content,
        '《流浪地球2》是2023年上映的中国大陆科幻电影，是2019年电影《流浪地球》的续作，视频改编自刘慈欣的小说《流浪地球》，由郭帆执导、刘慈欣担任监制，吴京及李雪健领衔主演，刘德华特别出演。本片是2019年电影《流浪地球》的前传，叙述人类为应对太阳急速老化膨胀以致吞没太阳系的危机，决定并执行将地球迁移至半人马座α的计划（“流浪地球/移山”计划）的故事。本片于2021年10月至2022年3月期间开机拍摄，2022年下半年进入后期特效制作阶段，2023年1月22日（农历大年初一）上映[3][4][5]。'
      )
      chatStore.addSystemMessage(props.character.id)
      break

    default:
      break
  }
  return isDefaultContinue
}
function handleEraser(): void {
  chatStore.eraser(props.character.id, props.character)
}
function handleSubmit(content: string): void {
  const status = preSubmit(content)
  if (!status) {
    return
  }
  chatStore.addUserMessage(props.character.id, content)
  chatStore.addSystemMessage(props.character.id)
}
</script>

<style lang="less" scoped>
#ChatBlock {
  background-color: #f2f3f5;
}
</style>
