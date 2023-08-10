import { defineStore } from 'pinia'
import { computed, reactive, ref, VNodeRef } from 'vue'
let id = 0

export const useOperationAreaStore = defineStore('OperationArea', () => {
  const isShowOperationArea = computed(() => {
    return operationList.length > 0 && allowShowChain.value
  })
  const allowShowChain = ref(true)
  // const operationList = reactive<Array<Operation>>([
  //   {
  //     id: 1,
  //     title: '搜索结果',
  //     type: 'searchPreview',
  //     params: {
  //       link: 'https://baike.baidu.com/item/%e6%b5%81%e6%b5%aa%e5%9c%b0%e7%90%83/16278407',
  //       searchResult: [
  //         {
  //           link: 'https://zh.wikipedia.org/wiki/%E6%B5%81%E6%B5%AA%E5%9C%B0%E7%90%83_(%E7%94%B5%E5%BD%B1)',
  //           caption:
  //             '《流浪地球》是2019年上映的中国大陆3D科幻电影，改编自刘慈欣所著同名小说，由郭帆导演，刘慈欣监制，吴京、屈楚萧、李光洁、吴孟达、赵今麦领衔主演，雷佳音友情出演  。本片主要敘述太陽即將膨脹吞噬太陽系之時，人類社會开启「流浪地球」計劃，並傾盡所有力量製造「行星發動機」驅使地球逃離太陽系前往新 … 展开',
  //           title: '流浪地球 (电影) - 维基百科，自由的百科全书'
  //         },
  //         {
  //           link: 'https://zh.wikipedia.org/zh-tw/%E6%B5%81%E6%B5%AA%E5%9C%B0%E7%90%83_(%E7%94%B5%E5%BD%B1)',
  //           caption:
  //             '《流浪地球》是2019年上映的中國大陸3D科幻電影，改編自劉慈欣所著同名小說，由郭帆導演，劉慈欣監製，吳京、屈楚蕭、李光潔、吳孟達、趙今麥領銜主演，雷佳音友情出演  。本片主要敘述太陽即將膨脹吞噬太陽系之時，人類社會開啟「流浪地球」計劃，並傾盡所有力量製造「行星發動機」驅使地球逃離太陽系前往新家園的途中，地球經過木星附近時所發生的故事。 ',
  //           title: '流浪地球 (電影) - 維基百科，自由的百科全書'
  //         },
  //         {
  //           link: 'https://zh.wikipedia.org/wiki/%E6%B5%81%E6%B5%AA%E5%9C%B0%E7%90%83',
  //           caption:
  //             '网页《 流浪地球 》是 刘慈欣 的一部中短篇科幻小说作品 [1] 。 小说讲述了人类为躲避灾难而给地球装上发动机，在宇宙中流浪的故事 [2] 。 该小说于2000年7月发表在《 科幻世界 》杂 …',
  //           title: '流浪地球 - 维基百科，自由的百科全书'
  //         },
  //         {
  //           link: 'https://baike.baidu.com/item/%e6%b5%81%e6%b5%aa%e5%9c%b0%e7%90%83/16278407',
  //           caption:
  //             '网页影片根据刘慈欣的同名小说改编，故事背景设定在2075年，讲述了太阳即将毁灭，毁灭之后的太阳系已经不适合人类生存，而面对绝境，人类将开启“流浪地球”计划，试图带着地球一起逃离太阳系，寻找人类新家园的故事。',
  //           title: '流浪地球（2019年郭帆执导的电影）_百度百科'
  //         },
  //         {
  //           link: 'https://zh.wikipedia.org/wiki/%E6%B5%81%E6%B5%AA%E5%9C%B0%E7%90%832',
  //           title: '流浪地球2 - 维基百科，自由的百科全书'
  //         },
  //         {
  //           link: 'https://baike.baidu.com/item/%E6%B5%81%E6%B5%AA%E5%9C%B0%E7%90%83/16278407',
  //           title: '流浪地球（2019年郭帆执导的电影）_百度百科'
  //         },
  //         {
  //           link: 'https://www.zhihu.com/question/311977244',
  //           title: '如何理解《流浪地球》原著的结局？为什么坚持真理的人都死 '
  //         },
  //         {
  //           link: 'https://zh.wikipedia.org/wiki/%E6%B5%81%E6%B5%AA%E5%9C%B0%E7%90%832',
  //           title: '流浪地球2 - 维基百科，自由的百科全书'
  //         },
  //         {
  //           link: 'https://zh.wikipedia.org/wiki/%E6%B5%81%E6%B5%AA%E5%9C%B0%E7%90%832',
  //           caption:
  //             '网页流浪地球2. 《 流浪地球2 》是2023年上映的 中国大陆 科幻电影 ，是2019年電影《流浪地球》的續作，影片改编自 刘慈欣 的小说《 流浪地球 》， …',
  //           title: '流浪地球2 - 维基百科，自由的百科全书'
  //         },
  //         {
  //           link: 'https://zhuanlan.zhihu.com/p/615560669',
  //           caption:
  //             '网页2023年3月20日 · 《流浪地球》是刘慈欣的一部科幻小说，讲述了人类为了逃离太阳即将变成红巨星的灾难，决定带着地球离开太阳系，前往比邻星的惊险历程。 故事分为五个时 …',
  //           title: '《流浪地球》故事梗概 - 知乎 - 知乎专栏'
  //         },
  //         {
  //           link: 'https://zhuanlan.zhihu.com/p/600469401',
  //           caption:
  //             '网页1977年 中国天文学家 付建明 在统计过最近一千年的太阳活动状况以及近50年的详细记录后，推出太阳核心聚变加速，将产生致命 氦闪 ，以至太阳死亡，并快速膨胀吞没地球的论点。 该论点在国际上并没有产生回响。 氦 …',
  //           title: '1977~2078《流浪地球》编年史：人类逃离太阳的100 …'
  //         },
  //         {
  //           link: 'https://www.zhihu.com/question/310638526',
  //           caption:
  //             '网页明明流浪地球全篇没有强调党和国家，可就是让包括我在内的大部分人感受到“主旋律”感。. 我认为这种“主旋律”感是因为流浪地球在强调人类的奉献精神，人类不屈不挠的精神，强 …',
  //           title: '如何评价电影《流浪地球》？ - 知乎'
  //         },
  //         {
  //           link: 'https://www.zhihu.com/question/311977244',
  //           caption:
  //             '网页流浪地球（书籍） 为什么坚持真理的人都死了，暴民却活了下来？ 《流浪地球》原著的结局：无知的人们不相信政府的判断，认定“太阳灭亡”是当权者为了巩固自己的权利编造的谎 …',
  //           title: '如何理解《流浪地球》原著的结局？为什么坚持真理的人都死了， …'
  //         },
  //         {
  //           link: 'https://zhuanlan.zhihu.com/p/601102150',
  //           caption:
  //             '网页2023年1月26日 · 《流浪地球》这个不是那么“春节档”的影片，再次打破固有思维，取得春节档票房第一宝座。 从《红海行动》到《流浪地球》，事实证明国人的接受度还是很高 …',
  //           title: '《流浪地球 2》中有哪些细思极恐的细节？ - 知乎专栏'
  //         }
  //       ]
  //     }
  //   }
  // ]) // 有可能是个webview、read
  const operationList = reactive<Array<Operation>>([])
  function addWebview(url: string, executeCode?: string): number {
    // 返回webview配置
    const webview = reactive<Operation>({
      url,
      executeCode,
      id: id,
      title: 'webview',
      type: 'webview'
    })
    operationList.push(webview)
    id++
    return id
  }
  function addSearchPreview(searchResult, link): number {
    const searchPreview = reactive<Operation>({
      params: {
        searchResult,
        link
      },
      id: id,
      title: '搜索结果',
      type: 'searchPreview'
    })
    operationList.push(searchPreview)
    return id
  }
  function clearOperation() {
    operationList.splice(0, operationList.length)
  }
  return {
    isShowOperationArea,
    operationList,
    addWebview,
    addSearchPreview,
    clearOperation,
    allowShowChain
  }
})
