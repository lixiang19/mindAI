<template>
  <div id="OperationBlock" class="w-full h-full p-2 surface-200">
    <!-- <Splitter>
      <SplitterPane
        v-for="(item, index) in operationAreaStore.operationList"
        :id="item.id"
        :key="index"
        :header="'区域' + (index + 1)"
        :type="item.type"
      >
        <MyWebview :id="item.id" :src="item.url"></MyWebview>
      </SplitterPane>
    </Splitter> -->
  </div>
</template>

<script setup lang="ts">
import { useOperationAreaStore } from '@renderer/store/OperationAreaStore'
import MyWebview from '@renderer/components/MyWebview.vue'
const operationAreaStore = useOperationAreaStore()
</script>

<style lang="less" scoped>
#OperationBlock {
}
</style>
