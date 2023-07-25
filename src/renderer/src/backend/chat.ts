import modelApi from '../api/modelApi'
import { saveEmbeddings, searchEmbeddings } from '../api/embedding'
import { getCharacterById } from './character'
import { last } from 'lodash-es'
import pluginMap from '../plugins'
export const initCharacterMessages = async (
  id: number,
  character: CharacterType
): Promise<Messages> => {
  const messages = [
    { role: 'system', content: character.prompt },
    { role: 'assistant', content: character.helloText }
  ]
  localStorage.setItem(`chatHistory-${id}`, JSON.stringify(messages))
  return messages
}
export function addUserMessage(id: number, text: string, context?: string): Messages {
  const messages = JSON.parse(localStorage.getItem(`chatHistory-${id}`) || '[]')
  if (context) {
    localStorage.setItem(`context-${id}`, context)
  }
  messages.push({ role: 'user', content: text })
  localStorage.setItem(`chatHistory-${id}`, JSON.stringify(messages))
  return messages
}
export function addSystemWaitMessage(id: number): Messages {
  const messages = JSON.parse(localStorage.getItem(`chatHistory-${id}`) || '[]')
  const assistantMessage = {
    role: 'assistant',
    content: '思考中。。。'
  }
  messages.push(assistantMessage)
  return messages
}
export async function addSystemMessage(
  id: number,
  onMessage: (message: string) => void,
  meta?: unknown
): Promise<Promise<void>> {
  const messages = JSON.parse(localStorage.getItem(`chatHistory-${id}`) || '[]')
  const functions: OpenAiFunction[] = []
  // 这里逻辑越来越重，需要修改

  const characterInfo = getCharacterById(id)
  // 1. 调用插件,先判断plugins是不是函数
  const plugins =
    typeof characterInfo.plugins === 'function'
      ? characterInfo.plugins(messages[messages.length - 1].content, meta)
      : characterInfo.plugins
  for (const pluginName of plugins) {
    console.log('🚀 ~ file: ChatStore.ts:39 ~ addSystemMessage ~ pluginName:', pluginName)
    const plugin = pluginMap[pluginName]
    const pluginInstance = new plugin()
    if (pluginInstance.preUserMessage) {
      messages[messages.length - 1] = await pluginInstance.preUserMessage(
        messages[messages.length - 1]
      )
    }

    if (pluginInstance.functions) {
      functions.push(...pluginInstance.functions)
    }
    // 把函数调用添加进去
  }

  // 删除最后一个user的message.shadowContent
  delete messages[messages.length - 1].shadowContent

  try {
    const ret = await modelApi.completion({
      model: 'gpt-3.5-turbo-16k-0613',
      messages: messages,
      stream: true,
      onMessage: onMessage,
      onEnd(string) {
        last(messages).content = string
        localStorage.setItem(`chatHistory-${id}`, JSON.stringify(messages))
      }
    })
  } catch (error) {
    console.log('发送chatgpt报错', error)
  }
}
