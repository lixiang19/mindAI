<template>
  <webview
    :id="'webview' + id"
    ref="webRef"
    disablewebsecurity
    :src="webSrc"
    class="w-full h-full"
  ></webview>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
const props = defineProps<{
  src: string
  id: number
  executeCode?: string
}>()
const webSrc = ref('')
const webRef = ref<HTMLElement | null>(null)
defineExpose({
  getWebview: () => {
    return webRef.value as Electron.WebviewTag
  }
})
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
    emit('domReady', webRef.value)
    props.executeCode && webview.executeJavaScript(props.executeCode)
  })
  webSrc.value = props.src
})
</script>
