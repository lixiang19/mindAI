import { useOperationAreaStore } from '@renderer/store/OperationAreaStore'
export class ExecuteWebview {
  operationAreaStore
  webViewInstance: Electron.WebviewTag | undefined
  constructor() {
    this.operationAreaStore = useOperationAreaStore()
  }
  createWebview(url, executeCode?: string) {
    // 返回一个webview实例
    const id = this.operationAreaStore.addWebview(url, executeCode)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const webViewInstance = document.getElementById('webview' + id) as Electron.WebviewTag

        webViewInstance!.addEventListener('dom-ready', () => {
          this.webViewInstance = webViewInstance
          resolve(webViewInstance)
        })
      }, 10)
    })
  }
  async getDocument(): Promise<Document> {
    return document
  }
  async getHtml() {
    const res = await this.webViewInstance?.executeJavaScript(`
      document.querySelector('html').innerHTML
    `)
    const tempDoc = document.implementation.createHTMLDocument()
    tempDoc.body.innerHTML = res
    console.log(tempDoc)
  }
  getMarkdown(html: string, baseUrl: string): string {
    // const tempDoc = document.implementation.createHTMLDocument()
    // const base = tempDoc.createElement('base')
    // base.href = baseUrl
    // tempDoc.head.append(base)
    // tempDoc.body.innerHTML = html
    // const reader = new Readability(tempDoc)
    // const parsed = reader.parse()
    // if (parsed) {
    //   return turndown.turndown(parsed.content)
    // }
    // return ''
  }
  findParas(text: string) {}
}
