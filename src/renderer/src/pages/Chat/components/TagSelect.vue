<template>
  <div id="tagSelect">
    <div
      v-for="(tab, index) in tabs"
      :key="index"
      :class="[{ active: activeTab === tab.value }, 'item']"
      @click="activeTab = tab.value"
    >
      {{ tab.label }}
    </div>
  </div>
</template>

<script lang="ts" setup props="tabs">
import { computed, ref, PropType } from 'vue'
const activeTab = computed({
  get() {
    return activeTabRef.value
  },
  set(val) {
    activeTabRef.value = val
    emit('update:modelValue', val)
    emit('change', val)
  }
})
const activeTabRef = ref('all')
const emit = defineEmits(['update:modelValue', 'change'])
type TabType = {
  label: string
  value: string
}
const props = defineProps({
  tabs: {
    type: Array as PropType<TabType[]>,
    default: () => []
  },
  modelValue: {
    type: Number,
    default: 0
  }
})
</script>

<style lang="less" scoped>
#tagSelect {
  display: flex;
  justify-content: flex-start;
  width: 80%;
  color: #000;
  gap: 2rem;
  .item {
    cursor: pointer;
  }
  .active {
    color: #0ca4a7;
    border-bottom: 0.2rem solid #0ca4a7;
  }
}
</style>
