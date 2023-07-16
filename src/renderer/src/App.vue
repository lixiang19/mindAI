<script setup lang="ts">
import Layout from './components/Layout.vue'
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
</style>
