import api from './modelApi'
// chat completion
async function chatCompletion({ onMessage }): Promise<void> {
  await api.completion({
    model: 'gpt-3.5-turbo-0613',
    messages: [
      { role: 'system', content: '你是一个能干的助手.' },
      {
        role: 'user',
        content: '你好'
      }
    ],
    stream: true, // supports stream, note that when stream is true, the return value is undefined
    onMessage: (string) => {
      onMessage(string)
    }
  })
}
export default chatCompletion
// api.abort() // cancel the request actively
// ai需要的钱太多，从当前页面回答这个功能，可以使用分词库，将问题分词，然后在本页查找，然后将查找到的段落发给ai，这样也省得向量了
