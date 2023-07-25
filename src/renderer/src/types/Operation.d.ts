interface Operation {
  url: string
  executeCode?: string
  id: number
  type: 'webview' | 'read'
}
