<template>
  <div class="w-full h-full">
    <webview
      :id="'webview' + id"
      ref="webRef"
      disablewebsecurity
      :src="webSrc"
      class="w-full h-full"
    ></webview>
  </div>
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
    webview.insertCSS(`
          *::-webkit-scrollbar {
        /*滚动条整体样式*/
        width: 5px;
        /*高宽分别对应横竖滚动条的尺寸*/
        height: 5px;
      }

      *::-webkit-scrollbar-thumb {
        /*滚动条里面小方块*/
        border-radius: 5px;
        padding-right: 2px;
        box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        background: rgba(0, 0, 0, 0.2);
      }
    `)
    // webview.setZoomFactor(0.8)
    emit('domReady', webRef.value)
    props.executeCode && webview.executeJavaScript(props.executeCode)
  })
  webSrc.value = props.src
})
</script>
