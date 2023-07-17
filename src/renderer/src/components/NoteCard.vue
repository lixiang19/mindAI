<template>
  <div class="mb-2 p-2 shadow-1">
    <ScrollPanel class="w-full max-h-10rem">
      {{ content }}
    </ScrollPanel>
  </div>
</template>
<script setup lang="ts">
import ScrollPanel from 'primevue/scrollpanel'
// 定义content prop
defineProps({
  content: {
    type: Object,
    required: true
  }
})
</script>
