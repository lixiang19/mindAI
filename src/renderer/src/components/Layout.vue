<template>
  <div id="Layout">
    <Menu></Menu>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import Menu from './Menu.vue'
</script>

<style lang="less" scoped>
#Layout {
  width: 100%;
  height: 100%;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .content {
    width: calc(100% - 60px);
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
