<template>
  <div class="w-15rem h-full overflow-auto flex flex-column border-right-1 border-200">
    <CharacterItem
      v-for="character in characterStore.characters"
      :key="character.id"
      :character="character"
      :is-actived="character.id === activeCharacterId"
      @click="setActiveCharacterId(character.id)"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CharacterItem from '@renderer/components/CharacterItem.vue'
import { useCharacterStore } from '@renderer/store/CharacterStore'
const characterStore = useCharacterStore()
const activeCharacterId = ref(0)
const emit = defineEmits(['active-character'])
const setActiveCharacterId = (id: number): void => {
  activeCharacterId.value = id
  console.log(id)

  // Emit the active character
  emit('active-character', id)
}
</script>
