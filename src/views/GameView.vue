<script setup lang="ts">
// 游戏数据类型定义
interface Game {
  id: string;
  name: string;
  description: string;
  icon: string;
  path: string;
  bgColor: string;
}

// 游戏列表数据，包含2048和其他假数据游戏
const games: Game[] = [
  {
    id: '2048',
    name: '2048',
    description: '经典数字益智游戏，通过合并相同数字获得2048！',
    icon: '🎮',
    path: '/game/2048/',
    bgColor: '#f7b32d'
  },
  {
    id: 'tetris',
    name: '俄罗斯方块',
    description: '经典的方块堆叠游戏，考验你的空间想象力！',
    icon: '🧱',
    path: '/game/tetris/',
    bgColor: '#4a90e2'
  },
  {
    id: 'snake',
    name: '贪吃蛇',
    description: '控制蛇头吃食物，越长越有挑战性！',
    icon: '🐍',
    path: '/game/snake/',
    bgColor: '#50e3c2'
  },
  {
    id: 'minesweeper',
    name: '扫雷',
    description: '经典的逻辑推理游戏，小心隐藏的地雷！',
    icon: '💣',
    path: '/game/minesweeper/',
    bgColor: '#9013fe'
  },
  {
    id: 'sudoku',
    name: '数独',
    description: '九宫格数字填充游戏，锻炼你的逻辑思维！',
    icon: '🔢',
    path: '/game/sudoku/',
    bgColor: '#f5a623'
  },
  {
    id: 'breakout',
    name: '打砖块',
    description: '控制挡板反弹球，击碎所有砖块！',
    icon: '🏓',
    path: '/game/breakout/',
    bgColor: '#e95793'
  }
];
</script>

<template>
  <div class="game-center-page">
    <!-- 页面标题 -->
    <div class="page-header">
      <h1>
        Game <span class="highlight">Center</span>
      </h1>
      <p class="subtitle">探索我的游戏收藏，点击卡片开始游戏</p>
    </div>

    <!-- 游戏列表 -->
    <div class="games-container">
      <div
        v-for="game in games"
        :key="game.id"
        class="game-card"
        :style="{ '--game-bg-color': game.bgColor }"
      >
        <div class="game-icon">{{ game.icon }}</div>
        <h2 class="game-name">{{ game.name }}</h2>
        <p class="game-description">{{ game.description }}</p>
        <a
          :href="game.path"
          target="_blank"
          rel="noopener noreferrer"
          class="play-button"
        >
          <i class="iconfont icon-right"></i>
          <strong>Play Now</strong>
        </a>
      </div>
    </div>

    <!-- 空状态提示（当游戏数量为0时显示） -->
    <div v-if="games.length === 0" class="empty-state">
      <i class="iconfont icon-game"></i>
      <h3>暂无游戏</h3>
      <p>游戏开发中，敬请期待！</p>
    </div>
  </div>
</template>

<style scoped>
/* 确保页面底色铺满整个屏幕 */
.game-center-page {
  width: 100%;
  min-height: 100vh;
  background-color: var(--page-bg);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 60px 20px;
  box-sizing: border-box;
}

/* 页面标题样式 */
.page-header {
  text-align: center;
  margin-bottom: 60px;
  width: 100%;
  max-width: 1200px;
}

.page-header h1 {
  font-size: 48px;
  font-weight: bold;
  color: var(--text-main);
  margin-bottom: 10px;
}

.page-header h1 .highlight {
  color: var(--button-bg-orange);
}

.subtitle {
  font-size: 18px;
  color: var(--text-secondary);
  margin: 0;
}

/* 游戏容器样式 - 调整为更简洁的布局 */
.games-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 30px;
  width: 100%;
  max-width: 1200px;
}

/* 游戏卡片样式 - 更简洁的设计 */
.game-card {
  background: var(--card-bg);
  border-radius: 16px;
  padding: 30px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.game-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--game-bg-color);
}

.game-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
}

/* 游戏图标样式 - 适当缩小 */
.game-icon {
  font-size: 60px;
  margin-bottom: 15px;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

/* 游戏名称样式 - 调整字体大小 */
.game-name {
  font-size: 22px;
  font-weight: bold;
  color: var(--text-main);
  margin: 0 0 10px 0;
}

/* 游戏描述样式 - 更简洁的描述 */
.game-description {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.5;
  margin: 0 0 20px 0;
  flex: 1;
  padding: 0 10px;
}

/* 播放按钮样式 - 修改hover效果，与背景明显区分 */
.play-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  background-color: var(--button-bg-orange);
  color: var(--button-text-white);
  padding: 10px 20px;
  border-radius: 25px;
  text-decoration: none;
  transition: all 0.3s ease;
  min-width: 130px;
  border: none;
  cursor: pointer;
}

/* 修改hover效果，使用更深的橙色，确保与背景明显区分 */
.play-button:hover {
  background-color: #e67e22;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 165, 0, 0.3);
}

.play-button i {
  margin-right: 6px;
  font-size: 18px;
  transition: transform 0.3s ease;
}

.play-button:hover i {
  transform: translateX(2px);
}

/* 空状态样式 */
.empty-state {
  text-align: center;
  padding: 80px 20px;
  color: var(--text-secondary);
}

.empty-state i {
  font-size: 120px;
  margin-bottom: 20px;
  opacity: 0.5;
}

.empty-state h3 {
  font-size: 24px;
  margin: 0 0 10px 0;
  color: var(--text-main);
}

.empty-state p {
  font-size: 16px;
  margin: 0;
}

/* 响应式设计 */
@media (max-width: 1023px) {
  .game-center-page {
    padding: 40px 20px;
  }

  .page-header {
    margin-bottom: 40px;
  }

  .page-header h1 {
    font-size: 36px;
  }

  .subtitle {
    font-size: 16px;
  }

  .games-container {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 25px;
  }

  .game-card {
    padding: 25px 15px;
  }

  .game-icon {
    font-size: 50px;
  }

  .game-name {
    font-size: 20px;
  }
}

@media (max-width: 480px) {
  .game-center-page {
    padding: 30px 15px;
  }

  .page-header h1 {
    font-size: 28px;
  }

  .games-container {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .game-card {
    padding: 20px 15px;
  }

  .game-icon {
    font-size: 45px;
  }

  .game-name {
    font-size: 18px;
  }

  .game-description {
    font-size: 13px;
  }

  .play-button {
    font-size: 15px;
    padding: 9px 18px;
  }
}
</style>
