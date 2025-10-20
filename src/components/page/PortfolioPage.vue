<!-- 作品集页面 -->
<script setup lang="ts">
import SwiperPicture from './ui/SwiperPicture.vue';

/**
 * 作品集项目接口定义
 */
interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  imagePath: string;
  link?: string;
  tags: string[];
}

// 作品集数据 - 硬编码模拟数据
const data: PortfolioItem[] = [
  {
    id: 'project1',
    title: 'MyWebsite',
    description: '使用Vue 3 + TypeScript构建的个人作品集网站，展示我的技能和项目经验。',
    imagePath: '/src/assets/img/MyWebsite.png',
    tags: ['Vue 3', 'TypeScript', 'Vite', 'CSS3'],
    link: 'https://github.com/XiChen1234/MyWebsite'
  },
  {
    id: 'project2',
    title: 'NoBG',
    description: '一个简单、快速、隐私保护的在线图片背景去除工具，完全在浏览器中本地处理，无需上传任何图片到服务器。',
    imagePath: '/src/assets/img/NoBG.png',
    tags: ['TensorFlow.js', 'BodyPix', 'HTML', 'CSS', 'JavaScript'],
    link: 'https://github.com/XiChen1234/NoBG'
  },
  {
    id: 'project3',
    title: '狼人杀统计模拟器',
    description: '设计并实现一个7人局狼人杀游戏模拟器，通过为不同角色设置不同的AI策略，完全自动运行多轮游戏并统计不同策略组合下的各阵营胜率。该系统无需任何真人参与或输入，完全通过AI策略自主模拟游戏进程。 模拟器支持保存每单局对局的游戏进程信息，供系统主查看复盘',
    imagePath: '/src/assets/img/狼人杀.png',
    tags: ['Java'],
    link: 'https://github.com/XiChen1234/WerewolfSimulator'
  },
  {
    id: 'project4',
    title: '贪吃蛇小游戏',
    description: '基于Qt库的C++基础贪吃蛇游戏项目，玩家通过控制蛇的移动来吃到食物，同时避免撞到自己或边界。',
    imagePath: '/src/assets/img/贪吃蛇.png',
    tags: ['Qt', 'C++', '游戏开发'],
    link: 'https://github.com/XiChen1234/SnakeGame'
  },
  {
    id: 'project5',
    title: '慧选3C-AIGC数码导购',
    description: '引入AIGC解决数码选购难题，提供个性化推荐服务的平台。',
    imagePath: '/src/assets/img/慧选3C.png',
    tags: ['Java', 'Spring Boot', 'MySQL', 'Vue.js', 'AIGC算法']
  }
];
</script>

<template>
  <div class="portfolio-page" id="portfolio">
    <div class="title">My Portfolio</div>
    <div class="sub-title">Selected works — recent projects</div>
    <div class="content">
      <SwiperPicture :data="data"/>
    </div>
  </div>
</template>

<style scoped>
.portfolio-page {
  width: 90%;
  padding: 40px 20px;
  flex-direction: column;
  align-items: center;
}
</style>
