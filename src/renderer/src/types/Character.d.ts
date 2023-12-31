type CharacterType = {
  code: string
  label: string
  $id: string
  icon?: string
  tags: string[]
  desc: string
  helloText: string
  prompt: string
  selectPluginType?: 'startsWith' | 'endsWith' | 'openAi' | 'first'
  runPluginType?: 'chain' | 'select' | 'all'
  plugins?: string[]
  backgroundColor?: string
  openAiConfig?: {
    max_tokens?: number // 生成的最大长度
    temperature?: number // 生成的多样性
    frequency_penalty?: number // 重复度惩罚因子
    presence_penalty?: number // 控制主题的重复度
  }
  chatConfig?: {
    number_of_memory_sticks?: number // 记忆棒的数量
  }
  modelConfig?: {
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

type UserInfo = {
  $id: string
  line: Line
}
