import { ExecuteWebview } from './executeWebview'
import { Readability } from '@mozilla/readability'
import TurndownService from 'turndown'
export class ExecuteWebRead {
  executeWebview!: ExecuteWebview
  async fetchHtml(url: string) {
    const res = await fetch(url)
    const html = await res.text()
    // 创建一个document
    const parser = new DOMParser()
    const document = parser.parseFromString(html, 'text/html')
    return document
  }
  async createReadWebview(url: string) {
    const document = await this.fetchHtml(url)
    const article = await this.getFoxReadModeHtml(document)
    this.executeWebview = new ExecuteWebview()
    if (article) {
      await this.executeWebview.createWebview('data:text/html;charset=UTF-8,' + article.content)
    } else {
      await this.executeWebview.createWebview(url)
    }
  }
  async getFoxReadModeHtml(html) {
    const article = new Readability(html).parse()
    return article
  }
  async htmlToMarkdown(html) {
    const turndownService = new TurndownService()
    const text = turndownService.turndown(html)
    return text
  }
  async getUrlMarkdown(url: string) {
    const document = await this.fetchHtml(url)
    const article = await this.getFoxReadModeHtml(document)
    const text = article?.content ? await this.htmlToMarkdown(article.content) : ''
    return text
  }
}
