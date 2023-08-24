<template>
  <div
    :class="[
      'c_item w-full pr-4 pl-2 py-3  flex align-items-start justify-content-start border-round-2xl   cursor-pointer gap-1',
      isActived ? 'active' : ''
    ]"
  >
    <Avatar size="large" shape="circle" :character="character" class="flex-shrink-0 mr-1" />
    <div class="flex flex-column gap-1 justify-content-around h-full">
      <div class="text-sm">{{ props.character.label }}</div>
      <div class="text-xs font-light">
        {{ props.character.desc }}
      </div>
    </div>
    <t-dropdown v-if="showOptions" :options="options" @click="clickHandler">
      <i class="ri-more-line ml-auto"></i>
    </t-dropdown>
  </div>
</template>
<script setup lang="ts">
import { computed, reactive } from 'vue'
import { delUserSelectCharacterId } from '@renderer/api/character'
import Avatar from '@renderer/components/Avatar.vue'
import { useCharactersStore } from '@renderer/store/charactersStore'
const props = defineProps<{
  character: CharacterType
  isActived: boolean
}>()
const showOptions = computed(() => {
  return !props.character.$id.startsWith('base')
})

const options = computed(() => {
  return [
    {
      content: '置顶',
      value: 'toTop',
      disabled: true
    },
    {
      content: '编辑',
      value: 'edit',
      disabled: true
    },
    {
      content: '删除',
      value: 'del',
      theme: 'error'
    }
  ]
})
const charactersStore = useCharactersStore()
function clickHandler(e) {
  if (e.value === 'toTop') {
    console.log('置顶')
  } else if (e.value === 'edit') {
    console.log('编辑')
  } else if (e.value === 'del') {
    charactersStore.delCharacterId(props.character.$id)
  }
}
</script>
<style lang="less" scoped>
.c_item {
  &:hover {
    background-color: #d1f2f5;
  }
}
.active {
  background-color: #d1f2f5;
}
.c_item {
  border: 1px solid #38bdf814 !important;
}
</style>
