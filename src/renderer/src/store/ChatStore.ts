import { defineStore } from 'pinia'
import { ref } from 'vue'
import modelApi from '../api/modelApi'
import { saveEmbeddings, searchEmbeddings } from '../api/embedding'
const INITIAL_MESSAGE = [
  { role: 'system', content: '你是一个能干的助手.' },
  {
    role: 'assistant',
    content: '可以问我新的问题了'
  }
]
export const useChatStore = defineStore('Chat', () => {
  const messages = ref(INITIAL_MESSAGE)
  function addUserMessage(text: string): void {
    messages.value.push({ role: 'user', content: text })
  }
  async function addSystemMessage(): Promise<void> {
    const assistantMessage = {
      role: 'assistant',
      content: ''
    }
    messages.value.push(assistantMessage)
    const ret = await modelApi.completion({
      model: 'gpt-3.5-turbo-0613',
      messages: messages.value,
      stream: true,
      onMessage: (string) => {
        messages.value[messages.value.length - 1].content = string
      }
    })
  }
  // 初始化
  function eraser(): void {
    console.log('eraser')
    messages.value = INITIAL_MESSAGE
  }
  async function test(): Promise<void> {
    await saveEmbeddings(
      '《流浪地球》是2019年上映的中国大陆3D科幻电影，改编自刘慈欣所著同名小说，由郭帆导演，刘慈欣监制，吴京、屈楚萧、李光洁、吴孟达、赵今麦领衔主演，雷佳音友情出演[12][13]。本片主要敘述太陽即將膨脹吞噬太陽系之時，人類社會开启「流浪地球」計劃，並傾盡所有力量製造「行星發動機」驅使地球逃離太陽系前往新家園的途中，地球經過木星附近時所發生的故事。主要拍攝工作于2017年5月在山东省青岛市开始，並於同年9月結束，進入後期製作。《流浪地球》于2019年1月28日在北京举行了“奔向未来”主题首映礼，并于2019年2月5日（农历己亥年大年初一）在中国大陆上映，获得票房46.88亿人民币，票房最高时总额位列中国内地最高电影票房亚军，现为中国影史票房第五名，仅次于《长津湖》、《战狼2》、《你好，李焕英》及《哪吒之魔童降世》。美国流媒体巨头Netflix于2019年2月宣布获得除中国大陆地区外的全球流媒体播放权，并将会翻译成28种语言，其中中文配音额外添加“音频描述”选项（AD）。该片于2019年4月30日上线优酷，爱奇艺，腾讯视频和Bilibili（中国大陆地区）和Netflix（国际发行，除中国大陆地区外）。并在同年赢得第32届金鸡奖最佳故事片和最佳录音奖[14]'
    )
    await searchEmbeddings('流浪地球')
  }
  return { messages, addUserMessage, addSystemMessage, eraser, test }
})
