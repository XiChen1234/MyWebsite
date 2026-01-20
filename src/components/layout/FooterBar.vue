<!-- 页脚组件 -->
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import beian from '@/assets/img/beian.png';

// 最后更新时间
const lastUpdate = ref('2026年01月');

// 网站开始运行时间常量
const SITE_START_TIME = new Date('2025-10-22T15:30:00'); // 示例起始时间

// 响应式数据：运营时间
const uptime = ref({
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0
});

// 计算网站运营时间函数
const calculateUptime = () => {
  const now = new Date();
  const diffMs = now.getTime() - SITE_START_TIME.getTime();

  // 计算天数、小时、分钟和秒
  uptime.value.days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  uptime.value.hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  uptime.value.minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  uptime.value.seconds = Math.floor((diffMs % (1000 * 60)) / 1000);
};

// 定时器引用
let timer: number | null = null;

// 组件挂载时启动计时器
onMounted(() => {
  // 初始计算一次
  calculateUptime();
  // 每秒更新一次
  timer = window.setInterval(calculateUptime, 1000);
});

// 组件卸载时清除计时器
onUnmounted(() => {
  if (timer !== null) {
    clearInterval(timer);
  }
});
</script>

<template>
  <footer class="footer">
    <!-- 版权信息 -->
    <div class="copyright">
      © 2025 XiChen. All Rights Reserved.
    </div>

    <!-- 备案号 -->
    <div class="beian">
      <img :src="beian" alt="ICP备案图标" class="beian-icon">
      <a href="https://beian.mps.gov.cn/#/query/webSearch?code=61011302002190"
      rel="noreferrer" target="_blank">陕公网安备61011302002190号</a>
      <a href="https://beian.miit.gov.cn/" target="_blank">
        陕ICP备2025081193号-1
      </a>
    </div>

    <!-- 社交链接 -->
    <div class="social">
      <a href="mailto:xichen888.private@gmail.com">
        Email
      </a>
      <a href="https://github.com/XiChen1234" target="_blank">
        GitHub
      </a>
      <a href="https://juejin.cn/user/2878958587880362" target="_blank">
        稀土掘金
      </a>
    </div>

    <!-- 导航链接 -->
    <div class="nav">
      <a href="#home" class="nav-link">首页</a>
      <span class="nav-divider">·</span>
      <a href="#about" class="nav-link">关于</a>
      <span class="nav-divider">·</span>
      <a href="#skill" class="nav-link">技能</a>
      <span class="nav-divider">·</span>
      <a href="#career" class="nav-link">经历</a>
      <span class="nav-divider">·</span>
      <a href="#portfolio" class="nav-link">作品</a>
      <span class="nav-divider">·</span>
      <a href="#contact" class="nav-link">联系</a>
    </div>

    <!-- 网站信息 -->
    <div class="info">
      <span>最后更新：{{ lastUpdate }}</span>
      <span>由Vue 3 + TypeScript构建</span>
    </div>

    <!-- 运营时间 -->
    <div class="uptime">
      <span class="uptime-status">🟢</span>
      <span class="uptime-text">
        本网站已持续运行 {{ uptime.days }} 天 {{ uptime.hours }} 小时 {{ uptime.minutes }} 分钟 {{ uptime.seconds }} 秒
      </span>
    </div>
  </footer>
</template>

<style scoped>
/* 页脚容器 */
.footer {
  padding: 2rem 0;
  width: 100%;
  background-color: var(--footer-bg);
  color: var(--footer-text);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  position: relative;
  overflow: hidden;
}

/* 版权信息 */
.copyright {
  font-size: 1.1rem;
  font-weight: 500;
  text-align: center;
  letter-spacing: 0.5px;
}

/* 备案信息样式 */
.beian {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
}

/* 备案图标样式 */
.beian-icon {
  width: 16px;
  height: 16px;
}

/* 备案链接样式 */
.beian a {
  font-size: 0.9rem;
}

/* 社交链接容器 */
.social {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.2rem;
}

/* 社交链接样式 */
.social a {
  align-items: center;
  gap: 0.4rem;
  text-decoration: none;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
}

/* 社交链接悬停效果 */
.social a:hover {
  background-color: var(--transparent);
  transform: translateY(-2px);
  color: var(--orange-800);
}

/* 导航链接容器 */
.nav {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.8rem;
  font-size: 0.95rem;
  max-width: 800px;
}

/* 导航链接样式 */
.nav-link {
  color: inherit;
  padding: 0.4rem 0.8rem;
  border-radius: 10px;
  transition: all 0.3s ease;
}

/* 导航链接悬停效果 */
.nav-link:hover {
  color: var(--orange-800);
  background-color: var(--transparent);
}

/* 导航链接下划线动画 */
.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: var(--orange-300);
  transition: width 0.3s ease;
}

.nav-link:hover::after {
  width: 100%;
}

/* 网站信息容器 */
.info {
  font-size: 0.85rem;
  color: var(--orange-200);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
}

/* 运营时间容器 */
.uptime {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  font-size: 0.85rem;
  padding: 0.5rem 1rem;
  background-color: var(--transparent);
  border-radius: 20px;
  border: 1px solid var(--transparent-gray);
  width: 80%;
}

/* 分隔符样式 */
.social-divider, .nav-divider {
  color: var(--transparent-gray);
  font-size: 20px;
}

/* 响应式设计 - 平板尺寸 */
@media (max-width: 768px) {
  .footer {
    padding: 1.75rem 0;
    gap: 1.2rem;
  }

  .copyright {
    font-size: 1rem;
  }

  .social, .nav {
    font-size: 0.9rem;
    gap: 0.6rem;
  }

  .social-link, .nav-link {
    padding: 0.3rem 0.6rem;
  }

  .info {
    font-size: 0.8rem;
    flex-direction: column;
    gap: 0.5rem;
  }

  /* 移除分隔符 */
  .social-divider, .nav-divider {
    display: none;
  }
}

/* 响应式设计 - 移动设备 */
@media (max-width: 480px) {
  .social a {
    width: 60px;
  }
  .nav-link {
    display: none;
  }
}

/* 动画效果 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.footer > * {
  animation: fadeIn 0.5s ease-out;
}

</style>
