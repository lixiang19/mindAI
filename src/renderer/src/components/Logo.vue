<template>
  <div v-if="bg" :class="[size, 'bg']">
    <img :src="logoSrc" />
  </div>
  <img v-else :src="logoSrc" :class="[size]" />
</template>
<script setup lang="ts">
import logoSrc from '../assets/img/logo.png'
defineProps({
  size: {
    type: String,
    default: 'small'
  },
  bg: {
    type: Boolean,
    default: false
  }
})
</script>
<style lang="less" scoped>
.mini {
  height: 3rem;
  width: 3rem;
}
.small {
  height: 5rem;
  width: 5rem;
}
.bg {
  background-color: #2f1977;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
  img {
    object-fit: scale-down;
    height: 80%;
  }
}
</style>
