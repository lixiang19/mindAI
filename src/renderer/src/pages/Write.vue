<template>
  <div id="Note" class="h-full w-full surface-ground py-2 px-2 flex gap-3 justify-content-between">
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
          <div class="w-5 contextWrapper">
            <div class="header">参考上下文</div>
            <t-textarea
              v-model="contextText"
              placeholder="可以将资料、数据、范文、会议记录、原文等贴在这里"
              :maxlength="2000"
              class="contextText w-full"
              :status="status"
              :tips="tips"
            ></t-textarea>
          </div>
          <div class="h-full w-7 flex flex-column gap-3">
            <div class="promptTextWapper">
              <div class="header">写作指令</div>
              <t-textarea
                v-model="promptText"
                placeholder="具体的写作指令，如：写一篇关于《XXX》的文章"
                :maxlength="500"
                :status="status"
                :tips="tips"
              ></t-textarea>
            </div>
            <div class="flex h-auto overflow-y-auto flex-column">
              <div class="item">
                <div class="header">操作</div>
                <RadioGroup v-model="operationSelectedOption" :options="operationOptions" />
              </div>
              <div v-if="operationSelectedOption === 'writing'" class="item">
                <div class="header">格式</div>
                <RadioGroup v-model="formatSelectedOption" :options="formatOptions" />
              </div>
              <div
                v-if="['writing', 'continueWriting', 'reply'].includes(operationSelectedOption)"
                class="item"
              >
                <div class="header">语气</div>
                <RadioGroup v-model="toneSelectedOption" :options="toneOptions" />
              </div>
              <div
                v-if="['writing', 'continueWriting', 'reply'].includes(operationSelectedOption)"
                class="item"
              >
                <div class="header">长度</div>
                <RadioGroup v-model="lengthSelectedOption" :options="lengthOptions" />
              </div>
              <div v-if="operationSelectedOption !== 'translate'" class="item">
                <div class="header">语言</div>
                <RadioGroup v-model="languageSelectedOption" :options="languageOptions" />
              </div>
            </div>
            <div class="w-full sub flex justify-content-center">
              <t-button
                class="writeBtn w-9 flex justify-content-center"
                :disabled="isLoading"
                @click="handleWrite"
                >{{ buttonText }}</t-button
              >
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
        <t-textarea
          v-model="resultText"
          placeholder="AI生成的结果预览"
          class="resultText w-full"
          :maxlength="8000"
        ></t-textarea>
        <t-button shape="square" variant="text" class="copyBtn" size="large" @click="handleCopy">
          <i v-if="isCopy" class="ri-check-double-line"></i>
          <i v-else class="ri-file-copy-2-line ri-xl"></i>
        </t-button>
      </template>
    </Card>
    <t-guide v-model="current" :steps="steps" />
  </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button'
import Card from 'primevue/card'
import { computed, ref } from 'vue'
import RadioGroup from '@renderer/components/RadioGroup.vue'
import { useToast } from 'primevue/usetoast'
import { genWrite } from '@renderer/api/wirte'
import modelApi from '@renderer/api/modelApi'
const toast = useToast()
const contextText = ref('')
const promptText = ref('')
const resultText = ref('')
const operationSelectedOption = ref('writing')
const formatSelectedOption = ref('article')
const toneSelectedOption = ref('professional')
const lengthSelectedOption = ref('500')
const languageSelectedOption = ref('auto')
const tips = ref('')
const status = ref('')
const isLoading = ref(false)
const buttonText = computed(() => {
  if (isLoading.value) {
    return '生成中...'
  }
  return '开始撰写'
})
function handleWrite() {
  if (!contextText.value && !promptText.value) {
    status.value = 'warning'
    tips.value = '上下文或写作指令必须填一个'
    return
  }
  status.value = ''
  tips.value = ''
  // TODO: 调用接口
  if (isLoading.value) {
    return
  }
  isLoading.value = true
  modelApi.abort()
  const prompt = formatPromt()
  const aiConfig = formatAiConfig()
  genWrite(
    contextText.value,
    prompt,
    aiConfig,
    (str) => {
      resultText.value = str
    },
    () => {
      isLoading.value = false
    }
  )
}
const operationOptions = ref([
  { name: '撰写', value: 'writing' }, //
  { name: '仿写', value: 'imitation' },
  { name: '续写', value: 'continueWriting' },
  { name: '回复', value: 'reply' },
  { name: '润色', value: 'polish' },
  { name: '扩写', value: 'expansion' }
  // { name: '翻译', value: 'translate' }
])
const formatOptions = ref([
  { name: '文章', value: 'article' },
  { name: '会议感想', value: 'conference' },
  { name: '大纲', value: 'outline' },
  { name: '想法', value: 'idea' },
  { name: '评论', value: 'comment' },
  { name: '朋友圈', value: 'moments' },
  { name: '微博', value: 'weibo' },
  { name: '通知', value: 'notification' },
  { name: '摘要', value: 'abstract' }
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
  { name: '短', value: '500' },
  { name: '中', value: '2000' },
  { name: '长', value: '4000' }
])
const languageOptions = ref([
  // 自动、英语、中文
  { name: '自动', value: 'auto' },
  { name: '英语', value: 'english' },
  { name: '中文', value: 'chinese' }
])
// 复制的逻辑

const isCopy = ref(false)
const handleCopy = async () => {
  // 把resultText的内容复制到剪切板
  await navigator.clipboard.writeText(resultText.value)
  toast.add({
    severity: 'success',
    summary: '已复制剪贴板',

    life: 1000
  })

  isCopy.value = true
  setTimeout(() => {
    isCopy.value = false
  }, 1000)
}
/** 请求的逻辑 */
// 格式化参数
function formatPromt() {
  let prompt = ''
  if (contextText.value) {
    prompt += '根据上下文'
  }
  const operationName = operationOptions.value.find(
    (item) => item.value === operationSelectedOption.value
  )!.name
  prompt += operationName
  prompt += '一篇'
  const formatName = formatOptions.value.find(
    (item) => item.value === formatSelectedOption.value
  )!.name
  prompt += formatName
  prompt += ';语气需要是'
  const toneName = toneOptions.value.find((item) => item.value === toneSelectedOption.value)!.name
  prompt += toneName
  prompt += ';长度大约是'
  prompt += lengthSelectedOption.value
  if (promptText.value) {
    prompt += ';具体的要求是'
    prompt += promptText.value
  }
  if (languageSelectedOption.value !== 'auto') {
    prompt += ';输出的语言是'
    const languageName = languageOptions.value.find(
      (item) => item.value === languageSelectedOption.value
    )!.name
    prompt += languageName
  }
  return prompt
}
function formatAiConfig() {
  const aiConfig = {
    max_tokens: Number(lengthSelectedOption.value)
  }
  return aiConfig
}
/**引导的逻辑 */
const current = ref(-1)

const steps = [
  {
    element: '.contextWrapper',
    title: '参考上下文',
    body: '需要撰写可以放例文、需要翻译可以放原文、需要会议感想可以放会议记录等，也可以空白',
    placement: 'right',
    highlightPadding: 10
  },
  {
    element: '.promptTextWapper',
    title: '写作指令',
    body: '如果有参考上下文且下方选择了具体的操作，写作指令可以不填。也可以填入更多具体详细的需求',
    placement: 'bottom',
    highlightPadding: 10
  },
  {
    element: '.writeBtn',
    title: '生成按钮',
    body: '参考上下文或写作指令必须选填一个，然后点击开始撰写',
    placement: 'top',
    highlightPadding: 10
  },
  {
    element: '.resultText',
    title: '生成结果预览',
    body: '这里可以预览生成的结果，点击复制图标按钮可以复制到剪贴板',
    placement: 'left',
    highlightPadding: 10
  }
]
</script>

<style lang="less" scoped>
#Note {
  color: #000;
  :deep(.contentActionFull) {
    height: calc(100% - 1rem);
    position: relative;
    .copyBtn {
      top: 1.3rem;
      right: 0.1rem;
      position: absolute;
    }
  }
  .contextText {
    height: calc(100% - 2rem);
    :deep(.t-textarea__inner) {
      height: 100%;
    }
  }
  .resultText {
    height: 100%;
    :deep(.t-textarea__inner) {
      height: 100%;
    }
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
.sub {
  :deep(button) {
    width: 100% !important;
  }
}
</style>
@renderer/api/aiApi/modelApi
