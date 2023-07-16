<template>
  <div id="SearchBlock" class="w-full h-full flex flex-column">
    <div class="w-full h-2rem surface-50 pl-2 flex align-items-center">
      <i v-tooltip="'后退'" class="pi pi-angle-double-left mr-5 cursor-pointer"></i>

      <i v-tooltip="'前进'" class="pi pi-angle-double-right cursor-pointer"></i>
    </div>
    <!-- 监听加载完成 -->
    <iframe id="read_search" :src="src" class="w-full h-full" @load="handleOnload"></iframe>
  </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import { READ_EVENT } from '../evnet/readEvent'
const props = defineProps({
  text: {
    type: String,
    default: ''
  }
})
const src = ref('')
onMounted(() => {
  src.value = 'https://www.bing.com/search?q=' + encodeURIComponent(props.text)
})
function handleOnload(): void {
  READ_EVENT.emit('READ_SEARCH_LOAD')
}
</script>

<style lang="less" scoped>
#SearchBlock {
}
</style>
