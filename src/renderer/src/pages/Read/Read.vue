<template>
  <div id="Read" class="w-full h-full flex align-items-center justify-content-center">
    <!-- <Splitter class="w-full h-full">
      <SplitterPanel class="flex align-items-center justify-content-center" :size="65">
        <router-view></router-view>
      </SplitterPanel>
      <SplitterPanel class="flex align-items-center justify-content-center" :size="10">
      </SplitterPanel>
      <SplitterPanel class="flex align-items-center justify-content-center" :size="25">
      </SplitterPanel>
    </Splitter> -->
    <div>
      支持pdf、txt文本阅读，网页阅读，视频字幕阅读，笔记、划线直接保存进知识库（全力开发中）
    </div>
  </div>
</template>

<script setup lang="ts">
import Splitter from 'primevue/splitter'
import SplitterPanel from 'primevue/splitterpanel'
</script>

<style lang="less" scoped>
#Read {
}
</style>
