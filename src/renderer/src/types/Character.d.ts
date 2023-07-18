type CharacterType = {
  name: string
  id: number
  icon: string
  desc: string
  helloText: string
  prompt: string
  preSystemMessage?: (messages: Messages, context: string) => Messages
  aiConfig: {
    max_tokens?: number // 生成的最大长度
    temperature?: number // 生成的多样性
    frequency_penalty?: number // 重复度惩罚因子
    presence_penalty?: number // 控制主题的重复度
  }
}
interface Message {
  role: string
  content: string
}
type Messages = Message[]
