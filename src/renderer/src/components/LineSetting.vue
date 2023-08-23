<template>
  <div>
    <div
      v-for="(line, index) in freeLineList"
      :key="index"
      :class="['line_item', line.$id === selectId && 'line_item_active']"
      @click="() => handleSet(line)"
    >
      <div class="title">免费线路{{ index + 1 }}</div>
      <div class="desc">不稳定，有限速</div>
    </div>
    <div
      v-for="(line, index) in payLineList"
      :key="index"
      :class="['line_item', line.$id === selectId && 'line_item_active']"
      @click="() => handleSet(line)"
    >
      <div class="title">付费专线{{ index + 1 }}</div>
      <div class="desc">速度更快（限时免费）</div>
    </div>
    <div class="cus_line">
      <div
        :class="['line_item', 'cus' === selectId && 'line_item_active']"
        @click="() => handleSet('cus')"
      >
        <div class="title">自定义线路</div>
        <div class="desc">使用自己的key</div>
      </div>
      <div>
        <t-form>
          <t-form-item label="key" name="key">
            <t-input placeholder="openai的key" />
          </t-form-item>
          <t-form-item label="服务器网址" name="baseUrl">
            <t-input placeholder="中转服务器地址，不填则默认openai官方" />
          </t-form-item>
        </t-form>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'
const lineList = ref<Line[]>([])
const freeLineList = computed(() => {
  return lineList.value.filter((line) => line.isFree)
})
const payLineList = computed(() => {
  return lineList.value.filter((line) => !line.isFree)
})
const selectId = ref('')
function handleSet(line: Line | string) {
  if (typeof line === 'string') {
    selectId.value = line
  } else {
    selectId.value = line.$id
  }
}
</script>
