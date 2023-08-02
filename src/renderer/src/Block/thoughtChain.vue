<template>
  <t-tabs :default-value="0">
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
</script>
