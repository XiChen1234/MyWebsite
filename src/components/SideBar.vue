<!-- 返回顶端按钮 -->
<script setup lang="ts">
</script>

<template>
  <div class="sidebar">
    <a href="#">
      <i class="iconfont icon-right"></i>
    </a>
  </div>
</template>

<style scoped>
.sidebar {
  position: fixed;
  bottom: 10%;
  right: 7%;
  width: 50px;
  height: 50px;
  background-color: var(--page-bg);
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  opacity: 50%;
  border: 3px solid var(--border);
}
.sidebar:hover {
  box-shadow: 0 0 20px 2px var(--border);
  border: 3px solid var(--border-color-focus);
}
.sidebar a {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
  display: flex;
  align-items: center;
  justify-content: center;
}
.sidebar a .iconfont {
  font-size: 28px;
  color: var(--text-main);
}
.sidebar:hover a .iconfont {
  color: var(--text-main-focus);
}


/* 小屏手机 */
@media (max-width: 480px) {
  .sidebar {
    transform: scale(0.8);
  }
}
/* 平板 */
@media (min-width: 481px) and (max-width: 1023px) {
}

</style>
