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
  category: string;
  imagePath: string;
  link?: string;
  tags: string[];
}

// 作品集数据 - 硬编码模拟数据
const data: PortfolioItem[] = [
  {
    id: 'project1',
    title: '个人网站',
    description: '使用Vue 3 + TypeScript构建的个人作品集网站，展示我的技能和项目经验。',
    category: 'Web开发',
    imagePath: '/src/assets/img/中南大学.jpg',
    tags: ['Vue 3', 'TypeScript', 'Vite', 'CSS3']
  },
  {
    id: 'project2',
    title: '慧选3C-AIGC数码导购',
    description: '引入AIGC解决数码选购难题，提供个性化推荐服务的平台。',
    category: 'AIGC应用',
    imagePath: '/src/assets/img/恒安嘉新.png',
    tags: ['Java', 'Spring Boot', 'MySQL', 'Vue.js', 'AIGC算法']
  },
  {
    id: 'project3',
    title: '三高人群健康管理系统',
    description: '微信小程序应用，为三高人群提供健康监测和管理服务。',
    category: '移动应用',
    imagePath: '/src/assets/img/大创.jpg',
    tags: ['微信小程序', 'Spring', 'MyBatis-plus']
  },
  {
    id: 'project4',
    title: '美团团买买调整单工具',
    description: '负责团买买调整单运营工具开发，优化大数据量导出流程。',
    category: '企业应用',
    imagePath: '/src/assets/img/美团实习.jpg',
    tags: ['Java', 'Spring', 'MyBatis', 'EasyExcel', '线程池']
  },
  {
    id: 'project5',
    title: '分布式缓存模块',
    description: '基于Go语言实现的高性能分布式缓存模块，用于云平台核心服务。',
    category: '后端开发',
    imagePath: '/src/assets/img/团学会.jpg',
    tags: ['Go', 'Kubernetes', 'Redis', '微服务']
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
