<template>
  <div
    :class="[
      'c_item w-full  px-2 py-3  flex align-items-start justify-content-start border-round-2xl hover:bg-cyan-100  cursor-pointer gap-1',
      isActived ? 'active' : ''
    ]"
  >
    <Avatar
      size="large"
      shape="circle"
      v-bind="calcAvatarProp(character)"
      :style="calcAvatarStyle(character)"
      class="flex-shrink-0 mr-1"
    />
    <div class="flex flex-column gap-1 justify-content-around h-full">
      <div class="text-sm">{{ props.character.name }}</div>
      <div class="text-xs font-light">
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
function calcAvatarProp(item) {
  if (item.icon) {
    return {
      icon: item.icon
    }
  } else if (item.image) {
    return {
      image: item.image
    }
  } else {
    return {
      label: item.label[0]
    }
  }
}
function calcAvatarStyle(item) {
  let backgroundColor = item.backgroundColor
  let color = '#fff'
  if (!backgroundColor) {
    backgroundColor = '#a9d2fd'
    color = '#fff'
  }
  return {
    backgroundColor,
    color
  }
}
</script>
<style lang="less" scoped>
.active {
  background-color: #eaf8f9;
}
.c_item {
  border: 1px solid #38bdf814 !important;
}
</style>
