<template>
  <webview ref="webV" disablewebsecurity :src="src" class="w-full h-full"></webview>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
const props = defineProps<{
  src: string
  executeCode: string
}>()
const webRef = ref<HTMLElement | null>(null)
const emit = defineEmits(['domReady', 'webViewMessage'])
onMounted(() => {
  const webview = webRef.value as Electron.WebviewTag
  interface WindowApi {
    webviewPreload: string
  }
  const webViewPreloadFile = (window as Window & { api: WindowApi }).api.webviewPreload
  webview.setAttribute('preload', webViewPreloadFile)
  webview.addEventListener('ipc-message', (event) => {
    emit('webViewMessage', event)
  })
  webview.addEventListener('dom-ready', () => {
    emit('domReady')
    props.executeCode && webview.executeJavaScript(props.executeCode)
  })
})
</script>
