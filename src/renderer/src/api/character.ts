import baseAIs from '@renderer/characters/baseAI'
import client from '@renderer/api/client'
import { getUserInfo } from '@renderer/globalCache/userCache'
import { getUserBaseData } from '@renderer/api/userData'
import { Client, Account, ID, Databases, Query, Permission, Role } from 'appwrite'
import { setCharactersCache } from '@renderer/globalCache/charactersCache'
export const getCharacterList = async () => {
  const characters = await getMarketCharacterList()
  const userCharacterIds = await getUserCharacterIds()
  // TODO: 还有排序问题
  const userCharacters = characters.filter((item) => userCharacterIds.includes(item.$id))
  const list = [...baseAIs, ...userCharacters]
  setCharactersCache(list)
  return list
}
export const getMarketCharacterList = async () => {
  const databases = new Databases(client)
  const result = await databases.listDocuments('characterData', 'baseCharacters')
  return result.documents // TODO 这里不同权限读取的不同，自己创建的只能自己读取，所以应该没有问题
}
export const getUserCharacterIds = async () => {
  const userBaseData = await getUserBaseData(getUserInfo().$id)
  return userBaseData?.characterIds || []
}
export const addUserSelectCharacterId = async (characterId) => {
  const databases = new Databases(client)
  const userBaseData = await getUserBaseData(getUserInfo().$id)
  const characterIds = userBaseData.characterIds || []
  characterIds.push(characterId)
  const res = await databases.updateDocument('userData', 'baseData', userBaseData.$id, {
    characterIds
  })
  return res
}
export const delUserSelectCharacterId = async (characterId) => {
  const databases = new Databases(client)
  const userBaseData = await getUserBaseData(getUserInfo().$id)
  const characterIds = userBaseData.characterIds || []
  const index = characterIds.indexOf(characterId)
  characterIds.splice(index, 1)
  const res = await databases.updateDocument('userData', 'baseData', userBaseData.$id, {
    characterIds
  })
  return res
}
// 自定义的角色
export const createCharacter = async (data) => {
  const databases = new Databases(client)
  const res = await databases.createDocument('characterData', 'baseCharacters', ID.unique(), data, [
    Permission.read(Role.user(getUserInfo()!.$id)),
    Permission.update(Role.user(getUserInfo()!.$id)),
    Permission.delete(Role.user(getUserInfo()!.$id))
  ])
  return res
}
export const updateCharacter = async (characterId, data) => {
  const databases = new Databases(client)
  const res = await databases.updateDocument('characterData', 'baseCharacters', characterId, data)
  return res
}
export const delCharacter = async (characterId) => {
  const databases = new Databases(client)
  const res = await databases.deleteDocument('characterData', 'baseCharacters', characterId)
  return res
}
