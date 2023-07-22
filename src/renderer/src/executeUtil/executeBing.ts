import { ExecuteWebview } from './executeWebview'
export class ExecuteBing {
  executeWebview!: ExecuteWebview
  webViewDocument!: Document

  async createSearchWebview(search: string) {
    console.log('🚀 ~ file: executeBing.ts:7 ~ ExecuteBing ~ createSearchWebview ~ search:', search)
    this.executeWebview = new ExecuteWebview()
    await this.executeWebview.createWebview(
      'https://www.bing.com/search?q=' + encodeURIComponent(search) + '&FORM=BEHPTB&cc=sg'
    )
  }
  async fetchBingSearchResult(search: string) {
    const res = await fetch(
      'https://www.bing.com/search?q=' + encodeURIComponent(search) + '&FORM=BEHPTB&cc=sg'
    )
    console.log(
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
      const link = item.querySelector('a')?.getAttribute('href')
      // b_caption 下的p标签内的文字
      const caption = item.querySelector('.b_caption')?.querySelector('p')?.textContent
      // h2标签下的a标签

      // title去除里面的<strong>标签
      const title = item
        .querySelector('h2')
        ?.querySelector('a')
        ?.innerHTML.replace(/<strong>/g, '')
        .replace(/<\/strong>/g, '')
      const info = {
        link,
        caption,
        title
      }
      list.push(info)
    })
    return list
  }
  async getSearchResult() {
    const res = await this.executeWebview.getHtml()

    // console.log(
    //   '🚀 ~ file: executeBing.ts:15 ~ ExecuteBing ~ getSearchResult ~ document:',
    //   document
    // )
    // const result = document.querySelector('#b_results')?.innerHTML
    // console.log('🚀 ~ file: executeBing.ts:16 ~ ExecuteBing ~ getSearchResult ~ result:', result)
  }
}
