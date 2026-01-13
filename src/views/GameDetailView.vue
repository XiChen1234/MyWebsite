<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

// 扩展游戏数据类型，添加详细简介
interface Game {
  id: string;
  name: string;
  description: string;
  icon: string;
  path: string;
  bgColor: string;
  detailedDescription: string;
  rules: string[];
  tips: string[];
}

// 游戏详细数据
const games: Game[] = [
  {
    id: 'paws_up',
    name: 'Paws Up! - 猫爪在上',
    description: '一款可爱治愈的节奏音游',
    icon: '🐱',
    path: '/game/paws_up/',
    bgColor: '#4baec0',
    detailedDescription: 'Paws Up! 是一款轻松治愈的单音轨节奏音游。玩家跟随音乐节拍，使用 Space 施展猫猫拳、使用 Enter 发出猫猫哈气，精准打击出现的音符以获得判定与分数。密集的谱面，特殊的“快速连打”音符，五位性格迥异的npc对应五首特别的音乐，当然还有最重要的——可爱的小猫！',
    rules: [
      '使用Space控制猫猫拳',
      '使用Enter控制猫猫哈气',
      '根据音乐节奏打击不同的音符，最后取得高分和胜利'
    ],
    tips: [
      '切勿心急，先熟悉节拍与判定',
      '手保持在 Space 与 Enter 上，减少手部移动',
      '优先保证连击，遇到难点段落宁可少击也要稳节奏',
      '根据音符样式快速区分猫猫拳与哈气，提前预判',
      '听歌辨识鼓点与强拍，跟随主节奏而非背景旋律',
      '错失音符时立刻回到拍点，不要急于补按'
    ]
  },
  {
    id: '2048',
    name: '2048',
    description: '经典数字益智游戏，通过合并相同数字获得2048！',
    icon: '🎮',
    path: '/game/2048/',
    bgColor: '#f7b32d',
    detailedDescription: '2048是一款简单而富有挑战性的数字益智游戏。游戏目标是通过滑动数字方块，合并相同数字，最终得到2048这个数字。游戏规则简单，但要获得高分需要策略和技巧。',
    rules: [
      '使用方向键或触摸屏滑动数字方块',
      '相同数字的方块碰撞时会合并',
      '每次滑动后会随机生成一个2或4的新方块',
      '当所有方块都被填满且无法合并时，游戏结束',
      '合并数字方块获得分数，目标是得到2048'
    ],
    tips: [
      '尽量将大数字保持在角落',
      '形成单一方向的数字链',
      '避免将小数字分散在各处',
      '合理利用空格，保持游戏的流畅性',
      '耐心思考每一步的后果'
    ]
  },
  {
    id: 'snake',
    name: '贪吃蛇',
    description: '控制蛇头吃食物，越长越有挑战性！',
    icon: '🐍',
    path: '/game/snake/',
    bgColor: '#50e3c2',
    detailedDescription: '贪吃蛇是一款经典的休闲游戏，玩家控制一条蛇在屏幕上移动，通过吃食物来增长身体。随着蛇的长度增加，游戏难度也会提高，需要玩家更加小心地控制蛇的移动，避免撞到墙壁或自己的身体。',
    rules: [
      '使用方向键控制蛇的移动方向',
      '蛇吃到食物后身体会变长',
      '撞到墙壁或自己的身体时游戏结束',
      '每吃一个食物获得一定分数',
      '游戏速度会逐渐加快'
    ],
    tips: [
      '尽量在开阔区域移动',
      '规划蛇的移动路径，避免死胡同',
      '利用蛇身的长度创造包围食物的机会',
      '保持蛇头朝向食物的方向',
      '注意观察蛇身的位置'
    ]
  },
  {
    id: 'minesweeper',
    name: '扫雷',
    description: '经典的逻辑推理游戏，小心隐藏的地雷！',
    icon: '💣',
    path: '/game/minesweeper/',
    bgColor: '#9013fe',
    detailedDescription: '扫雷是一款经典的逻辑推理游戏，玩家需要在一个方格棋盘上找出所有的地雷，同时避免触发它们。游戏通过点击方格来揭示其下的内容，数字表示周围地雷的数量，玩家需要利用这些信息推断出地雷的位置。',
    rules: [
      '点击方格揭示其内容',
      '数字表示周围8个方格中的地雷数量',
      '右键点击标记可能的地雷位置',
      '揭示所有非地雷方格获胜',
      '触发地雷游戏结束'
    ],
    tips: [
      '从角落或边缘开始游戏',
      '利用数字推理地雷位置',
      '先处理确定的安全区域',
      '合理使用标记功能',
      '注意观察数字之间的关系'
    ]
  },
  {
    id: 'cattle_pay',
    name: '牛马时薪计算器',
    description: '计算你的牛马时薪，考虑到工作时间、休息时间、奖励等因素。',
    icon: '🖼️',
    path: '/game/cattle_pay/',
    bgColor: '#8B0000',
    detailedDescription: '牛马时薪计算器是一款用于计算打工人时薪的工具。用户需要输入工作时间、休息时间、奖励等因素，计算器会根据这些信息计算出你的牛马时薪。',
    rules: [
      '按照要求输入工作相关参数',
      '点击计算按钮，即可得到牛马时薪',
      '有概率解锁部分成就哦'
    ],
    tips: [
      '确保输入的时间和金额都是正确的',
    ]
  }
];

// 获取路由参数
const route = useRoute();
const router = useRouter();
const gameName = route.params.gameName as string;

// 查找当前游戏数据
const currentGame = games.find(game => game.id === gameName);

// 调试信息 - 查看路由参数和匹配结果
console.log('路由参数 gameName:', gameName);
console.log('匹配到的游戏:', currentGame);
console.log('可用游戏列表:', games.map(g => g.id));

// 返回游戏中心
const goBack = () => {
  router.push('/games');
};

// 全屏功能相关
const gameIframe = ref<HTMLIFrameElement | null>(null);
const iframeContainer = ref<HTMLDivElement | null>(null);
const isFullscreen = ref(false);

// 定义全屏API的扩展类型
interface DocumentFullscreen extends Document {
  webkitExitFullscreen?: () => Promise<void>;
  msExitFullscreen?: () => Promise<void>;
  webkitFullscreenElement?: Element | null;
  msFullscreenElement?: Element | null;
}

interface HTMLElementFullscreen extends HTMLElement {
  webkitRequestFullscreen?: () => Promise<void>;
  msRequestFullscreen?: () => Promise<void>;
}

// 切换全屏
const toggleFullscreen = async () => {
  if (!iframeContainer.value) return;

  const doc = document as DocumentFullscreen;
  const container = iframeContainer.value as HTMLElementFullscreen;

  try {
    if (isFullscreen.value) {
      // 退出全屏
      if (doc.exitFullscreen) {
        await doc.exitFullscreen();
      } else if (doc.webkitExitFullscreen) {
        await doc.webkitExitFullscreen();
      } else if (doc.msExitFullscreen) {
        await doc.msExitFullscreen();
      }
      isFullscreen.value = false;
    } else {
      // 进入全屏
      if (container.requestFullscreen) {
        await container.requestFullscreen();
      } else if (container.webkitRequestFullscreen) {
        await container.webkitRequestFullscreen();
      } else if (container.msRequestFullscreen) {
        await container.msRequestFullscreen();
      }
      isFullscreen.value = true;
    }
  } catch (error) {
    console.error('全屏操作失败:', error);
    alert('全屏功能不可用，请检查浏览器设置');
  }
};

// 全屏状态变化处理函数
const handleFullscreenChange = () => {
  const doc = document as DocumentFullscreen;
  isFullscreen.value = !!doc.fullscreenElement ||
                       !!doc.webkitFullscreenElement ||
                       !!doc.msFullscreenElement;
};

// 监听全屏状态变化
onMounted(() => {
  document.addEventListener('fullscreenchange', handleFullscreenChange);
  document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
  document.addEventListener('MSFullscreenChange', handleFullscreenChange);
});

// 清理事件监听器
onUnmounted(() => {
  document.removeEventListener('fullscreenchange', handleFullscreenChange);
  document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
  document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
});
</script>

<template>
  <div class="game-detail-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <button class="back-button" @click="goBack">
          <i class="iconfont icon-left"></i>
          <span>返回游戏中心</span>
        </button>
        <h1 class="game-title">
          <span class="game-icon">{{ currentGame?.icon }}</span>
          {{ currentGame?.name }}
        </h1>
      </div>
    </div>

    <!-- 主要内容区 -->
    <div class="main-content">
      <!-- 游戏嵌入区 -->
      <div class="game-container">
        <template v-if="currentGame">
          <div class="game-header">
            <h3>{{ currentGame.name }} 游戏</h3>
            <button class="fullscreen-button" @click="toggleFullscreen">
              <i class="iconfont icon-fullscreen"></i>
              {{ isFullscreen ? '退出全屏' : '全屏游戏' }}
            </button>
          </div>
          <div ref="iframeContainer" class="iframe-container">
            <iframe
              ref="gameIframe"
              :src="currentGame ? `${currentGame.path}index.html` : ''"
              frameborder="0"
              class="game-iframe"
              title="Game"
            ></iframe>
          </div>
        </template>
        <div v-else class="game-not-found">
          <h2>游戏未找到</h2>
          <p>抱歉，当前游戏不存在或正在开发中。</p>
          <button class="back-button" @click="goBack">返回游戏中心</button>
        </div>
      </div>

      <!-- 游戏详情区 -->
      <div class="game-info" v-if="currentGame">
        <div class="info-card">
          <h2 class="info-title">游戏简介</h2>
          <p class="detailed-description">{{ currentGame.detailedDescription }}</p>
        </div>

        <div class="info-card">
          <h2 class="info-title">游戏规则</h2>
          <ul class="rule-list">
            <li v-for="(rule, index) in currentGame.rules" :key="index">
              <i class="iconfont icon-check-circle"></i>
              <span>{{ rule }}</span>
            </li>
          </ul>
        </div>

        <div class="info-card">
          <h2 class="info-title">游戏技巧</h2>
          <ul class="tip-list">
            <li v-for="(tip, index) in currentGame.tips" :key="index">
              <i class="iconfont icon-lightbulb"></i>
              <span>{{ tip }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 页面基本样式 */
.game-detail-page {
  width: 100%;
  min-height: 100vh;
  background-color: var(--page-bg);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
}

/* 页面头部样式 */
.page-header {
  width: 100%;
  max-width: 1200px;
  margin-bottom: 30px;
}

.header-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

/* 返回按钮样式 */
.back-button {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--button-bg-orange);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
  align-self: flex-start;
  text-decoration: none;
}

.back-button:hover {
  background-color: #e67e22;
  transform: translateX(-3px);
  color: white;
  box-shadow: 0 4px 12px rgba(230, 126, 34, 0.3);
}

.back-button i {
  margin-right: 6px;
  font-size: 16px;
}

/* 游戏标题样式 */
.game-title {
  font-size: 36px;
  font-weight: bold;
  color: var(--text-main);
  display: flex;
  align-items: center;
  gap: 15px;
  margin: 0;
}

.game-icon {
  font-size: 48px;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

/* 主要内容区样式 */
.main-content {
  width: 100%;
  max-width: 1200px;
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 30px;
  flex: 1;
}

/* 游戏容器样式 */
.game-container {
  background: var(--card-bg);
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  min-height: 600px;
  width: 100%;
}

/* 游戏头部样式 */
.game-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 15px;
}

.game-header h3 {
  font-size: 18px;
  font-weight: bold;
  color: var(--text-main);
  margin: 0;
}

/* 全屏按钮样式 */
.fullscreen-button {
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: var(--button-bg-orange);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
}

.fullscreen-button:hover {
  background-color: var(--button-hover-orange);
  transform: translateY(-2px);
}

.fullscreen-button i {
  font-size: 16px;
}

/* iframe容器样式 */
.iframe-container {
  width: 100%;
  height: 100%;
  min-height: 500px;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
}

/* 游戏iframe样式 - 增大尺寸 */
.game-iframe {
  width: 100%;
  height: 100%;
  min-height: 500px;
  border: none;
  background-color: #fff;
}

/* 全屏状态样式 */
.iframe-container:fullscreen {
  width: 100vw;
  height: 100vh;
  min-height: 100vh;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0;
}

.iframe-container:-webkit-full-screen {
  width: 100vw;
  height: 100vh;
  min-height: 100vh;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0;
}

.iframe-container:-ms-fullscreen {
  width: 100vw;
  height: 100vh;
  min-height: 100vh;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0;
}

.iframe-container:fullscreen .game-iframe {
  width: 100vw;
  height: 100vh;
  min-height: 100vh;
  max-width: 100vw;
  max-height: 100vh;
}

.iframe-container:-webkit-full-screen .game-iframe {
  width: 100vw;
  height: 100vh;
  min-height: 100vh;
  max-width: 100vw;
  max-height: 100vh;
}

.iframe-container:-ms-fullscreen .game-iframe {
  width: 100vw;
  height: 100vh;
  min-height: 100vh;
  max-width: 100vw;
  max-height: 100vh;
}

/* 游戏未找到样式 */
.game-not-found {
  text-align: center;
  padding: 60px 20px;
}

.game-not-found h2 {
  font-size: 24px;
  color: var(--text-main);
  margin-bottom: 10px;
}

.game-not-found p {
  color: var(--text-secondary);
  margin-bottom: 30px;
}

/* 游戏详情样式 */
.game-info {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* 信息卡片样式 */
.info-card {
  background: var(--card-bg);
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
}

.info-title {
  font-size: 20px;
  font-weight: bold;
  color: var(--text-main);
  margin: 0 0 15px 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.info-title::before {
  content: '';
  display: inline-block;
  width: 4px;
  height: 20px;
  background-color: var(--button-bg-orange);
  border-radius: 2px;
}

/* 详细描述样式 */
.detailed-description {
  font-size: 14px;
  line-height: 1.6;
  color: var(--text-secondary);
  margin: 0;
}

/* 规则和技巧列表样式 */
.rule-list, .tip-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.rule-list li, .tip-list li {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 14px;
  line-height: 1.5;
  color: var(--text-secondary);
}

.rule-list i, .tip-list i {
  font-size: 16px;
  color: var(--button-bg-orange);
  margin-top: 2px;
  flex-shrink: 0;
}

/* 响应式设计 */
@media (max-width: 1023px) {
  .main-content {
    grid-template-columns: 1fr;
    gap: 25px;
  }

  .game-title {
    font-size: 28px;
  }

  .game-icon {
    font-size: 40px;
  }

  .info-card {
    padding: 15px;
  }
}

@media (max-width: 480px) {
  .game-detail-page {
    padding: 15px 10px;
  }

  .page-header {
    margin-bottom: 20px;
  }

  .header-content {
    gap: 10px;
  }

  .game-title {
    font-size: 24px;
    text-align: center;
    align-self: center;
  }

  .game-icon {
    font-size: 36px;
  }

  .main-content {
    gap: 20px;
  }

  .game-container {
    padding: 15px;
    min-height: 400px;
  }

  .game-iframe {
    min-height: 400px;
  }

  .back-button {
    font-size: 13px;
    padding: 6px 12px;
  }

  .info-title {
    font-size: 18px;
  }

  .rule-list li, .tip-list li {
    font-size: 13px;
  }
}
</style>
