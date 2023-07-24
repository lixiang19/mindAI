import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import baseAI from '@renderer/characters/baseAI'

export const useCharacterStore = defineStore('Character', () => {
  const characters = reactive<CharacterType[]>([baseAI])
  function addCharacter(character: CharacterType): void {
    characters.push(character)
  }
  function getCharacterById(id: number): CharacterType | undefined {
    return characters.find((character) => character.id === id)
  }
  return { characters, addCharacter, getCharacterById }
})
