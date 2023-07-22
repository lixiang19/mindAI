<template>
  <Panel
    :header="header"
    class="mySplitterPane"
    :pt="{
      header: {
        class: 'px-2 py-1'
      },
      content: { class: 'h-full overflow-auto p-1' },
      toggleableContent: { class: 'paneContent' }
    }"
  >
    <template #icons>
      <div class="flex align-items-center">
        <div>
          <button class="p-panel-header-icon p-link mr-2">
            <span class="pi pi-refresh"></span>
          </button>
          <button class="p-panel-header-icon p-link mr-2">
            <span class="pi pi-angle-left"></span>
          </button>
          <button class="p-panel-header-icon p-link mr-2">
            <span class="pi pi-angle-right"></span>
          </button>
          <button class="p-panel-header-icon p-link mr-2">
            <span class="pi pi-search"></span>
          </button>
        </div>
        <Divider layout="vertical"></Divider>
        <button class="p-panel-header-icon p-link mr-2" @click="handleZoomClick">
          <span class="pi pi-sort-amount-down"></span>
        </button>

        <button class="p-panel-header-icon p-link mr-2" @click="handleFullClick">
          <span v-if="isFull" class="pi pi-minus"></span>
          <span v-else class="pi pi-arrows-alt"></span>
        </button>
        <button class="p-panel-header-icon p-link mr-2">
          <span class="pi pi-times"></span>
        </button>
      </div>
    </template>
    <slot></slot>
  </Panel>
</template>

<script setup lang="ts">
import Panel from 'primevue/panel'
import Divider from 'primevue/divider'
import { ref } from 'vue'
defineProps({
  header: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  id: {
    type: [String, Number],
    required: true
  },
  isFull: {
    type: Boolean,
    default: false
  },
  isZoomOut: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['fullIconClick', 'zoomIconClick'])

function handleFullClick() {
  emit('fullIconClick')
}
function handleZoomClick() {
  emit('zoomIconClick')
}
</script>

<style lang="less" scoped>
:deep(.paneContent) {
  height: calc(100% - 3.2rem);
}
</style>
