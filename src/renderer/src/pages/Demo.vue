<template>
  <div id="Demo" class="w-full h-full">
    <Splitter>
      <SplitterPane
        v-for="index in spliterNum"
        :id="index"
        :key="index"
        :header="'S' + index"
        type="webview"
      >
        <p class="m-0">sss</p>
      </SplitterPane>
    </Splitter>
  </div>
</template>

<script setup lang="ts">
import Splitter from '@renderer/components/Splitter.vue'
import SplitterPane from '@renderer/components/SplitterPane.vue'
import { ref } from 'vue'
const spliterNum = ref(0)
setTimeout(() => {
  spliterNum.value++
}, 100)
setTimeout(() => {
  spliterNum.value++
}, 200)
setTimeout(() => {
  spliterNum.value++
}, 200)
</script>

<style lang="less" scoped>
#Demo {
}
</style>
