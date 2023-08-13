<template>
  <div id="CharacterMarket" class="pt-5">
    <div
      v-for="item in characterList"
      id="characterCard"
      :key="item.id"
      class="shadow-1 w-20rem h-7rem surface-card border-round-2xl p-3 flex flex-column justify-content-between align-items-center"
    >
      <div class="flex w-full justify-content-between align-items-center">
        <Avatar
          size="large"
          class="flex-shrink-0 border-round-2xl"
          v-bind="calcAvatarProp(item)"
          :style="calcAvatarStyle(item)"
        ></Avatar>
        <div class="info flex flex-column justify-content-center">
          <div class="text-label mb-1">{{ item.label }}</div>
          <div
            class="text-desc font-light text-overflow-ellipsis overflow-hidden white-space-nowrap w-9rem"
          >
            {{ item.desc }}
          </div>
        </div>
        <t-tooltip content="添加指令角色">
          <t-button variant="outline" class="shadow-1" @click="handleAdd(item)">
            <i class="pi pi-user-plus"></i>
          </t-button>
        </t-tooltip>
      </div>
      <div class="w-full flex gap-1">
        <div v-for="(tag, index) in item.tags" :key="index" class="text-xs font-light">
          #{{ tagMap[tag] }}
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { getMarketCharacterList } from '@renderer/backend/character.ts'
import { createCharacter } from '@renderer/api/app'
import { onMounted, ref } from 'vue'
import Avatar from 'primevue/avatar'

const tagMap = {
  english: '英语',
  study: '学习',
  efficiency: '效率',
  code: '编程',
  academicWriting: '学术写作',
  plugin: '插件'
}
async function handleAdd(item) {
  await createCharacter()
}
function calcAvatarProp(item) {
  if (item.icon) {
    return {
      icon: item.icon
    }
  } else if (item.image) {
    return {
      image: item.image
    }
  } else {
    return {
      label: item.label[0]
    }
  }
}

function calcAvatarStyle(item) {
  let backgroundColor = item.backgroundColor
  let color = '#fff'
  if (!backgroundColor) {
    backgroundColor = '#49a0bc'
    color = '#fff'
  }
  return {
    backgroundColor,
    color
  }
}
const characterList = ref<CharacterType[]>([])
onMounted(async () => {})
onMounted(async () => {
  const res = await getMarketCharacterList()

  characterList.value = res as CharacterType[]
})
</script>
<style lang="less" scoped>
#CharacterMarket {
  height: 100%;
  width: 100%;
  display: flex;
  // flex-wrap: wrap;
  // gap: 2rem;
  // align-items: flex-start;
  // align-content: flex-start;
  // justify-content: space-between;
  // 响应式的grid布局
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 1rem;
  justify-items: center;
  align-content: flex-start;

  #characterCard {
    &:hover {
      :deep(.t-button) {
        opacity: 1;
      }
    }
  }
  .text-label {
    font-size: 1rem;
  }
  .text-desc {
    font-size: 0.8rem;
  }
  :deep(.t-button) {
    height: 2.5rem;
    width: 2.5rem;
    border-radius: 1rem;
    opacity: 0;
  }
}
</style>
