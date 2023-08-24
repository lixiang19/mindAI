<template>
  <t-tabs :value="0">
    <t-tab-panel
      v-for="(item, index) in operationAreaStore.operationList"
      :key="index"
      :value="index"
      :label="item.title"
    >
      <component :is="components[item.type]" :id="item.id" v-bind="item.params"></component>
    </t-tab-panel>
  </t-tabs>
</template>

<script setup lang="ts">
import { useOperationAreaStore } from '@renderer/store/OperationAreaStore'
import SearchPreview from '@renderer/components/SearchPreview.vue'
const operationAreaStore = useOperationAreaStore()

const components = {
  searchPreview: SearchPreview
}
// import { ExecuteBing } from '@renderer/executeUtil/executeBing'
// import { ExecuteWebRead } from '@renderer/executeUtil/excuteWebRead'
// setTimeout(async () => {
//   const executeBing = new ExecuteBing()
//   const executeWebRead = new ExecuteWebRead()
//   const res = await executeBing.fetchBingSearchResult('流浪地球')
//   console.log('🚀 ~ file: thoughtChain.vue:23 ~ setTimeout ~ res:', res)
//   operationAreaStore.addSearchPreview('a', 's')
// })
</script>
