<template>
  <div id="Chat" class="w-full h-full">
    <Splitter class="w-full h-full">
      <!-- <SplitterPanel class="flex align-items-center justify-content-center" :size="10">
        <NoteBlock></NoteBlock>
      </SplitterPanel> -->
      <SplitterPanel class="flex align-items-center justify-content-center" :size="50">
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
      <SplitterPanel
        v-if="operationAreaStore.isShowOperationArea"
        :size="50"
        :style="{
          flexBasis: '50%'
        }"
      >
        <ThoughtChain></ThoughtChain>
      </SplitterPanel>
    </Splitter>
  </div>
</template>

<script setup lang="ts">
import CharacterList from '@renderer/Block/CharacterList.vue'
import ChatBlock from '@renderer/Block/ChatBlock.vue'
// import NoteBlock from '@renderer/Block/NoteBlock.vue'
import OperationBlock from '@renderer/Block/OperationBlock.vue'
import ThoughtChain from '@renderer/Block/ThoughtChain.vue'
import Splitter from 'primevue/splitter'
import SplitterPanel from 'primevue/splitterpanel'
import { getCharacterById } from '@renderer/backend/character'
import Button from 'primevue/button'
import baseAI from '@renderer/characters/baseAI'
import { reactive, ref, watchEffect } from 'vue'
import { useOperationAreaStore } from '@renderer/store/OperationAreaStore'
const operationAreaStore = useOperationAreaStore()
const activeCharacterId = ref(0)
const activeCharacter = ref<CharacterType>(baseAI)
function handleActiveCharacter(id: number): void {
  activeCharacterId.value = id
  const info = getCharacterById(id)
  if (info) {
    activeCharacter.value = info
  }
  operationAreaStore.clearOperation()
}
</script>

<style lang="less">
.p-button:focus {
  box-shadow: none !important;
}
</style>
