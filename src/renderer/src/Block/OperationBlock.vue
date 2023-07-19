<template>
  <div id="OperationBlock" class="w-full h-full p-2 surface-200">
    <MyWebview
      v-if="operationAreaStore.operationList.length === 1"
      :id="operationAreaStore.operationList[0].id"
      :src="operationAreaStore.operationList[0].url"
    ></MyWebview>
    <!-- <Splitter v-if="operationAreaStore.operationList.length === 2">
      <SplitterPanel :size="50"> </SplitterPanel>
      <SplitterPanel :size="50"> </SplitterPanel>
    </Splitter>
    <Splitter v-if="operationAreaStore.operationList.length === 3">
      <SplitterPanel :size="50"> </SplitterPanel>
      <SplitterPanel :size="50">
        <Splitter layout="vertical">
          <SplitterPanel :size="50"> </SplitterPanel>
          <SplitterPanel :size="50"> </SplitterPanel>
        </Splitter>
      </SplitterPanel>
    </Splitter>
    <Splitter v-if="operationAreaStore.operationList.length === 4">
      <SplitterPanel :size="50">
        <Splitter layout="vertical">
          <SplitterPanel :size="50"> </SplitterPanel>
          <SplitterPanel :size="50"> </SplitterPanel>
        </Splitter>
      </SplitterPanel>
      <SplitterPanel :size="50">
        <Splitter layout="vertical">
          <SplitterPanel :size="50"> </SplitterPanel>
          <SplitterPanel :size="50"> </SplitterPanel>
        </Splitter>
      </SplitterPanel>
    </Splitter> -->
  </div>
</template>

<script setup lang="ts">
import Splitter from 'primevue/splitter'
import SplitterPanel from 'primevue/splitterpanel'
import { useOperationAreaStore } from '@renderer/store/OperationAreaStore'
import MyWebview from '@renderer/components/MyWebview.vue'
const operationAreaStore = useOperationAreaStore()
</script>

<style lang="less" scoped>
#OperationBlock {
}
</style>
