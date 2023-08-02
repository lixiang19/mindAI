<template>
  <t-radio-group v-model="value">
    <t-radio-button v-for="(item, i) in options" :key="i" :value="item.value">{{
      item.name
    }}</t-radio-button>
  </t-radio-group>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  modelValue: string
  options: { name: string; value: string }[]
}>()
const emit = defineEmits(['update:modelValue'])
const value = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})
</script>

<style lang="less" scoped>
:deep(.t-radio-button) {
  border: 1px solid var(--td-border-level-2-color) !important;
}
:deep(.t-radio-button.t-is-checked) {
  border: 1px solid var(--td-brand-color) !important;
}
</style>
