import { defineStore } from 'pinia'
import { computed, reactive, ref, VNodeRef } from 'vue'
const id = 0

interface Operation {
  url: string
  executeCode?: string
  id: number
}

export const useOperationAreaStore = defineStore('OperationArea', () => {
  const isShowOperationArea = computed(() => {
    return operationList.length > 0
  })

  const operationList = reactive<Array<Operation>>([]) // 有可能是个webview、read
  function addWebview(url: string, executeCode?: string): number {
    // 返回webview配置
    const webview = reactive<Operation>({
      url,
      executeCode,
      id: id
    })
    operationList.push(webview)
    return id
  }

  return {
    isShowOperationArea,
    operationList,
    addWebview
  }
})
