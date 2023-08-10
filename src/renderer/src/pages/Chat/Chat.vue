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
            <Button
              icon="pi pi-cart-plus"
              text
              class="hover:bg-blue-100 border-round-2xl"
              rounded
            />
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
    <Dialog
      v-model:visible="visible"
      modal
      header="指令商店"
      :style="{ width: '80vw' }"
      :pt="{
        content: {
          class: 'surface-50'
        }
      }"
    >
      <CharacterMarket></CharacterMarket>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import CharacterList from '@renderer/Block/CharacterList.vue'
import ChatBlock from '@renderer/Block/ChatBlock.vue'
// import NoteBlock from '@renderer/Block/NoteBlock.vue'
import ThoughtChain from '@renderer/Block/ThoughtChain.vue'
import Dialog from 'primevue/dialog'
import Splitter from 'primevue/splitter'
import SplitterPanel from 'primevue/splitterpanel'
import { getCharacterById } from '@renderer/backend/character'
import Button from 'primevue/button'
import baseAI from '@renderer/characters/baseAI'
import { reactive, ref, watchEffect } from 'vue'
import { useOperationAreaStore } from '@renderer/store/OperationAreaStore'
import CharacterMarket from './components/CharacterMarket.vue'
const operationAreaStore = useOperationAreaStore()
const activeCharacterId = ref(0)
const activeCharacter = ref<CharacterType>(baseAI)
const visible = ref(true)
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
