<template>
  <div id="ReadBlock" class="relative w-full h-full flex align-items-center justify-content-start">
    <AllInput class="mt-8"></AllInput>
    <NoteBlock class="ml-auto"></NoteBlock>
  </div>
</template>

<script setup lang="ts">
import AllInput from '../components/AllInput.vue'
import NoteBlock from './NoteBlock.vue'
</script>

<style lang="less" scoped>
#ReadBlock {
}
</style>
