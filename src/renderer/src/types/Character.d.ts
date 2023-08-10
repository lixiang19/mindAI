type CharacterType = {
  name: string
  label: string
  id: number
  icon: string
  tags: string[]
  desc: string
  helloText: string
  prompt: string
  backgroundColor?: string
  preSystemMessage?: (messages: Messages, context: string) => Messages
  openAiConfig: {
    max_tokens?: number // 生成的最大长度
    temperature?: number // 生成的多样性
    frequency_penalty?: number // 重复度惩罚因子
    presence_penalty?: number // 控制主题的重复度
  }
  chatConfig: {
    number_of_memory_sticks?: number // 记忆棒的数量
  }
  modelConfig: {
    model: string
  }
}
interface Message {
  role: string
  content: string
  shadowContent?: string
}
type Messages = Message[]
type Meta = {
  type: string
}
