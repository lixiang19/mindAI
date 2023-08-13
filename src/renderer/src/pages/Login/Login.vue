<template>
  <teleport to="#app">
    <div id="Login">
      <div class="guide flex flex-column gap-7">
        <div class="flex align-items-center gap-2">
          <Logo size="mini" bg></Logo>
          <div class="text-yuanti font-bold text-900">MindAI</div>
        </div>
        <div class="text-yuanti text-6xl text-900">你的第二大脑</div>
        <div class="text-yuanti text-xl text-500">
          MindAI，记录你的笔记、知识、灵感在知识库内，让你的思维不再受限。AI助手随时为你解答疑惑，从知识库及网络中提取数据，为你提供准确的答案。多重角色的AI伙伴，陪伴你探索不同领域！
        </div>
      </div>
      <div class="login_form shadow-5 surface-card border-round-xl px-5 py-4">
        <ComponentLogin></ComponentLogin>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import ComponentLogin from './components/ComponentLogin.vue'
import Logo from '@renderer/components/Logo.vue'
</script>

<style lang="less" scoped>
#Login {
  position: fixed;
  height: 100vh;
  width: 100vw;
  left: 0;
  top: 0;
  background: url('../../assets/img/loginbg.jpg') no-repeat center center / cover;
  display: flex;
  align-items: center;
  justify-content: space-around;
  .guide {
    height: 30rem;
    width: 30rem;
  }
  .login_form {
    height: 40rem;
    width: 30rem;
  }
}
</style>
