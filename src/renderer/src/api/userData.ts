import { Client, Account, ID, Databases, Query, Permission, Role } from 'appwrite'
import { sample } from 'lodash-es'
import { getUserInfo } from './user'
const client = new Client()
  .setEndpoint('http://114.116.237.53:81/v1') // Your API Endpoint
  .setProject('64d5e6d03ed3a756c3b2') // Your project ID
import { getFreeLines } from './line'
export async function getUserLine(userId) {
  const databases = new Databases(client)
  const result = await databases.listDocuments('userData', 'baseData', [
    Query.equal('userId', userId)
  ])
  if (result.total === 0) {
    const freeLines = await getFreeLines()
    const line = sample(freeLines.documents)
    const lineId = line.$id
    await setUserLine(userId, lineId)
    return line
  } else {
    return result.documents[0]
  }
}
export async function setUserLine(userId, lineId) {
  const databases = new Databases(client)
  const result = await databases.createDocument(
    'userData',
    'baseData',
    ID.unique(),
    {
      userId,
      lineId
    },
    [
      Permission.read(Role.user(getUserInfo()!.$id)),
      Permission.update(Role.user(getUserInfo()!.$id)),
      Permission.delete(Role.user(getUserInfo()!.$id))
    ]
  )
  return result
}
