import baseAI from '@renderer/characters/baseAI'
import characterList from '@renderer/characters/character.json'
export const getCharacterList = () => {
  const characters = localStorage.getItem('characters')
  if (!characters) {
    return [baseAI]
  }
  return [baseAI, ...JSON.parse(characters)]
}
export const getCharacterById = (id: number) => {
  const characters = getCharacterList()
  return characters.find((character) => character.id === id)
}
export const addCharacter = (character: CharacterType) => {
  const characters = getCharacterList()
  characters.push(character)
  localStorage.setItem('characters', JSON.stringify(characters))
}
export const deleteCharacterById = (id: number) => {
  const characters = getCharacterList()
  const index = characters.findIndex((character) => character.id === id)
  characters.splice(index, 1)
  localStorage.setItem('characters', JSON.stringify(characters))
}
export const updateCharacterById = (id: number, character: CharacterType) => {
  const characters = getCharacterList()
  const index = characters.findIndex((character) => character.id === id)
  characters.splice(index, 1, character)
  localStorage.setItem('characters', JSON.stringify(characters))
}
export const getMarketCharacterList = () => {
  return characterList
}
