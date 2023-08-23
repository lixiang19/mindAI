import modelApi from '../api/aiApi/modelApi'
import { saveEmbeddings, searchEmbeddings } from '../api/aiApi/embedding'
import { getCharacterById } from '@renderer/globalCache/charactersCache'
import { last } from 'lodash-es'

import ChatHistory from './ChatHistory'
import ChatPlugin from './ChatPlugin'
const chatHistory = new ChatHistory()
export const initCharacterMessages = (id: number, character: CharacterType): Messages => {
  let messages = chatHistory.getHistory(id)
  if (messages.length === 0) {
    messages = [
      { role: 'system', content: character.prompt },
      { role: 'assistant', content: character.helloText }
    ]
    chatHistory.setHistory(id, messages)
  }

  return messages
}
export const delMessage = (id: number, index: number): Messages => {
  const messages = chatHistory.getHistory(id)
  messages.splice(index, 1)
  chatHistory.setHistory(id, messages)
  return messages
}
export function addUserMessage(id: number, text: string, context?: string): Messages {
  if (context) {
    chatHistory.setContext(id, context)
  }
  const messages = chatHistory.addMessage(id, { role: 'user', content: text })
  return messages
}
export function addSystemWaitMessage(id: number): Messages {
  const messages = chatHistory.getHistory(id)
  const assistantMessage = {
    role: 'assistant',
    content: '思考中。。。'
  }
  messages.push(assistantMessage)

  return messages
}
export async function addSystemMessage(
  id: number,
  onMessage: (message: string) => void
): Promise<Promise<void>> {
  const messages = chatHistory.getHistory(id)
  const newMessages = await prePlugin(id, messages)
  console.log('🚀 ~ file: chat.ts:45 ~ newMessages:', newMessages)
  await mockLlmComplete(id, messages, onMessage)
  // await llmComplete(id, newMessages, onMessage)
}
async function mockLlmComplete(id: number, messages: Messages, onMessage) {
  // 使用定时器模拟，0.5s一个字，6s完成
  return new Promise((resolve, reject) => {
    const max = 12
    let i = 0
    let content = ''
    const timer = setInterval(() => {
      i++
      if (i > max) {
        clearInterval(timer)
        last(messages).content = content
        chatHistory.setHistory(id, messages)
        resolve(content)
        return
      }
      content = '思考中。。。' + i + '/' + max
      onMessage(content)
    }, 500)
  })
}
async function llmComplete(id: number, messages: Messages, onMessage) {
  const characterInfo = getCharacterById(id)
  const { modelConfig, chatConfig, openAiConfig } = characterInfo
  const model = modelConfig?.model || 'gpt-3.5-turbo-0613'
  const number_of_memory_sticks = chatConfig?.number_of_memory_sticks || 10
  const temperature = openAiConfig?.temperature || 1
  const max_tokens = openAiConfig?.max_tokens || 1000
  const systemMessage = messages[0]
  const memoryMessages = messages.slice(-number_of_memory_sticks)
  try {
    const ret = await modelApi.completion({
      model,
      messages: [systemMessage].concat(memoryMessages),
      stream: true,
      onMessage: onMessage,
      temperature,
      max_tokens,
      onEnd(string) {
        last(messages).content = string
        chatHistory.setHistory(id, messages)
      }
    })
  } catch (error) {
    console.log('发送chatgpt报错', error)
    last(messages).content = '发送chatgpt报错,错误原因' + error
  }
}
async function prePlugin(id: number, messages: Messages) {
  const characterInfo = getCharacterById(id)
  const chatPlugin = new ChatPlugin(characterInfo)
  const nesMessages = await chatPlugin.runPlugin(messages, chatHistory.contextIdMap.get(id) || '')
  return nesMessages
}
