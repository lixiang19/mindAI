<template>
  <div id="Chat" class="w-full h-full">
    <Splitter class="w-full h-full">
      <SplitterPanel class="flex align-items-center justify-content-center" :size="20">
        <NoteBlock></NoteBlock>
      </SplitterPanel>
      <SplitterPanel class="flex align-items-center justify-content-center" :size="40">
        <CharacterList @active-character="handleActiveCharacter"></CharacterList>
        <ChatBlock :character="activeCharacter"></ChatBlock>
      </SplitterPanel>
      <SplitterPanel class="flex align-items-center justify-content-center" :size="40">
        操作区，操作区在搜索的时候分为搜索引擎、搜索排名第一的结果、知识库、自定义搜索引擎
      </SplitterPanel>
    </Splitter>
  </div>
</template>

<script setup lang="ts">
import CharacterList from '@renderer/Block/CharacterList.vue'
import ChatBlock from '@renderer/Block/ChatBlock.vue'
import NoteBlock from '@renderer/Block/NoteBlock.vue'
import Splitter from 'primevue/splitter'
import SplitterPanel from 'primevue/splitterpanel'
import { useCharacterStore, normlCharacter } from '@renderer/store/CharacterStore'
import { ref } from 'vue'
const characterStore = useCharacterStore()
const activeCharacterId = ref(0)
const activeCharacter = ref<CharacterType>(normlCharacter)
function handleActiveCharacter(id: number): void {
  activeCharacterId.value = id
  const info = characterStore.getCharacterById(id)
  if (info) {
    activeCharacter.value = info
  }
}
</script>

<style lang="less" scoped>
#Chat {
}
</style>
