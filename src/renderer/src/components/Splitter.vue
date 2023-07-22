<template>
  <div id="Splitter" class="w-full h-full flex flex-column">
    <div :class="['w-full h-full content', 'grid-' + showPanels.length]">
      <template v-for="(panel, i) of showPanels" :key="i">
        <component
          :is="panel"
          :is-full="panelState[panel.props.id].isFull"
          :is-zoom-out="panelState[panel.props.id].isZoomOut"
          @fullIconClick="() => handleFullIconClick(panel.props)"
          @zoomIconClick="() => handleZoomIconClick(panel.props)"
        ></component>
      </template>
    </div>
    <div
      v-if="zoomOutPanels.length > 0 && !hasFull"
      class="w-full h-8rem surface-200 py-2 px-3 flex gap-3"
    >
      <template v-for="(zoomOutCard, i) of zoomOutPanels" :key="i">
        <div
          class="h-7rem w-8rem surface-card hover:shadow-1 p-2 border-round-lg cursor-pointer"
          @click="() => handleZoomIn(zoomOutCard)"
        >
          <div>{{ zoomOutCard.type }}</div>
          <div>{{ zoomOutCard.header }}</div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, provide, useSlots, ref, watchEffect } from 'vue'
const panelState = ref<{
  [key: string]: {
    i: number
    id: string
    isFull: boolean
    isZoomOut: boolean
  }
}>({})
const panelStateValues = computed(() => Object.values(panelState.value))
const $slots = defineSlots()
const hasFull = computed(() => {
  return panelStateValues.value.some((item) => item.isFull)
})
const panels = computed(() => {
  const panels = $slots.default()[0].children
  return panels
})
const showPanels = computed(() => {
  const isFullPanelState = panelStateValues.value.some((item) => item.isFull)
  if (isFullPanelState) {
    return panels.value.filter((item) => panelState.value[item.props.id].isFull)
  } else {
    const list = panels.value.filter((item) => !panelState.value[item.props.id].isZoomOut)

    return list
  }
})
const zoomOutPanels = computed(() => {
  const zoomOutList = panelStateValues.value.filter((item) => item.isZoomOut)
  const list = zoomOutList.map((item) => {
    const panel = panels.value.find((panel) => panel.props.id === item.id)
    return {
      type: panel.props.type,
      id: panel.props.id,
      header: panel.props.header
    }
  })

  return list
})

function handleFullIconClick(state) {
  console.log('🚀 ~ file: Splitter.vue:70 ~ handleFullIconClick ~ state:', state)
  console.log('🚀 ~ file: Splitter.vue:72 ~ handleFullIconClick ~ panelState:', panelState)
  panelState.value[state.id].isFull = !panelState.value[state.id].isFull
}
function handleZoomIconClick(state) {
  panelState.value[state.id].isZoomOut = true
}
function handleZoomIn(zoomOutCard) {
  const id = zoomOutCard.id
  panelState.value[id].isZoomOut = false
}
watchEffect(() => {
  panelState.value = panels.value.reduce((acc, cur, index) => {
    acc[cur.props.id] = {
      i: index,
      id: cur.props.id,
      isFull: false,
      isZoomOut: false
    }
    return acc
  }, {})
})
</script>

<style lang="less" scoped>
#Splitter {
}
.content {
  display: grid;
  gap: 0.3rem;
}
.grid-1 {
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
}
.grid-2 {
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
}
.grid-3 {
  // 左边一个，右边上下两个
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;

  :deep(.mySplitterPane:nth-child(1)) {
    grid-area: 1 / 1 / 3 / 2;
  }

  :deep(.mySplitterPane:nth-child(2)) {
    grid-area: 1/ 2 / 2 / 2;
  }

  :deep(.mySplitterPane:nth-child(3)) {
    grid-area: 2 / 2 / 2 / 3;
  }
}
.grid-4 {
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
}
</style>
<style lang="less"></style>
