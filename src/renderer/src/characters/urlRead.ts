export default {
  name: 'AI小助手',
  id: 0,
  isSelect: true,
  helloText:
    '可以将网址发送给我，我会阅读网页内容并生成摘要，也可以根据网页内容回答你的疑问，网页内容不要太长，否则我会读不完',
  prompt:
    "你是一个可靠的AI小助手，我会将我的资料放在{context:''}中，将问题放在{quesiton:''}中，你需要根据我的资料来回答我的问题，如果资料和问题并不相关，则可以只根据自己理解回答而不用参考资料。回答应当尽可能的简短",
  icon: 'pi pi-eye',
  desc: '通过阅读网页内容回答问题',
  plugins: ['urlRead'],
  aiConfig: {
    temperature: 0
  }
}
