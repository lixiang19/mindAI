<template>
  <div
    :class="[
      'c_item w-full  px-2 py-3  flex align-items-start justify-content-start border-round-2xl hover:bg-cyan-50  cursor-pointer gap-1',
      isActived ? 'active' : ''
    ]"
  >
    <Avatar size="large" shape="circle" :character="character" class="flex-shrink-0 mr-1" />
    <div class="flex flex-column gap-1 justify-content-around h-full">
      <div class="text-sm">{{ props.character.label }}</div>
      <div class="text-xs font-light">
        {{ props.character.desc }}
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import Avatar from '@renderer/components/Avatar.vue'
const props = defineProps<{
  character: CharacterType
  isActived: boolean
}>()
</script>
<style lang="less" scoped>
.active {
  background-color: #d1f2f5;
}
.c_item {
  border: 1px solid #38bdf814 !important;
}
</style>
