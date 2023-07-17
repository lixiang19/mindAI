<template>
  <!-- <div
    id="NoteBlock"
    class="relative w-10rem h-full surface-200 flex flex-column align-items-center justify-content-start"
  ></div> -->
  <Panel
    header="笔记"
    class="w-full h-full"
    :pt="{
      content: { class: 'h-full overflow-auto' },
      toggleableContent: { class: 'contentFull' }
    }"
  >
  </Panel>
</template>

<script setup lang="ts">
import Panel from 'primevue/panel'
</script>

<style lang="less">
.contentFull {
  height: calc(100% - 4rem);
}
</style>
