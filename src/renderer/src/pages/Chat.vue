<template>
  <div id="Chat" class="w-full h-full">
    <Splitter class="w-full h-full">
      <!-- <SplitterPanel class="flex align-items-center justify-content-center" :size="10">
        <NoteBlock></NoteBlock>
      </SplitterPanel> -->
      <SplitterPanel class="flex align-items-center justify-content-center" :size="80">
        <div class="flex flex-column justify-content-start h-full">
          <div class="flex h-4rem w-full px-2 align-items-center gap-3">
            <Button
              icon="pi pi-file-edit"
              text
              class="hover:bg-blue-100 border-round-2xl"
              rounded
            />
            <Button icon="pi pi-gift" text class="hover:bg-blue-100 border-round-2xl" rounded />
            <Button icon="pi pi-plus" text class="hover:bg-blue-100 border-round-2xl" rounded />
          </div>
          <CharacterList @active-character="handleActiveCharacter"></CharacterList>
        </div>
        <ChatBlock :character="activeCharacter"></ChatBlock>
      </SplitterPanel>
      <!-- <SplitterPanel class="flex align-items-center justify-content-center" :size="50">
        操作区，操作区在搜索的时候分为搜索引擎、搜索排名第一的结果、知识库、自定义搜索引擎
      </SplitterPanel> -->
    </Splitter>
  </div>
</template>

<script setup lang="ts">
import CharacterList from '@renderer/Block/CharacterList.vue'
import ChatBlock from '@renderer/Block/ChatBlock.vue'
import NoteBlock from '@renderer/Block/NoteBlock.vue'
import Splitter from 'primevue/splitter'
import SplitterPanel from 'primevue/splitterpanel'
import { useCharacterStore, webCharacter } from '@renderer/store/CharacterStore'
import Button from 'primevue/button'
import { reactive, ref } from 'vue'
const characterStore = useCharacterStore()
const activeCharacterId = ref(0)
const activeCharacter = ref<CharacterType>(webCharacter)
function handleActiveCharacter(id: number): void {
  activeCharacterId.value = id
  const info = characterStore.getCharacterById(id)
  if (info) {
    activeCharacter.value = info
  }
}
</script>

<style lang="less">
.p-button:focus {
  box-shadow: none !important;
}
</style>
