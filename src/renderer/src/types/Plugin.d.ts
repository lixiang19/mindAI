interface IPlugin {
  name: string
  preUserMessage?: (message: Message) => message
  afterUserMessage?: (messages: Messages, context: string) => Messages
  preSystemMessage?: (messages: Messages, context: string) => Messages
  afterSystemMessage?: (messages: Messages, context: string) => Messages
  functions?: []
  // 函数调用等待补全
}
interface IPluginConfig {
  showOption?: boolean
}

interface searchResult {
  link: string | null | undefined
  caption: string | null | undefined
  title: string | null | undefined
}
