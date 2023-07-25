import baseAI from '@renderer/characters/baseAI'

export const getCharacterList = () => {
  const characters = localStorage.getItem('characters')
  if (characters) {
    return JSON.parse(characters)
  } else {
    localStorage.setItem('characters', JSON.stringify([baseAI]))
    return [baseAI]
  }
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
  return []
}
