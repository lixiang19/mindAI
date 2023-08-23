import api from './aiApi/modelApi'
// chat completion
export async function genWrite(content, prompt, aiConfig, onMessage, onEnd): Promise<void> {
  await api.completion({
    model: 'gpt-3.5-turbo-16k-0613',
    messages: [
      {
        role: 'system',
        content:
          "你是一个非常厉害的写作能手。我会将我的资料放在{context:''}中，将要求放在{prompt:''}中，你需要根据我的要求根据资料来生成一段文本，不要解释、不要说其他的话，只输出文章本身"
      },
      {
        role: 'user',
        content: `参考上下文是context:{${content}}  我具体的需求是prompt:{${prompt}}`
      }
    ],
    stream: true, // supports stream, note that when stream is true, the return value is undefined
    onMessage: (string) => {
      onMessage(string)
    },
    onEnd: (string) => {
      onEnd(string)
    },
    ...aiConfig
  })
}

// api.abort() // cancel the request actively
// ai需要的钱太多，从当前页面回答这个功能，可以使用分词库，将问题分词，然后在本页查找，然后将查找到的段落发给ai，这样也省得向量了
