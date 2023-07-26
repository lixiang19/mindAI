<template>
  <div id="Note" class="h-full w-full surface-ground py-5 px-5 flex gap-3 justify-content-between">
    <!-- <Card
      :pt="{
        body: { class: 'h-full' },
        content: { class: 'contentFull' }
      }"
      class="col-2 h-full"
    >
      <template #title>参考上下文 </template>
      <template #content>

      </template>
    </Card> -->
    <Card
      :pt="{
        body: { class: 'h-full' },
        content: { class: 'contentActionFull' }
      }"
      class="col-6 h-full"
    >
      <template #title> 撰写 </template>
      <template #content>
        <div class="flex w-full h-full gap-5">
          <div class="w-5">
            <div class="header">参考上下文</div>
            <Textarea
              v-model="contextText"
              rows="0"
              cols="0"
              :maxlength="20"
              class="contextText w-full"
            />
          </div>
          <div class="h-full w-7 flex flex-column gap-5">
            <div class="flex h-auto overflow-y-auto flex-column">
              <div class="item">
                <div class="header">写作内容</div>
                <Textarea v-model="contextText" rows="0" cols="0" class="w-11" />
              </div>
              <div class="item">
                <div class="header">操作</div>
                <RadioGroup
                  v-model="operationSelectedOption"
                  :options="operationOptions"
                  class="w-full flex flex-wrap justify-content-start gap-3"
                />
              </div>
              <div v-if="operationSelectedOption === 'writing'" class="item">
                <div class="header">格式</div>
                <RadioGroup
                  v-model="formatSelectedOption"
                  :options="formatOptions"
                  class="w-full flex flex-wrap justify-content-start gap-3"
                />
              </div>
              <div
                v-if="['writing', 'continueWriting', 'reply'].includes(operationSelectedOption)"
                class="item"
              >
                <div class="header">语气</div>
                <RadioGroup
                  v-model="toneSelectedOption"
                  :options="toneOptions"
                  class="w-full flex flex-wrap justify-content-start gap-3"
                />
              </div>
              <div
                v-if="['writing', 'continueWriting', 'reply'].includes(operationSelectedOption)"
                class="item"
              >
                <div class="header">长度</div>
                <RadioGroup
                  v-model="lengthSelectedOption"
                  :options="lengthOptions"
                  class="w-full flex flex-wrap justify-content-start gap-3"
                />
              </div>
              <div v-if="operationSelectedOption !== 'translate'" class="item">
                <div class="header">语言</div>
                <RadioGroup
                  v-model="languageSelectedOption"
                  :options="languageOptions"
                  class="w-full flex flex-wrap justify-content-start gap-3"
                />
              </div>
            </div>
            <div class="w-full flex justify-content-center">
              <Button class="w-9 flex justify-content-center">开始撰写</Button>
            </div>
          </div>
        </div>
      </template>
    </Card>

    <Card
      :pt="{
        body: { class: 'h-full' },
        content: { class: 'contentActionFull' }
      }"
      class="col-6 h-full"
    >
      <template #title>生成结果 </template>
      <template #content>
        <Textarea v-model="contextText" rows="0" cols="0" class="h-full w-full" />
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import Textarea from 'primevue/textarea'
import Button from 'primevue/button'
import Card from 'primevue/card'
import { ref } from 'vue'
import RadioGroup from '@renderer/components/RadioGroup.vue'
const contextText = ref('')
const operationSelectedOption = ref('writing')

const formatSelectedOption = ref('auto')
const toneSelectedOption = ref('professional')
const lengthSelectedOption = ref('medium')
const languageSelectedOption = ref('auto')

const operationOptions = ref([
  { name: '撰写', value: 'writing' }, //
  { name: '续写', value: 'continueWriting' },
  { name: '回复', value: 'reply' },
  { name: '润色', value: 'polish' },
  { name: '翻译', value: 'translate' },
  { name: '校对', value: 'proofread' }
])
const formatOptions = ref([
  { name: '自动', value: 'auto' },
  { name: '邮件', value: 'email' },
  { name: '公告', value: 'announcement' },
  { name: '通知', value: 'notification' },
  { name: '消息', value: 'message' },
  { name: '大纲', value: 'outline' },
  { name: '想法', value: 'idea' },
  { name: '评论', value: 'comment' },
  { name: '朋友圈', value: 'moments' },
  { name: '微博', value: 'weibo' }
])
const toneOptions = ref([
  // 专业、休闲、热情、诙谐
  { name: '专业', value: 'professional' },
  { name: '休闲', value: 'casual' },
  { name: '热情', value: 'enthusiastic' },
  { name: '诙谐', value: 'humorous' }
])
const lengthOptions = ref([
  // 短、中、长
  { name: '短', value: 'short' },
  { name: '中', value: 'medium' },
  { name: '长', value: 'long' }
])
const languageOptions = ref([
  // 自动、英语、中文
  { name: '自动', value: 'auto' },
  { name: '英语', value: 'english' },
  { name: '中文', value: 'chinese' }
])
</script>

<style lang="less" scoped>
#Note {
  color: #000;
  :deep(.contentActionFull) {
    height: calc(100% - 1rem);
  }
  .contextText {
    height: calc(100% - 2rem);
  }
  .item {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    margin-bottom: 2rem;
  }
  .header {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }
}
</style>
