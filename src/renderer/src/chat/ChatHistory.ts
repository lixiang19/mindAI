import { cloneDeep } from 'lodash-es'
export default class ChatHistory {
  messageIdMap: Map<number, Messages>
  contextIdMap: Map<number, string>
  constructor() {
    this.messageIdMap = new Map()
    this.contextIdMap = new Map()
  }
  setContext(id: number, context: string) {
    this.contextIdMap.set(id, context)
  }
  delContext(id: number) {
    this.contextIdMap.delete(id)
  }
  setHistory(id: number, messages: Messages) {
    this.messageIdMap.set(id, messages)
  }
  getHistory(id: number) {
    const messages = this.messageIdMap.get(id)
    return cloneDeep(messages) || []
  }
  addMessage(id: number, message: Message) {
    const messages = this.getHistory(id)
    if (messages) {
      messages.push(message)
      this.setHistory(id, messages)
      return messages
    } else {
      this.setHistory(id, [message])
      return [message]
    }
  }
}
