<template>
  <div class="stop">
    <div class="eye eye_1"></div>
    <div class="eye eye_2"></div>
  </div>
</template>
<style lang="less" scoped>
.stop {
  height: 100%;
  width: 100%;
  position: relative;
  .eye {
    height: 0.8rem;
    width: 0.3rem;
    background: #000;
    border-radius: 0.1rem;
    position: absolute;
    top: 1rem;
    // 先两次leftLook再两次rightLook再blink，循环
    animation: blink 3s;
    animation-iteration-count: infinite;
    transform-origin: center;
  }
  .eye_1 {
    left: 1rem;
  }
  .eye_2 {
    right: 1rem;
  }
  @keyframes blink {
    0% {
      transform: rotate(0deg) translateX(0) scale(1);
    }
    20% {
      transform: rotate(-5deg) translateX(-0.4rem) scale(0.9);
    }
    40% {
      transform: rotate(0deg) translateX(0) scale(1);
    }
    60% {
      transform: rotate(5deg) translateX(0.4rem) scale(0.9);
    }
    80% {
      transform: rotate(0deg) translateX(0) scale(1);
    }
    85% {
      transform: scale(1, 0.1);
    }
    90% {
      transform: scale(1, 1);
    }
    95% {
      transform: scale(1, 0.1);
    }
    100% {
      transform: scale(1, 1);
    }
  }
}
</style>
