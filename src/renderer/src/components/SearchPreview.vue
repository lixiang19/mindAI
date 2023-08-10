<template>
  <div id="SearchPreview" class="SearchPreview overflow-auto p-2">
    <div
      class="result_list w-full h-15rem p- flex gap-1 flex-wrap justify-content-between overflow-y-auto cursor-pointer"
    >
      <div
        v-for="(item, index) in searchResult"
        :key="index"
        class="result_item w-10rem h-4rem p-1 surface-card shadow-1 rounded-2xl flex justify-content-center align-items-center"
        @click="handleClick(item.link)"
      >
        <span class="result_title text-xs text-center">{{ item.title }}</span>
        <!-- <div class="result_content overflow-hidden text-xs">{{ item.caption?.slice(0, 20) }}</div> -->
      </div>
    </div>
    <div class="readpreview w-full overflow-x-auto p-3 surface-card shadow-1 mt-2">
      <div id="htmlRef" v-html="readHtml"></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, type PropType } from 'vue'
import { ExecuteWebRead } from '@renderer/executeUtil/excuteWebRead'
const excuteWebRead = new ExecuteWebRead()
const readHtml = ref('')
const props = defineProps({
  searchResult: {
    type: Array as PropType<searchResult[]>,
    required: true
  },
  link: {
    type: String as PropType<string>,
    required: true
  }
})

async function handleClick(link: string) {
  readHtml.value = '加载网页阅读视图。。。'
  const html = await excuteWebRead.getReadHtml(link)
  readHtml.value = html
}
onMounted(async () => {
  const html = await excuteWebRead.getReadHtml(props.link)
  readHtml.value = html
  document.querySelector('#htmlRef')!.addEventListener('click', function (event) {
    event.preventDefault()
  })
})
</script>

<style lang="less" scoped>
.SearchPreview {
  height: 44rem !important;
  width: 100% !important;
}
:deep(img) {
  max-width: 100% !important;
  height: auto !important;
}
</style>
