export default {
  name: 'AI小助手',
  id: 0,
  helloText: '我可以根据知识库、以及搜索互联网回答你的问题，也可以阅读网页内容',
  prompt:
    "你是一个可靠的AI小助手，我会将我的资料放在{context:''}中，将问题放在{quesiton:''}中，你需要根据我的资料来回答我的问题，如果资料和问题并不相关，则可以只根据自己理解回答而不用参考资料。回答应当尽可能的简短",
  icon: 'pi pi-eye',
  desc: '通过bing搜索以及查找知识库后总结答案',
  plugins(userContent: string, meta: Meta): string[] {
    const list: string[] = []
    // 如果是url，那么就是urlRead
    if (userContent.startsWith('http')) {
      list.push('urlRead')
    }
    // 如果是？，那么就是bingSearch
    if (userContent.startsWith('?') || userContent.startsWith('？')) {
      list.push('bingSearch')
    }
    // 如果是！，就是复用当前上下文，以及解析可能点击的新链接
    if (userContent.startsWith('!')) {
      list.push('parsingPage')
    }

    return list
  },
  aiConfig: {
    temperature: 0
  }
}
