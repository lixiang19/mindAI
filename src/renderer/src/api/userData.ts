import { Client, Account, ID, Databases, Query, Permission, Role } from 'appwrite'
import { sample } from 'lodash-es'
import { setUserInfo } from '@renderer/globalCache/userCache'
const client = new Client()
  .setEndpoint('http://114.116.237.53:81/v1') // Your API Endpoint
  .setProject('64d5e6d03ed3a756c3b2') // Your project ID

export async function getUserBaseData(userId) {
  const databases = new Databases(client)
  const result = await databases.listDocuments('userData', 'baseData', [
    Query.equal('userId', userId)
  ])
  console.log('🚀 ~ file: userData.ts:13 ~ getUserBaseData ~ result:', result)
  const data = result.documents[0]
  setUserInfo(data)
  return data
}
