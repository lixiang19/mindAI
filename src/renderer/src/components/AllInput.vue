<template>
  <span class="p-input-icon-right">
    <i class="pi pi-search" />

    <InputText
      v-model="value"
      v-tooltip="'支持：搜索、网址、文件'"
      class="w-30rem"
      @keyup.enter="handleSubmit"
    />
  </span>
</template>

<script setup lang="ts">
import InputText from 'primevue/inputtext'
import { ref } from 'vue'
import { getInputType } from '../util/read'
import { useRouter } from 'vue-router'
const router = useRouter()
const value = ref('')

function handleSubmit(): void {
  const type = getInputType(value.value)

  switch (type) {
    case 'url':
      router.push({
        path: '/web',
        query: {
          text: value.value,
          type: 'url'
        }
      })
      break
    case 'text':
      router.push({
        path: '/web',
        query: {
          text: value.value,
          type: 'search'
        }
      })
      break
    default:
      break
  }
}
</script>

<style lang="less" scoped>
#AllInput {
}
</style>
