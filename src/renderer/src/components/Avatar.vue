<template>
  <Avatar
    :size="size"
    shape="circle"
    v-bind="calcAvatarProp(character)"
    :style="calcAvatarStyle(character)"
    class="flex-shrink-0 mr-1"
  />
</template>
<script setup lang="ts">
import Avatar from 'primevue/avatar'
import { PropType } from 'vue'
const props = defineProps({
  character: {
    type: Object as PropType<CharacterType>,
    required: true
  },
  size: {
    type: String as PropType<'normal' | 'large'>,
    default: 'normal'
  }
})
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
    backgroundColor = '#2196f3'
    color = '#fff'
  }
  return {
    backgroundColor,
    color
  }
}
</script>
