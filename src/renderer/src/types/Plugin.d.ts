interface IPlugin {
  pluginName: string
  functions?: OpenAiFunction[]
  preUserMessage?: (message: Message) => message
  afterUserMessage?: (messages: Messages, context: string) => Messages
  preSystemMessage?: (messages: Messages, context: string) => Messages
  afterSystemMessage?: (messages: Messages, context: string) => Messages
}

interface OpenAiFunction {
  name: string
  description: string
  parameters: {
    type: 'object'
    properties: {
      [key: string]: {
        type: string
        description: string
      }
    }
    required: sting[]
  }
}
interface IPluginConfig {
  showOption?: boolean
}

interface searchResult {
  link: string | null | undefined
  caption: string | null | undefined
  title: string | null | undefined
}
