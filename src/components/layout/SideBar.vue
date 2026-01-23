<!-- 侧边栏组件：包含返回顶端按钮和游戏中心入口 -->
<script setup lang="ts">
</script>

<template>
  <div class="sidebar">
    <!-- 游戏中心入口 -->
    <div class="sidebar-item game-center-entry">
      <router-link to="/games" target="_blank" rel="noopener noreferrer">
        <span>🎮</span>
      </router-link>
    </div>

    <!-- 返回顶端按钮 -->
    <div class="sidebar-item back-to-top">
      <a href="#">
        <i class="iconfont icon-right"></i>
      </a>
    </div>
  </div>
</template>

<style scoped>
.sidebar {
  position: fixed;
  bottom: 10%;
  right: 7%;
  display: flex;
  flex-direction: column;
  gap: 15px;
  z-index: 99;
}

.sidebar-item {
  width: 50px;
  height: 50px;
  background-color: var(--page-bg);
  border-radius: 50%;
  cursor: pointer;
  opacity: 50%;
  border: 3px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.sidebar-item:hover {
  opacity: 1;
  box-shadow: 0 0 10px 2px var(--transparent-black);
  border: 3px solid var(--border-color-focus);
}

/* 游戏中心入口样式 */
.game-center-entry {
  position: relative;
  background-color: transparent;
}

.game-center-entry:hover {
  border: 3px solid var(--button-bg-orange);
}

.game-center-entry a {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: var(--text-main);
  transition: all 0.3s ease;
}

.game-center-entry span {
  font-size: 30px;
  margin-bottom: 10px;
  transition: all 0.3s ease;
}

.game-center-entry:hover span {
  color: var(--button-bg-orange);
  transform: rotate(15deg);
}

/* 返回顶端按钮样式 */
.back-to-top a {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
  display: flex;
  align-items: center;
  justify-content: center;
}

.back-to-top a .iconfont {
  font-size: 28px;
  color: var(--text-main);
  transition: all 0.3s ease;
}

.back-to-top:hover a .iconfont {
  color: var(--text-main-focus);
}

/* 响应式设计 */
@media (max-width: 1023px) {
  .sidebar {
    right: 5%;
  }
}

@media (max-width: 480px) {
  .sidebar {
    right: 4%;
    transform: scale(0.8);
  }

  .sidebar-item {
    width: 45px;
    height: 45px;
    border-width: 2px;
  }

  .game-center-entry span {
    font-size: 26px;
  }

  .back-to-top a .iconfont {
    font-size: 24px;
  }
}
</style>
