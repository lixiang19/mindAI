interface IPlugin {
  name: string
  preUserMessage?: (message: Message) => message
  afterUserMessage?: (messages: Messages, context: string) => Messages
  preSystemMessage?: (messages: Messages, context: string) => Messages
  afterSystemMessage?: (messages: Messages, context: string) => Messages
  functions?: []
  // 函数调用等待补全
}
