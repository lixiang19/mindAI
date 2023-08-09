<template>
  <div id="SearchPreview" class="h-full w-full">
    <div class="result_list w-full h-10rem">
      <div v-for="(item, index) in searchResult" :key="index" class="result_item">
        <div class="result_title">{{ item.title }}</div>
        <div class="result_content overflow-hidden">{{ item.caption }}</div>
      </div>
    </div>
    <div class="readpreview" v-html="readHtml"></div>
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
onMounted(async () => {
  const html = await excuteWebRead.getReadHtml(props.link)
  readHtml.value = html
})
</script>

<style lang="less" scoped></style>
