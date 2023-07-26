<template>
  <div id="RadioGroup">
    <div v-for="(item, i) in options" :key="i" class="flex align-items-center">
      <RadioButton v-model="value" :value="item.value" />
      <label class="ml-2">{{ item.name }}</label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import RadioButton from 'primevue/radiobutton'
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
#RadioGroup {
}
</style>
