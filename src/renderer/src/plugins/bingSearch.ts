import { ExecuteBing } from '../executeUtil/executeBing'
import { ExecuteWebRead } from '@renderer/executeUtil/excuteWebRead'
type IPluginBingSearchConfig = IPluginConfig
export class BingSearch implements IPlugin {
  name: string

  constructor(config: IPluginBingSearchConfig) {
    this.name = 'bingSearch'
  }

  // async preUserMessage(message: Message): Promise<Message> {
  //   message.shadowContent = message.shadowContent || ''
  //   message.shadowContent =
  //     message.shadowContent +
  //     ';' +
  //     'bing搜索结果：' +
  //     '《流浪地球2》是2023年上映的中国大陆科幻电影，是2019年电影《流浪地球》的续作，视频改编自刘慈欣的小说《流浪地球》，由郭帆执导、刘慈欣担任监制，吴京及李雪健领衔主演，刘德华特别出演。本片是2019年电影《流浪地球》的前传，叙述人类为应对太阳急速老化膨胀以致吞没太阳系的危机，决定并执行将地球迁移至半人马座α的计划（“流浪地球/移山”计划）的故事。本片于2021年10月至2022年3月期间开机拍摄，2022年下半年进入后期特效制作阶段，2023年1月22日（农历大年初一）上映[3][4][5]。'
  //   message.content = `参考上下文是{context:'${message.shadowContent}'}中，将问题放在{quesiton:'${message.content}'}`
  //   return message
  // }
  async preUserMessage(message: Message): Promise<Message> {
    let context = ''
    console.log('🚀 ~ file: bingSearch.ts:23 ~ BingSearch ~ preUserMessage ~ message:', message)
    const executeBing = new ExecuteBing()
    const executeWebRead = new ExecuteWebRead()
    const res = await executeBing.fetchBingSearchResult(message.content)
    console.log('🚀 ~ file: bingSearch.ts:26 ~ BingSearch ~ preUserMessage ~ res:', res)
    const mostLikelyAnswer = res.filter((item) => item.link)[0] // 最有可能的答案，暂时取第一个，日后可能会根据权重计算
    const link = mostLikelyAnswer.link
    context = res.reduce((pre, cur) => {
      return pre + ';' + '标题:' + cur.title + ',内容:' + cur.caption
    }, '以下内容是bing的搜索结果')
    if (link) {
      const articleMD = await executeWebRead.getUrlMarkdown(link)
      context = context + ';以下内容是详细参考内容：' + articleMD
    }
    // 去除context的空格和换行
    context = context.replace(/\s+/g, '')
    message.shadowContent = context
    message.content = `参考上下文是{context:'${message.shadowContent}'}中，问题是{quesiton:'${message.content}'}`
    executeBing.createSearchWebview(message.content)
    return message

    // await executeBing.getSearchResult()
  }
}
