<script setup lang="ts">
import { onMounted } from 'vue'
import Layout from './components/Layout.vue'
import { BingSearch } from './plugins/bingSearch'
onMounted(() => {
  // const bingSearch = new BingSearch({})
  // bingSearch.preUserMessage({
  //   role: 'user',
  //   content: 'ts里的using是什么'
  // })
})
</script>

<template>
  <Layout>
    <router-view></router-view>
  </Layout>
</template>

<style lang="less">
@import './assets/css/styles.less';
@import 'primeflex/primeflex.css';
@import './assets/theme.css';
@import 'primeicons/primeicons.css';
@import './assets/tdtheme.css';
</style>
