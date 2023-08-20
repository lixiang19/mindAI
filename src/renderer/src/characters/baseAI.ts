export default [
  {
    code: 'baseAI',
    label: 'AI小助手',
    id: 0,
    tags: ['ai'],
    helloText: '你好，我是ai小助手，需要帮助吗？',
    prompt: '你是一个可靠的AI小助手',
    icon: 'ri ri-flashlight-line',
    desc: '基础ai小助手'
  },
  {
    code: 'searchAI',
    label: '查询助手',
    id: 1,
    tags: ['ai', 'plugin'],
    helloText: '我可以根据知识库、以及搜索互联网回答你的问题，也可以阅读网页内容',
    prompt:
      "你是一个可靠的AI小助手，我会将我的资料放在{context:''}中，将问题放在{quesiton:''}中，你需要根据我的资料来回答我的问题，如果资料和问题并不相关，则可以只根据自己理解回答而不用参考资料。回答应当尽可能的简短",
    icon: 'ri ri-search-line',
    desc: '通过bing搜索以及查找知识库后总结答案',
    runPluginType: 'select',
    selectPluginType: 'startsWith',
    plugins: ['urlRead', 'parsingPage', 'bingSearch'],
    openAiConfig: {
      temperature: 0
    },
    chatConfig: {
      number_of_memory_sticks: 10
    }
  }
]
