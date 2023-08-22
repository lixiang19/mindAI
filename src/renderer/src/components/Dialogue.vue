<template>
  <div
    id="Dialogue"
    :class="['flex mb-3', direction === 'right' && 'flex-row-reverse justify-content-end ml-auto']"
  >
    <Avatar
      :character="character"
      :class="[direction === 'left' ? 'mr-2' : 'ml-2', 'flex-shrink-0']"
      size="normal"
    />
    <div class="flex flex-column">
      <div :class="['text-xs font-bold mb-1', direction === 'right' && 'ml-auto']">
        {{ direction === 'left' ? character.label : '用户' }}
      </div>
      <v-md-preview
        :text="content"
        class="surface-card cursor-pointer border-round text-sm"
      ></v-md-preview>
    </div>
    <div class="action">
      <t-tooltip content="复制">
        <i class="ri-clipboard-line" @click="handleCopy"></i>
      </t-tooltip>
      <t-tooltip v-if="showRefresh" content="重新生成本段">
        <i class="ri-refresh-line" @click="handleRefresh"></i>
      </t-tooltip>
      <t-tooltip content="删除">
        <i class="ri-delete-bin-6-line" @click="handleDel"></i>
      </t-tooltip>
      <t-tooltip content="存入知识库">
        <i class="ri-magic-line"></i>
      </t-tooltip>
    </div>
  </div>
</template>

<script setup lang="ts">
import Avatar from '@renderer/components/Avatar.vue'
import { computed } from 'vue'
import VMdPreview from '@kangc/v-md-editor/lib/preview'
import '@kangc/v-md-editor/lib/style/preview.css'
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
import '@kangc/v-md-editor/lib/theme/style/vuepress.css'
import Prism from 'prismjs'
import '@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css'
import createCopyCodePlugin from '@kangc/v-md-editor/lib/plugins/copy-code/index'

VMdPreview.use(vuepressTheme, {
  Prism
})
VMdPreview.use(createCopyCodePlugin())
const props = defineProps<{
  character: CharacterType
  role: string
  // 对话内容
  content: string
  showRefresh: boolean
}>()
const emits = defineEmits(['del', 'refresh'])
function handleCopy() {
  navigator.clipboard.writeText(props.content)
}
function handleDel() {
  emits('del')
}
function handleRefresh() {
  emits('refresh')
}
const direction = computed(() => {
  return props.role === 'user' ? 'right' : 'left'
})
</script>

<style lang="less" scoped>
#Dialogue {
  :deep(.vuepress-markdown-body) {
    padding: 0.5rem;
    border-radius: 0.5rem;
  }
  .action {
    display: none;
  }
  &:hover {
    .action {
      display: flex;
      gap: 0.5rem;
    }
  }
}
</style>
