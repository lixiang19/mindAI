<template>
  <div
    id="Dialogue"
    :class="[
      'flex',
      'mb-3',
      direction === 'right' && 'flex-row-reverse justify-content-end ml-auto'
    ]"
  >
    <Avatar
      :icon="icon"
      :class="[direction === 'left' ? 'mr-2' : 'ml-2', 'flex-shrink-0']"
      size="normal"
      style="background-color: #2196f3; color: #ffffff"
      shape="circle"
    />
    <div class="flex flex-column">
      <div :class="['text-xs font-bold mb-1', direction === 'right' && 'ml-auto']">
        {{ direction === 'left' ? 'AI小助手' : '用户' }}
      </div>
      <div class="surface-card p-2 hover:shadow-2 cursor-pointer border-round text-sm">
        {{ content }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Avatar from 'primevue/avatar'
import { computed } from 'vue'
const props = defineProps({
  role: {
    type: String,
    default: 'user'
  },
  // 对话内容
  content: {
    type: String,
    default: ''
  }
})
const direction = computed(() => {
  return props.role === 'user' ? 'right' : 'left'
})
const icon = computed(() => {
  if (props.role === 'user') {
    return 'pi pi-' + 'user'
  } else {
    return 'pi pi-' + 'bolt'
  }
})
</script>

<style lang="less" scoped>
#Dialogue {
}
</style>
