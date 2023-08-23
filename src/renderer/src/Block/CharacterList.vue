<template>
  <div class="w-30rem h-full overflow-auto flex flex-column border-right-1 border-200 p-2 gap-2">
    <CharacterItem
      v-for="character in characters"
      :key="character.id"
      :character="character"
      :is-actived="character.id === activeCharacterId"
      @click="setActiveCharacterId(character.id)"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import CharacterItem from '@renderer/components/CharacterItem.vue'
import { getCharacterList } from '@renderer/api/character'
const characters = reactive<CharacterType[]>([])
onMounted(async () => {
  const list = await getCharacterList()
  characters.push(...list)
})
const activeCharacterId = ref(0)
const emit = defineEmits(['active-character'])
const setActiveCharacterId = (id: number): void => {
  activeCharacterId.value = id
  console.log(id)

  // Emit the active character
  emit('active-character', id)
}
</script>
