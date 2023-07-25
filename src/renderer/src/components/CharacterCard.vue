<template>
  <div
    class="h-4rem w-5rem shadow-1 border-round-2xl flex align-items-center justify-content-between"
  >
    <Avatar
      :icon="icon"
      size="normal"
      style="background-color: #2196f3; color: #ffffff"
      shape="circle"
      class="flex-shrink-0 mr-1"
    />
    <div class="flex flex-column gap-1">
      <div class="text-xs font-bold">{{ character.name }}</div>
      <div class="text-xs">
        {{ character.desc }}
      </div>
    </div>
    <Button text rounded @click="handleSelect">
      <i v-if="!character.isSelected" class="pi pi-ellipsis-h"></i>
      <i v-else class="pi pi-check"></i>
    </Button>
  </div>
</template>
<script setup lang="ts">
import Avatar from 'primevue/avatar'
import { computed } from 'vue'
const props = defineProps<{
  character: CharacterType & { isSelected: boolean }
}>()
const icon = computed(() => {
  return props.character.icon
})
const emit = defineEmits(['select'])
function handleSelect() {
  emit('select', props.character)
}
</script>
