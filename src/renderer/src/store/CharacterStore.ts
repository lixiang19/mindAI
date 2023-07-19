import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { uniq } from 'lodash-es'
export const webCharacter = {
  name: 'AI小助手',
  id: 0,
  helloText: '我可以根据知识库、以及搜索互联网回答你的问题，也可以阅读网页内容',
  prompt:
    "你是一个可靠的AI小助手，我会将我的资料放在{context:''}中，将问题放在{quesiton:''}中，你需要根据我的资料来回答我的问题",
  icon: 'pi pi-eye',
  desc: '通过bing搜索以及查找知识库后总结答案',
  plugins(userContent: string, meta: Meta): string[] {
    const list: string[] = []
    // 如果是url，那么就是urlRead
    if (userContent.startsWith('http')) {
      list.push('urlRead')
    }
    if (meta.type === 'search') {
      list.push('bingSearch')
    } else if (meta.type === 'current') {
      list.push('parsingPage')
    } else if (meta.type === 'model') {
      // 如果是问句，那么就是bingSearch
      if (userContent.startsWith('?') || userContent.startsWith('？')) {
        list.push('bingSearch')
      }
      // 如果是！，就是复用当前上下文，以及解析可能点击的新链接
      if (userContent.startsWith('!')) {
        list.push('parsingPage')
      }
    }

    return uniq(list)
  },
  aiConfig: {
    temperature: 0
  }
}
/**
 *  preSystemMessage(messages: Messages, context: string): Messages {
    // 取出最后一个user的message
    const lastUserMessage = messages[messages.length - 1]
    lastUserMessage.content = `我的问题是：{question:${lastUserMessage.content}},我的资料是：{context:${context}}`
    return messages
  },
 */
// 预定义的两个角色，普通问答，联网问答+知识库问答
export const useCharacterStore = defineStore('Character', () => {
  const characters = reactive<CharacterType[]>([webCharacter])
  function addCharacter(character: CharacterType): void {
    characters.push(character)
  }

  function getCharacterById(id: number): CharacterType | undefined {
    return characters.find((character) => character.id === id)
  }

  return { characters, addCharacter, getCharacterById }
})
