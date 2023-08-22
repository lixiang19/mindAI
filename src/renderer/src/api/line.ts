import { Client, Account, ID, Databases, Query, Permission, Role } from 'appwrite'
const client = new Client()
  .setEndpoint('http://114.116.237.53:81/v1') // Your API Endpoint
  .setProject('64d5e6d03ed3a756c3b2') // Your project ID
export async function getFreeLines() {
  const databases = new Databases(client)
  const result = await databases.listDocuments('aiData', 'openAiKey', [Query.equal('isFree', true)])
  return result
}
export async function getPayLines() {
  const databases = new Databases(client)
  const result = await databases.listDocuments('aiData', 'openAiKey', [
    Query.equal('isFree', false)
  ])
  return result
}
export async function getAllLines() {
  const databases = new Databases(client)
  const result = await databases.listDocuments('aiData', 'openAiKey')
  return result
}
