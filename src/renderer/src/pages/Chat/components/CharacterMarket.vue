<template>
  <div id="CharacterMarket">
    <div
      v-for="item in characterList"
      id="characterCard"
      :key="item.id"
      class="shadow-1 surface-card rounded-2xl p-2 flex justify-content-between"
    >
      <Avatar shape="circle"></Avatar>
      <div class="info flex flex-column">
        <div class="text-base">{{ item.label }}</div>
        <div class="text-xs">{{ item.desc }}</div>
      </div>
      <div class="tag flex flex-column justify-content-center">
        <div class="text-base">#{{ item.tags[0] }}</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { getMarketCharacterList } from '@/renderer/src/backend/character.ts'
import { onMounted, ref } from 'vue'
import Avatar from 'primevue/avatar'
const characterList = ref<CharacterType[]>([])
onMounted(async () => {
  const res = await getMarketCharacterList()

  characterList.value = res as CharacterType[]
})
</script>
<style lang="less" scoped></style>
