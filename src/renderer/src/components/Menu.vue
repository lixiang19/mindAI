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
        <t-tooltip placement="right" :content="item.help">
          <i :class="item.icon"></i>
        </t-tooltip>

        <!-- <img alt="dropdown icon" :src="item.icon" /> -->
      </div>
    </div>
    <div class="user_box cursor-pointer">
      <Divider type="solid" />
      <t-tooltip content="帮助" placement="right">
        <Avatar label="?" size="normal" shape="circle" @click="router.push('/help')"
      /></t-tooltip>
      <t-tooltip content="设置" placement="right">
        <Avatar
          icon="ri-settings-line"
          size="normal"
          shape="circle"
          @click="router.push('/setting')"
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
    icon: 'ri-message-3-line',
    help: '对话'
  },
  {
    path: '/write',
    icon: 'ri-draft-line',
    help: '写作'
  },
  {
    path: '/read',
    icon: 'ri-book-read-line',
    help: '阅读'
  },
  {
    path: '/knowledge',
    icon: 'ri-archive-2-line',
    help: '知识库'
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
      i {
        font-size: 1.5rem;
        color: white;
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
    padding: 0 0.1rem;
    height: 10rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
  }
}
</style>
