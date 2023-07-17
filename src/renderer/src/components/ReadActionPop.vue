<template>
  <div v-if="props.show" :style="{ left: pos.x + 'px', top: pos.y + 'px' }" class="absolute">
    <Menu :model="items" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Menu from 'primevue/menu'
const props = defineProps({
  pos: {
    type: Object,
    default: () => {
      return {
        x: 0,
        y: 0
      }
    }
  },
  show: {
    type: Boolean,
    default: false
  }
})
const items = ref([
  { label: '笔记', icon: 'pi pi-fw pi-plus' },
  { label: '对话框', icon: 'pi pi-fw pi-trash' }
])
</script>

<style lang="less" scoped>
#ReadActionPop {
}
</style>
