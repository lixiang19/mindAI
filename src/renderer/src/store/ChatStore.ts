import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import modelApi from '../api/modelApi'
import { saveEmbeddings, searchEmbeddings } from '../api/embedding'
import { last } from 'lodash-es'
import pluginMap from '../plugins'
export const useChatStore = defineStore('Chat', () => {
  const characterMessages = reactive({})
  const characterInfoMap = reactive({})
  const characterContext = reactive({})
  function initCharacterMessages(id: number, character: CharacterType): void {
    if (!characterMessages[id] || characterMessages[id].length === 0) {
      characterMessages[id] = [
        { role: 'system', content: character.prompt },
        { role: 'assistant', content: character.helloText }
      ]
      characterInfoMap[id] = character
    }
  }
  // 这个会不断添加重复的上下文，不能这样
  function addUserMessage(id: number, text: string, context?: string): void {
    if (context) {
      characterContext[id] = context
    }
    characterMessages[id].push({ role: 'user', content: text })
  }
  async function addSystemMessage(id: number, meta?: unknown): Promise<void> {
    // 这里逻辑越来越重，需要修改
    const messages = JSON.parse(JSON.stringify(characterMessages[id]))

    const characterInfo = characterInfoMap[id]
    // 1. 调用插件,先判断plugins是不是函数
    const plugins =
      typeof characterInfo.plugins === 'function'
        ? characterInfo.plugins(messages[messages.length - 1].content, meta)
        : characterInfo.plugins
    for (const pluginName of plugins) {
      const plugin = pluginMap[pluginName]
      const pluginInstance = new plugin()
      if (pluginInstance.preUserMessage) {
        messages[messages.length - 1] = await pluginInstance.preUserMessage(
          messages[messages.length - 1]
        )
      }
    }
    // 删除最后一个user的message.shadowContent
    delete messages[messages.length - 1].shadowContent
    const assistantMessage = {
      role: 'assistant',
      content: '正在思考中...'
    }

    characterMessages[id].push(assistantMessage)
    console.log('🚀 ~ file: ChatStore.ts:30 ~ addSystemMessage ~ messages:', messages)

    console.log(
      '🚀 ~ file: ChatStore.ts:52 ~ addSystemMessage ~ characterMessages.value[id]:',
      characterMessages[id]
    )

    // const ret = await modelApi.completion({
    //   model: 'gpt-3.5-turbo-0613',
    //   messages: messages,
    //   stream: true,
    //   onMessage: (string) => {
    //     last(characterMessages[id]).content = string
    //   }
    // })
  }
  // 初始化
  function eraser(id: number, character: CharacterType): void {
    characterMessages[id] = []
    initCharacterMessages(id, character)
  }
  return { characterMessages, addUserMessage, addSystemMessage, initCharacterMessages, eraser }
})
