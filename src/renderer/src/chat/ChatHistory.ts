import { cloneDeep } from 'lodash-es'
export default class ChatHistory {
  messageIdMap: Map<string, Messages>
  contextIdMap: Map<string, string>
  constructor() {
    this.messageIdMap = new Map()
    this.contextIdMap = new Map()
  }
  setContext(id: string, context: string) {
    this.contextIdMap.set(id, context)
  }
  delContext(id: string) {
    this.contextIdMap.delete(id)
  }
  setHistory(id: string, messages: Messages) {
    this.messageIdMap.set(id, messages)
  }
  getHistory(id: string) {
    const messages = this.messageIdMap.get(id)
    return cloneDeep(messages) || []
  }
  addMessage(id: string, message: Message) {
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
