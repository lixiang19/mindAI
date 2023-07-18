import { defineStore } from 'pinia'
import { ref } from 'vue'
export const normlCharacter = {
  name: 'AI小助手',
  id: 0,
  helloText: '你好，我是AI小助手，有什么可以帮助你的吗？',
  prompt: '你是一个可靠的AI小助手',
  icon: 'pi pi-user',
  desc: '基于OPENAI的gpt3.5模型，直接生成回复',
  aiConfig: {
    temperature: 0.7
  }
}
const webCharacter = {
  name: '联网问答',
  id: 1,
  helloText: '我可以根据知识库、笔记、以及搜索互联网回答你的问题',
  preSystemMessage(messages: Messages, context: string): Messages {
    // 取出最后一个user的message
    const lastUserMessage = messages[messages.length - 1]
    lastUserMessage.content = `我的问题是：{question:${lastUserMessage.content}},我的资料是：{context:${context}}`
    return messages
  },
  prompt:
    "你是一个可靠的AI小助手，我会将我的资料放在{context:''}中，将问题放在{quesiton:''}中，你需要根据我的资料来回答我的问题",
  icon: 'pi pi-eye',
  desc: '通过bing搜索以及查找知识库后总结答案',
  aiConfig: {
    temperature: 0
  }
}
// 预定义的两个角色，普通问答，联网问答+知识库问答
export const useCharacterStore = defineStore('Character', () => {
  const characters = ref<CharacterType[]>([normlCharacter, webCharacter])
  function addCharacter(character: CharacterType): void {
    characters.value.push(character)
  }

  function getCharacterById(id: number): CharacterType | undefined {
    return characters.value.find((character) => character.id === id)
  }

  return { characters, addCharacter, getCharacterById }
})
