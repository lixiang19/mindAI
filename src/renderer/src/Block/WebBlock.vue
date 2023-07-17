<template>
  <div id="WebBlock" class="w-full h-full flex flex-column">
    <div class="w-full h-2rem surface-50 pl-2 flex align-items-center">
      <Button v-tooltip="'后退'" icon="pi  pi-angle-double-left" class="mr-5" text rounded />
      <Button v-tooltip="'前进'" icon="pi  pi-angle-double-right" class="mr-5" text rounded />
      <Button v-tooltip="'首页'" icon="pi  pi-home" class="mr-5" text rounded />
    </div>
    <!-- 监听加载完成 -->
    <!-- <iframe id="read_web" :src="src" class="w-full h-full"></iframe> -->
    <webview id="readWeb" disablewebsecurity :src="src" class="w-full h-full"></webview>
  </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import Button from 'primevue/button'
import { onMounted, ref } from 'vue'
const props = defineProps({
  text: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: ''
  }
})
const src = ref('')
onMounted(() => {
  const webview = document.getElementById('readWeb') as Electron.WebviewTag
  const webViewPreloadFile = window.api.webviewPreload
  webview.setAttribute('preload', webViewPreloadFile)
  if (props.type === 'search') {
    src.value = 'https://www.bing.com/search?q=' + encodeURIComponent(props.text)
  }
  window.electron.ipcRenderer.on('readWebMouseUp', handleMouseUp)

  webview.addEventListener('dom-ready', () => {
    webview.openDevTools()
    // 注入js监听鼠标抬起事件，并发送
    webview.executeJavaScript(`
      document.addEventListener('mouseup', () => {
        console.log('触发',window,window.foo,window.ipcRenderer)
      })
    `)
  })
})

function handleMouseUp(): void {
  // 获取左键选中
  const selection = window.getSelection()
  console.log('🚀 ~ file: WebBlock.vue:37 ~ handleMouseUp ~ selection:', selection)
}
</script>

<style lang="less" scoped>
#WebBlock {
}
</style>
