import { ExecuteWebview } from './executeWebview'
export class ExecuteBing {
  executeWebview!: ExecuteWebview
  webViewDocument!: Document
  constructor() {}
  async createSearchWebview(search: string) {
    this.executeWebview = new ExecuteWebview()
    await this.executeWebview.createWebview(
      'https://www.bing.com/search?q=' + encodeURIComponent(search)
    )
  }
  async fetchBingSearchResult(search: string) {
    const res = await fetch('https://www.bing.com/search?q=' + encodeURIComponent(search))
    const html = await res.text()
    console.log('🚀 ~ file: executeBing.ts:14 ~ ExecuteBing ~ fetchBingSearchResult ~ res:', html)
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
  openDetailPage() {}
}
