<template>
  <div id="Note" class="h-full w-full">
    <span class="p-float-label">
      <Textarea v-model="contextText" rows="5" cols="30" />
      <label>原文</label>
    </span>
    <div class="flex h-full w-10rem">
      <div class="item">
        <div class="header">写作内容</div>
      </div>
      <div class="item">
        <div class="header">操作</div>
        <div class="btns">
          <SelectButton
            v-model="operationSelectedOption"
            :options="operationOptions"
            option-label="name"
            multiple
            aria-labelledby="multiple"
          />
        </div>
      </div>
      <div v-if="operationSelectedOption === 'writing'" class="item">
        <div class="header">格式</div>
        <div class="btns">
          <SelectButton
            v-model="formatSelectedOption"
            :options="formatOptions"
            option-label="name"
            multiple
            aria-labelledby="multiple"
          />
        </div>
      </div>
      <div
        v-if="['writing', 'continueWriting', 'reply'].includes(operationSelectedOption)"
        class="item"
      >
        <div class="header">语气</div>
        <div class="btns">
          <SelectButton
            v-model="toneSelectedOption"
            :options="toneOptions"
            option-label="name"
            multiple
            aria-labelledby="multiple"
          />
        </div>
      </div>
      <div
        v-if="['writing', 'continueWriting', 'reply'].includes(operationSelectedOption)"
        class="item"
      >
        <div class="header">长度</div>
        <div class="btns">
          <SelectButton
            v-model="lengthSelectedOption"
            :options="lengthOptions"
            option-label="name"
            multiple
            aria-labelledby="multiple"
          />
        </div>
      </div>
      <div v-if="operationSelectedOption !== 'translate'" class="item">
        <div class="header">语言</div>
        <div class="btns">
          <SelectButton
            v-model="languageSelectedOption"
            :options="languageOptions"
            option-label="name"
            multiple
            aria-labelledby="multiple"
          />
        </div>
      </div>
    </div>
    <span class="p-float-label">
      <Textarea v-model="contextText" rows="5" cols="30" />
      <label>原文</label>
    </span>
  </div>
</template>

<script setup lang="ts">
import Textarea from 'primevue/textarea'
import SelectButton from 'primevue/selectbutton'
import { ref } from 'vue'

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
}
</style>
