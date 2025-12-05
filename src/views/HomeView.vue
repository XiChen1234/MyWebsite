<script setup lang="ts">
import SideBar from '@/components/layout/SideBar.vue';
import NavigationBar from '@/components/layout/NavigationBar.vue';
import PageBox from '@/components/layout/PageBox.vue';
import FooterBar from '@/components/layout/FooterBar.vue';

const pageList = ['Home', 'About', 'Skill', 'Career', 'Portfolio', 'Contact'] as const;
</script>

<template>
  <div class="container">
    <SideBar />
    <!-- 游戏中心入口按钮 -->
    <div class="game-center-entry">
      <router-link to="/games" target="_blank" rel="noopener noreferrer">
        <span>🎮</span>
      </router-link>
    </div>
    <NavigationBar />
    <div class="page-list">
      <div class="page-item" v-for="item in pageList" :key="item">
        <PageBox :content="item" />
      </div>
    </div>
    <FooterBar />
  </div>
</template>

<style scoped>
.container {
  min-width: 260px;
  background-color: var(--common-bg);
}

/* 游戏中心入口按钮样式 - 背景透明，悬挂左侧中上位置 */
.game-center-entry {
  position: fixed;
  top: 50%;
  left: 7%;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  background-color: transparent;
  border-radius: 50%;
  cursor: pointer;
  border: 3px solid var(--border);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

/* 按钮悬停效果 - 类似SideBar的hover效果，不改变形状 */
.game-center-entry:hover {
  opacity: 1;
  box-shadow: 0 0 10px 2px var(--transparent-black);
  border: 3px solid var(--button-bg-orange);
  transform: translateY(-50%) scale(1.1);
}

/* 按钮内部链接样式 */
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

/* 游戏图标样式 - 🎮 emoji */
.game-center-entry span {
  font-size: 30px;
  margin-bottom: 10px;
  transition: all 0.3s ease;
}

/* 悬停时图标效果 */
.game-center-entry:hover span {
  color: var(--button-bg-orange);
  transform: rotate(15deg);
}

/* 页面列表样式 */
.page-list {
  margin-top: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
}

.page-item {
  width: 100%;
  display: flex;
  justify-content: center;
}

/* 响应式设计 */
@media (max-width: 1023px) {
  .game-center-entry {
    left: 5%;
  }
}

@media (max-width: 480px) {
  .game-center-entry {
    left: 4%;
    width: 45px;
    height: 45px;
    border-width: 2px;
    transform: scale(0.8) translateY(-50%);
  }

  .game-center-entry span {
    font-size: 26px;
  }

  .game-center-entry:hover {
    transform: scale(0.9) translateY(-50%);
  }
}
</style>
