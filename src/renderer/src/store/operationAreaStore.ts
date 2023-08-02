import { defineStore } from 'pinia'
import { computed, reactive, ref, VNodeRef } from 'vue'
let id = 0

export const useOperationAreaStore = defineStore('OperationArea', () => {
  const isShowOperationArea = computed(() => {
    return operationList.length > 0 && allowShowChain.value
  })
  const allowShowChain = ref(true)
  const operationList = reactive<Array<Operation>>([]) // 有可能是个webview、read
  function addWebview(url: string, executeCode?: string): number {
    // 返回webview配置
    const webview = reactive<Operation>({
      url,
      executeCode,
      id: id,
      title: 'webview',
      type: 'webview'
    })
    operationList.push(webview)
    id++
    return id
  }
  function addSearchPreview(searchResult, resultMarkDown): number {
    const searchPreview = reactive<Operation>({
      params: {
        searchResult,
        resultMarkDown
      },
      id: id,
      title: '搜索结果',
      type: 'searchPreview'
    })
    operationList.push(searchPreview)
    return id
  }
  function clearOperation() {
    operationList.splice(0, operationList.length)
  }
  return {
    isShowOperationArea,
    operationList,
    addWebview,
    addSearchPreview,
    clearOperation,
    allowShowChain
  }
})
