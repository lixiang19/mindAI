import { useOperationAreaStore } from '@renderer/store/OperationAreaStore'
export class ExecuteBing {
  webViewDocument!: Document
  operationAreaStore
  constructor() {
    this.operationAreaStore = useOperationAreaStore()
  }
  async createPreview(searchResult, link) {
    const id = this.operationAreaStore.addSearchPreview(searchResult, link)
    return id
  }
  async fetchBingSearchResult(search: string) {
    // 如果search前有？，则去除
    if (search.startsWith('?') || search.startsWith('？')) {
      search = search.slice(1)
    }
    const res = await fetch(
      'https://www.bing.com/search?q=' + encodeURIComponent(search) + '&FORM=BEHPTB&cc=sg'
    )

    const html = await res.text()
    // 创建一个document
    const parser = new DOMParser()
    const document = parser.parseFromString(html, 'text/html')

    // 查找id为b_results下的所有class为b_algo的元素
    const result = document.querySelector('#b_results')?.querySelectorAll('.b_algo')
    const list: searchResult[] = []
    result?.forEach((item) => {
      const link = item.querySelector('h2')?.querySelector('a')?.getAttribute('href')
      const title = item.querySelector('h2')?.querySelector('a')?.textContent
      let caption = item.querySelector('.b_caption')?.querySelector('p')?.textContent
      if (!caption) {
        caption = item.querySelector('.b_algoSlug')?.textContent
      }
      if (!caption) {
        caption = item.querySelector('.b_paractl')?.textContent
      }

      const info = {
        link,
        caption,
        title
      }
      list.push(info)
    })

    return list
  }
}
