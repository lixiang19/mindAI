<template>
  <Dialog v-model:visible="visible" modal header="Header" :style="{ width: '70vw' }">
    <div class="flex flex-wrap gap-2">
      <CharacterCard
        v-for="character in characterList"
        :key="character.id"
        :character="character"
        @select="handleSelect"
      ></CharacterCard>
    </div>
  </Dialog>
</template>
<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import Dialog from 'primevue/dialog'
import CharacterCard from '@renderer/components/CharacterCard.vue'
import { getMarketCharacterList } from '@renderer/backend/character'

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
const characterList = ref<CharacterType & { isSelected: boolean }[]>()
onMounted(async () => {
  characterList.value = await getMarketCharacterList()
})
const visible = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})
</script>
