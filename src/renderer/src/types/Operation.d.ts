interface Operation {
  url?: string
  executeCode?: string
  id: number
  title: string
  type: 'webview' | 'read' | 'searchPreview'
  params?: {
    [key: string]: unknown
  }
}
