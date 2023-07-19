import { useOperationAreaStore } from '@/store/operationAreaStore'
export class ExcuteWebview {
  operationAreaStore: unknown
  webViewInstance: unknown
  constructor() {
    this.operationAreaStore = useOperationAreaStore()
  }
  createWebview(url, executeCode?: string) {
    // 返回一个webview实例
    this.webViewInstance = this.operationAreaStore.addWebview(url, executeCode)
  }
  getHtml() {}
  getdown() {}
  findParas(text: string) {}
}
