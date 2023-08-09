import { Readability } from '@mozilla/readability'
import TurndownService from 'turndown'
/**
 * 去除文本中的网址
 * @param {string} text - 需要处理的文本
 * @returns {string} - 处理后的文本
 */
function removeURLs(text) {
  // 匹配网址的正则表达式
  const urlRegex = /(?:https?|ftp):\/\/[\n\S]+/g

  // 使用replace方法将匹配到的网址替换为空字符串
  const result = text.replace(urlRegex, '')

  return result
}
export class ExecuteWebRead {
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
    // this.executeWebview = new ExecuteWebview()
    // if (article) {
    //   await this.executeWebview.createWebview('data:text/html;charset=UTF-8,' + article.content)
    // } else {
    //   await this.executeWebview.createWebview(url)
    // }
  }
  async getReadHtml(url: string) {
    const document = await this.fetchHtml(url)
    const article = await this.getFoxReadModeHtml(document)
    if (article?.content) {
      return article?.content
    } else {
      return document.body.innerHTML
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
    // 去除text中的链接
    return removeURLs(text)
  }
}
