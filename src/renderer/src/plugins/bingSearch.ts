import { ExecuteBing } from '../executeUtil/executeBing'
export class BingSearch implements IPlugin {
  name: string
  constructor() {
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
    const executeBing = new ExecuteBing()
    await executeBing.fetchBingSearchResult(message.content)
    // await executeBing.createSearchWebview(message.content)
    // await executeBing.getSearchResult()
  }
}
