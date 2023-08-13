<template>
  <div id="Menu">
    <div class="menu_icon_box">
      <Logo></Logo>
    </div>
    <div class="menu_box">
      <div
        v-for="(item, index) in menuList"
        :key="index"
        :class="['menu_item', route.path.includes(item.path) && 'isActive']"
        @click="router.push(item.path)"
      >
        <img alt="dropdown icon" :src="item.icon" />
      </div>
    </div>
    <div class="user_box cursor-pointer">
      <Divider type="solid" />
      <t-tooltip content="帮助">
        <Avatar label="?" class="mr-2" size="normal" shape="circle"
      /></t-tooltip>
    </div>
  </div>
</template>

<script setup lang="ts">
import Avatar from 'primevue/avatar'
import Divider from 'primevue/divider'
import yuedu from '../assets/icon/yuedu.svg'
import note from '../assets/icon/note.svg'
import chat from '../assets/icon/chat.svg'
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Logo from './Logo.vue'
const menuList = ref([
  {
    path: '/chat',
    icon: chat
  },
  {
    path: '/write',
    icon: note
  },
  {
    path: '/demo',
    icon: yuedu
  }
])
const router = useRouter()
const route = useRoute()
</script>

<style lang="less" scoped>
#Menu {
  height: 100%;
  width: 60px;
  background: var(--td-brand-color-4); //
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  .menu_icon_box {
    background: var(--td-brand-color-2);
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 30px;
      height: 30px;
    }
  }
  .menu_box {
    display: flex;
    flex-direction: column;
    padding: 20px 10px;
    .menu_item {
      height: 40px;
      width: 40px;
      margin-bottom: 15px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      img {
        width: 26px;
        height: 26px;
      }
      &:hover {
        background: var(--td-brand-color-5);
        border-radius: 5px;
      }
    }
    .isActive {
      background: var(--td-brand-color-5);
      border-radius: 5px;
    }
  }
  .user_box {
    margin-top: auto;
    padding: 0 10px;
    height: 90px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
