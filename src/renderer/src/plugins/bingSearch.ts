import { ExecuteBing } from '../executeUtil/executeBing'
import { ExecuteWebRead } from '@renderer/executeUtil/excuteWebRead'
type IPluginBingSearchConfig = IPluginConfig
export class BingSearch implements IPlugin {
  pluginName: string
  functions?: OpenAiFunction[] | undefined
  constructor() {
    this.pluginName = 'bingSearch'
  }

  async preUserMessage(message: Message): Promise<Message> {
    let context = ''
    const executeBing = new ExecuteBing()
    const executeWebRead = new ExecuteWebRead()
    const res = await executeBing.fetchBingSearchResult(message.content)
    const mostLikelyAnswer = res.filter((item) => item.link)[0] // 最有可能的答案，暂时取第一个，日后可能会根据权重计算
    const link = mostLikelyAnswer.link
    context = res.reduce((pre, cur) => {
      return pre + ';' + '标题:' + cur.title + ',内容:' + cur.caption
    }, '以下内容是bing的搜索结果')
    if (link) {
      console.log(context.length)
      const articleMD = await executeWebRead.getUrlMarkdown(link) //todo:这里需要优化
      if (articleMD.length > 2000) {
        context = context + ';以下内容是详细参考内容：' + articleMD.slice(0, 2000)
      } else {
        context = context + ';以下内容是详细参考内容：' + articleMD
      }
      console.log(context.length)
      executeWebRead.createReadWebview(link)
    }
    executeBing.createSearchWebview(message.content)

    // 去除context的空格和换行
    context = context.replace(/\s+/g, '')
    message.shadowContent = context
    message.content = `参考上下文是{context:'${message.shadowContent}'}中，问题是{quesiton:'${message.content}'}`

    return message

    // await executeBing.getSearchResult()
  }
}
