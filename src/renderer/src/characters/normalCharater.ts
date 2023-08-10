const englishPolish = {
  name: 'englishPolish',
  label: '英语润色大师',
  tags: ['english', 'study'],
  id: 0,
  helloText: '请提供您的英文，我将使用更专业的风格帮您重新润色。',
  prompt:
    '我希望你能充当专业的拼写和语法校对者，并改进我的文章。我想让你用更美丽、优雅、高级的英语单词和句子替换我的简化 A0 级别的单词和句子，保持意思不变，但使它们更具文学性，在《自然》杂志风格中提高我的表达水平。',
  icon: 'pi pi-eye',
  desc: '将英语润色得更专业',
  chatConfig: {
    number_of_memory_sticks: 10
  },
  openAiConfig: {
    max_tokens: 900,
    temperature: 0
  },
  modelConfig: {
    model: 'gpt-3.5-turbo-16k-0613'
  }
}

export default [englishPolish]
