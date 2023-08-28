import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'
import {
  getCharacterList,
  addUserSelectCharacterId,
  delUserSelectCharacterId
} from '@renderer/api/character'
export const useCharactersStore = defineStore('Characters', () => {
  const characters = reactive<Array<CharacterType>>([])
  async function initCharacters() {
    const list = (await getCharacterList()) as Array<CharacterType>

    characters.splice(0, characters.length, ...list)
  }
  async function delCharacterId(characterId: string) {
    await delUserSelectCharacterId(characterId)
    const index = characters.findIndex((item) => item.$id === characterId)
    characters.splice(index, 1)
  }
  async function addCharacterId(characterId: string) {
    await addUserSelectCharacterId(characterId)
    await initCharacters()
  }
  return {
    characters,
    initCharacters,
    delCharacterId,
    addCharacterId
  }
})
