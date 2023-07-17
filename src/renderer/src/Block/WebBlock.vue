<template>
  <div id="WebBlock" class="w-full h-full flex flex-column relative">
    <div class="w-full h-2rem surface-50 pl-2 flex align-items-center">
      <Button v-tooltip="'后退'" icon="pi  pi-angle-double-left" class="mr-5" text rounded />
      <Button v-tooltip="'前进'" icon="pi  pi-angle-double-right" class="mr-5" text rounded />
      <Button v-tooltip="'首页'" icon="pi  pi-home" class="mr-5" text rounded />
    </div>
    <ReadActionPop :pos="pos" :show="showActionPop"></ReadActionPop>
    <webview id="readWeb" disablewebsecurity :src="src" class="w-full h-full"></webview>
  </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import Button from 'primevue/button'
import ReadActionPop from '@renderer/components/ReadActionPop.vue'
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
const pos = ref({ x: 0, y: 0 })
const showActionPop = ref(false)
onMounted(() => {
  if (props.type === 'search') {
    src.value = 'https://www.bing.com/search?q=' + encodeURIComponent(props.text)
  } else if (props.type === 'url') {
    src.value = props.text
  }
})
onMounted(() => {
  const webview = document.getElementById('readWeb') as Electron.WebviewTag
  const webViewPreloadFile = window.api.webviewPreload
  webview.setAttribute('preload', webViewPreloadFile)
  window.electron.ipcRenderer.on('readWebMouseUp', handleMouseUp)
  webview.addEventListener('ipc-message', (event) => {
    console.log('🚀 ~ file: WebBlock.vue:43 ~ event:', event)
    if (event.args[0]) {
      showActionPop.value = true

      pos.value = event.args[1]
    } else {
      showActionPop.value = false
    }
  })
  webview.addEventListener('dom-ready', () => {
    // webview.openDevTools()
    // 注入js监听鼠标抬起事件，并发送
    webview.executeJavaScript(`
      document.addEventListener('mouseup', (e) => {
        const selectionText = window.getSelection().toString()
        if (selectionText) {
          const pos = {
            x: e.clientX,
            y: e.clientY
          }
          window.ipcRenderer.sendToHost("WebviewToHost_select",true,pos,selectionText)
        }else {
          window.ipcRenderer.sendToHost("WebviewToHost_select",false,null,null)
        }
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
