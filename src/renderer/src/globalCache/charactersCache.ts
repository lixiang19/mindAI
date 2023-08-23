export let charactersCache
export function getCharactersCache() {
  return charactersCache
}
export function setCharactersCache(data) {
  charactersCache = data
}
export function getCharacterById(id) {
  return charactersCache.find((item) => item.$id === id)
}
