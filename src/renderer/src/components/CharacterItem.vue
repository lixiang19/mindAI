<template>
  <div
    :class="[
      'w-full  px-2 py-3  flex align-items-start justify-content-start hover:surface-100 cursor-pointer gap-1',
      isActived ? 'surface-200' : ''
    ]"
  >
    <Avatar
      :icon="icon"
      size="normal"
      style="background-color: #2196f3; color: #ffffff"
      shape="circle"
      class="flex-shrink-0 mr-1"
    />
    <div class="flex flex-column gap-1">
      <div class="text-xs font-bold">{{ props.character.name }}</div>
      <div class="text-xs">
        {{ props.character.desc }}
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Avatar from 'primevue/avatar'
import { computed } from 'vue'
const props = defineProps<{
  character: CharacterType
  isActived: boolean
}>()
const icon = computed(() => {
  return props.character.icon
})
</script>
