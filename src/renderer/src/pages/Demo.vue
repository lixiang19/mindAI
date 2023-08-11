<template>
  <div id="Demo" class="w-full h-full"></div>
</template>

<script setup lang="ts">
import { Client, Account, ID, Databases } from 'appwrite'
import { onMounted } from 'vue'
onMounted(async () => {
  try {
    const client = new Client()
      .setEndpoint('http://114.116.237.53:81/v1') // Your API Endpoint
      .setProject('64d5e6d03ed3a756c3b2') // Your project ID
    // const account = new Account(client)
    // await account.createEmailSession('1506674357@qq.com', 'li123456')
    const databases = new Databases(client)

    const res = await databases.listDocuments('64d5f78c246584152219', '64d5f7960f525eadc86f')
    console.log('🚀 ~ file: Demo.vue:17 ~ onMounted ~ res:', res)
  } catch (error) {
    console.log('🚀 ~ file: Demo.vue:15 ~ onMounted ~ error', error)
  }
})
</script>

<style lang="less" scoped>
#Demo {
}
</style>
