<template>
  <div id="Read" class="w-full h-full">
    <Splitter class="w-full h-full">
      <SplitterPanel class="flex align-items-center justify-content-center" :size="75">
        <router-view></router-view>
      </SplitterPanel>
      <SplitterPanel class="flex align-items-center justify-content-center" :size="25">
        <ChartBlock></ChartBlock>
      </SplitterPanel>
    </Splitter>
  </div>
</template>

<script setup lang="ts">
import Splitter from 'primevue/splitter'
import SplitterPanel from 'primevue/splitterpanel'
import ChartBlock from '../Block/ChatBlock.vue'
</script>

<style lang="less" scoped>
#Read {
}
</style>
