<template>
  <t-tabs :value="0">
    <t-tab-panel
      v-for="(item, index) in operationAreaStore.operationList"
      :key="index"
      :value="index"
      :label="item.title"
    >
      <p style="margin: 20px">选项卡1内容区</p>
    </t-tab-panel>
  </t-tabs>
</template>

<script setup lang="ts">
import { useOperationAreaStore } from '@renderer/store/OperationAreaStore'
const operationAreaStore = useOperationAreaStore()
import { ExecuteBing } from '@renderer/executeUtil/executeBing'
import { ExecuteWebRead } from '@renderer/executeUtil/excuteWebRead'
setTimeout(async () => {
  const executeBing = new ExecuteBing()
  const executeWebRead = new ExecuteWebRead()
  const res = await executeBing.fetchBingSearchResult('js是什么')
  console.log('🚀 ~ file: thoughtChain.vue:23 ~ setTimeout ~ res:', res)
  operationAreaStore.addSearchPreview('a', 's')
})
</script>
