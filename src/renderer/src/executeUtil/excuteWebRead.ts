import { ExecuteWebview } from './executeWebview'
import { Readability } from '@mozilla/readability'
import TurndownService from 'turndown'
export class ExecuteWebRead {
  async fetchHtml(url: string) {
    const res = await fetch(url)
    const html = await res.text()
    // 创建一个document
    const parser = new DOMParser()
    const document = parser.parseFromString(html, 'text/html')
    return document
  }
  async getFoxReadModeHtml(html) {
    const article = new Readability(html).parse()
    return article
  }
  async htmlToText(html) {
    const turndownService = new TurndownService()
    const text = turndownService.turndown(html)
    return text
  }
  async getUrlMarkdown(url: string) {
    const document = await this.fetchHtml(url)
    const article = await this.getFoxReadModeHtml(document)
    const text = article?.content ? await this.htmlToText(article.content) : ''
    return text
  }
}
