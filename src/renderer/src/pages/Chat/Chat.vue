<template>
  <div id="Chat" class="w-full h-full">
    <Splitter class="w-full h-full">
      <SplitterPanel class="flex align-items-center justify-content-center" :size="50">
        <div class="flex flex-column justify-content-start h-full bg-white character_wrapper">
          <div class="action flex h-4rem w-full px-2 align-items-center gap-5">
            <t-tooltip content="AI市场">
              <t-button @click="handleAIMarket"><ShopIcon /></t-button>
            </t-tooltip>
            <t-tooltip content="自定义添加">
              <t-button><AddIcon /></t-button>
            </t-tooltip>
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
    <t-drawer
      v-model:visible="visible"
      :footer="false"
      header="AI市场"
      size="90%"
      :close-btn="true"
    >
      <CharacterMarket></CharacterMarket>
    </t-drawer>
  </div>
</template>

<script setup lang="ts">
import CharacterList from './components/CharacterList.vue'
import ChatBlock from '@renderer/Block/ChatBlock/ChatBlock.vue'
// import NoteBlock from '@renderer/Block/NoteBlock.vue'
import ThoughtChain from './components/ThoughtChain.vue'

import Splitter from 'primevue/splitter'
import SplitterPanel from 'primevue/splitterpanel'
import { getCharacterById } from '@renderer/globalCache/charactersCache'

import baseAIList from '@renderer/characters/baseAI'
import { reactive, ref, watchEffect } from 'vue'
import { AddIcon, ShopIcon } from 'tdesign-icons-vue-next'
import { useOperationAreaStore } from '@renderer/store/OperationAreaStore'
import CharacterMarket from './components/CharacterMarket.vue'
const operationAreaStore = useOperationAreaStore()
const activeCharacterId = ref('base_o')
const activeCharacter = ref<CharacterType>(baseAIList[0] as CharacterType)

const visible = ref(false)
function handleAIMarket() {
  visible.value = true
}
function handleActiveCharacter(id: string): void {
  activeCharacterId.value = id
  const info = getCharacterById(id)

  if (info) {
    activeCharacter.value = info
  }
  operationAreaStore.clearOperation()
}
</script>

<style lang="less" scoped>
.p-button:focus {
  box-shadow: none !important;
}
.action {
  :deep(button) {
    border-radius: 0.7rem !important;
  }
}
.character_wrapper {
  border-right: 1px solid #f2f3f5;
}
.bg-cyan {
  background-color: #f2f3f5;
}
</style>
<style>
.t-drawer__content-wrapper {
  /* background-color: #f7fafb !important; */
}
</style>
