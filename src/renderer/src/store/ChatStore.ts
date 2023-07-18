import { defineStore } from 'pinia'
import { ref } from 'vue'
import modelApi from '../api/modelApi'
import { saveEmbeddings, searchEmbeddings } from '../api/embedding'
import { last } from 'lodash-es'
export const useChatStore = defineStore('Chat', () => {
  const characterMessages = ref({})
  const characterInfo = ref({})
  const characterContext = ref({})
  function initChatacterMessages(id: number, character: CharacterType): void {
    if (!characterInfo.value[id]) {
      characterMessages.value[id] = [
        { role: 'system', content: character.prompt },
        { role: 'assistant', content: character.helloText }
      ]
      characterInfo.value[id] = character
    }
  }
  // 这个会不断添加重复的上下文，不能这样
  function addUserMessage(id: number, text: string, context?: string): void {
    // const info = characterInfo.value[id]
    // const shadowContent = info.genShadowContent ? info.genShadowContent(text, context) : text
    if (context) {
      characterContext.value[id] = context
    }
    characterMessages.value[id].push({ role: 'user', content: text })
  }
  async function addSystemMessage(id: number): Promise<void> {
    let messages = JSON.parse(JSON.stringify(characterMessages.value[id]))
    const assistantMessage = {
      role: 'assistant',
      content: '正在思考中...'
    }
    characterMessages.value[id].push(assistantMessage)
    const info = characterInfo.value[id]
    if (info.preSystemMessage) {
      messages = info.preSystemMessage(messages, characterContext.value[id])
    }

    // ——————————————

    const ret = await modelApi.completion({
      model: 'gpt-3.5-turbo-0613',
      messages: messages,
      stream: true,
      onMessage: (string) => {
        last(characterMessages.value[id]).content = string
      }
    })
  }
  // 初始化
  function eraser(id: number, character: CharacterType): void {
    characterMessages.value[id] = []
    characterInfo.value[id] = character
    initChatacterMessages(id, character)
  }
  return { characterMessages, addUserMessage, addSystemMessage, initChatacterMessages, eraser }
})
