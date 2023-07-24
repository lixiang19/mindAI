<template>
  <div
    id="Dialogue"
    :class="[
      'flex',
      'mb-3',
      direction === 'right' && 'flex-row-reverse justify-content-end ml-auto'
    ]"
  >
    <Avatar
      :icon="icon"
      :class="[direction === 'left' ? 'mr-2' : 'ml-2', 'flex-shrink-0']"
      size="normal"
      style="background-color: #2196f3; color: #ffffff"
      shape="circle"
    />
    <div class="flex flex-column">
      <div :class="['text-xs font-bold mb-1', direction === 'right' && 'ml-auto']">
        {{ direction === 'left' ? character.name : '用户' }}
      </div>
      <!-- <div
        class="surface-card p-2 hover:shadow-2 cursor-pointer border-round text-sm"
        v-html="result"
      ></div> -->
      <v-md-preview
        :text="content"
        class="surface-card hover:shadow-2 cursor-pointer border-round text-sm"
      ></v-md-preview>
    </div>
  </div>
</template>

<script setup lang="ts">
import Avatar from 'primevue/avatar'
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
}>()
// const result = computed(() => {
//   return md.render(props.content)
// })
const direction = computed(() => {
  return props.role === 'user' ? 'right' : 'left'
})
const icon = computed(() => {
  if (props.role === 'user') {
    return 'pi pi-' + 'user'
  } else {
    return props.character.icon
  }
})
</script>

<style lang="less" scoped>
#Dialogue {
  :deep(.v-md-editor-preview) {
    width: 80%;
  }
  :deep(.vuepress-markdown-body) {
    padding: 1rem;
    border-radius: 0.5rem;
  }
}
</style>
