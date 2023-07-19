import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

export const useOperationAreaStore = defineStore('OperationArea', () => {
  const isShowOperationArea = ref(false)
  const operationList: unknown[] = reactive([]) // 有可能是个webview、read
  function addWebview(url: string, executeCode?: string): unknown {
    // 返回webview配置
    const webviewComRef = ref<HTMLElement | null>()
    const webview = {
      url,
      executeCode,
      webviewComRef
    }
    operationList.push(webview)
    return webviewComRef
  }
  return {
    isShowOperationArea,
    operationList,
    addWebview
  }
})
