<template>
  <div class="w-30rem h-full overflow-auto flex flex-column border-right-1 border-200 p-2 gap-2">
    <CharacterItem
      v-for="character in charactersStore.characters"
      :key="character.$id"
      :character="character"
      :is-actived="character.$id === activeCharacterId"
      @click="setActiveCharacterId(character.$id)"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import CharacterItem from './CharacterItem.vue'
import { useCharactersStore } from '@renderer/store/charactersStore'

const charactersStore = useCharactersStore()
onMounted(async () => {
  charactersStore.initCharacters()
})
const activeCharacterId = ref('base_0')
const emit = defineEmits(['active-character'])
const setActiveCharacterId = ($id: string): void => {
  activeCharacterId.value = $id
  emit('active-character', $id)
}
</script>
