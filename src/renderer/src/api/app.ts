import { Client, Account, ID, Databases, Permission, Role } from 'appwrite'
const client = new Client()
  .setEndpoint('http://114.116.237.53:81/v1') // Your API Endpoint
  .setProject('64d5e6d03ed3a756c3b2') // Your project ID
import { getUserInfo, setUserInfo } from '@renderer/globalCache/userCache'
export async function login({ email, password }) {
  const account = new Account(client)
  const res = await account.createEmailSession(email, password)
  return res
}
export async function checkUser() {
  const account = new Account(client)
  const res = await account.get()
  console.log('🚀 ~ file: app.ts:17 ~ checkUser ~ res:', res)
  setUserInfo(res)
  return res
}
