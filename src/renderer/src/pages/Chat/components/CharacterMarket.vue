<template>
  <div id="CharacterMarket">
    <div class="search"><TagSelect :tabs="tabs" @change="handleChange"></TagSelect></div>
    <div class="character_market_list">
      <div
        v-for="item in filterCharacterList"
        id="characterCard"
        :key="item.$id"
        class="shadow-1 w-20rem h-7rem surface-card border-round-2xl p-3 flex flex-column justify-content-between align-items-center"
      >
        <div class="flex w-full justify-content-between align-items-center">
          <Avatar size="large" :character="item"></Avatar>
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
  </div>
</template>
<script setup lang="ts">
import { getMarketCharacterList } from '@renderer/api/character'
import { addUserSelectCharacterId } from '@renderer/api/character'
import { onMounted, reactive, ref } from 'vue'
import Avatar from '@renderer/components/Avatar.vue'
import TagSelect from './TagSelect.vue'
const tagMap = {
  english: '英语',
  study: '学习',
  efficiency: '效率',
  code: '编程',
  academicWriting: '学术写作',
  plugin: '插件'
}
const tabs = reactive([
  { label: '全部', value: 'all' },
  { label: '插件', value: 'plugin' },
  { label: 'langchain', value: 'langchain' },
  { label: '效率', value: 'efficiency' },
  { label: '英语', value: 'english' },
  { label: '学习', value: 'study' },
  { label: '编程', value: 'code' },
  { label: '学术写作', value: 'academicWriting' },
  { label: '文案', value: 'writing' },
  { label: '语言', value: 'language' },
  { label: '生活', value: 'life' },
  { label: '娱乐', value: 'entertainment' },
  { label: '角色扮演', value: 'rolePlay' }
])
// 过滤过的角色列表
const filterCharacterList = ref<CharacterType[]>([])
function handleChange(val) {
  if (val === 'all') {
    filterCharacterList.value = characterList.value
  } else {
    filterCharacterList.value = characterList.value.filter((item) => item.tags.includes(val))
  }
}
async function handleAdd(item) {
  await addUserSelectCharacterId(item.$id)
}

const characterList = ref<CharacterType[]>([])
onMounted(async () => {})
onMounted(async () => {
  const res = await getMarketCharacterList()
  characterList.value = res as CharacterType[]
  filterCharacterList.value = res as CharacterType[]
})
</script>
<style lang="less" scoped>
#CharacterMarket {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  .search {
    height: 1.5rem;
    width: 100%;
    z-index: 9;
    padding: 0 1rem;
    background-color: #fff;
  }
  .character_market_list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
    grid-gap: 1rem;
    justify-items: flex-start;
    align-content: flex-start;
    width: 100%;
    height: calc(100% - 1.5rem);
    background-color: #f2f3f5;
    padding: 1rem 0.5rem;
    border-radius: 0.5rem;
    overflow-y: auto;
  }

  #characterCard {
    &:hover {
      :deep(.t-button) {
        opacity: 1;
      }
    }
  }
  .text-label {
    font-size: 1rem;
    color: #000;
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
