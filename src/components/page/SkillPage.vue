<!-- 技术栈页面组件 -->
<script setup lang="ts">
import { ref } from 'vue';
import SkillSection from './ui/SkillSection.vue';

// 定义技术技能数据
const skillSections = [
  {
    title: "编程语言",
    list: [
      { name: 'Java', level: 5, description: '熟练掌握面向对象编程，拥有使用Spring Boot生态进行后端开发的项目经验' },
      { name: 'Python', level: 4, description: '可用于脚本编写、自动化任务及Flask轻量级Web应用开发' },
      { name: 'JavaScript', level: 4, description: '掌握ES6+特性，能够实现前端交互及Vue.js项目开发' },
      { name: 'Go', level: 3, description: '熟练使用Go语言进行后端开发，了解其并发特性' },
      { name: 'C', level: 2, description: '包含C/C++/C#，具备语言基础，了解其特性和适用场景，具备快速上手的能力' }
    ]
  }, {
    title: "后端平台与架构",
    list: [
      { name: 'Spring', level: 5, description: '能够使用Spring Boot构建RESTful API，了解Spring MVC、IOC等核心概念' },
      { name: 'Flask', level: 4, description: '可用于快速搭建原型和轻量级后端服务' },
      { name: 'MySQL', level: 4, description: '熟悉基本的CRUD操作、索引及事务概念' },
      { name: 'Redis', level: 4, description: '了解其作为缓存数据库的基本应用，如缓存热点数据' },
      { name: 'MongoDB', level: 3, description: '了解NoSQL数据库的基本概念和文档模型' },
      { name: 'RabbitMQ', level: 1, description: '了解其作为消息队列的基本应用，如实现异步处理' }
    ]
  }, {
    title: "前端技术与框架",
    list: [
      { name: 'HTML5', level: 4, description: '能够编写语义化的HTML，了解Web标准' },
      { name: 'CSS3', level: 4, description: '熟练运用Flex、Grid实现响应式布局，掌握Sass预处理器与CSS动画' },
      { name: 'Vue', level: 4, description: '拥有Vue项目经验，了解组件化开发模式' },
      { name: 'TypeScript', level: 3, description: '掌握TypeScript基本语法，了解其类型系统' },
      { name: 'React', level: 2, description: '了解其基本概念和组件化开发模式' }
    ]
  }, {
    title: "运维与部署",
    list: [
      { name: 'Linux', level: 4, description: '熟悉常用命令，具备在Linux环境下进行开发部署的能力' },
      { name: 'Docker', level: 4, description: '会使用Dockerfile构建镜像，了解容器化部署流程' },
      { name: 'Nginx', level: 4, description: '可配置静态资源服务和简单的反向代理' },
      { name: 'Shell', level: 3, description: '能编写简单的Shell脚本完成自动化任务' },
      { name: 'Ansible', level: 2, description: '了解自动化配置管理概念' }
    ]
  }, {
    title: "开发工具与其他",
    list: [
      { name: 'Git', level: 4, description: '熟练掌握Git工作流，用于日常的代码版本控制和团队协作' },
      { name: 'Postman', level: 3, description: '了解其作为API测试工具的基本使用' },
      { name: 'Pandas', level: 1, description: '了解其用于数据处理和分析的基本操作' }
    ]
  }, {
    title: "游戏开发",
    list: [
      { name: 'Godot', level: 4, description: '熟悉Godot引擎并能够开发2D游戏' },
      { name: 'Unity', level: 3, description: '熟练使用Unity引擎进行3D游戏开发' },
    ]
  }
];

// 当前展开的部分，null表示全部折叠
const expandedSection = ref<string | null>("编程语言");

// 处理点击事件
const handleSectionClick = (section: string) => {
  // 无展开 展开
  if (expandedSection.value === null) {
    expandedSection.value = section;
    return;
  }

  // 折叠
  if (expandedSection.value === section) {
    expandedSection.value = null;
    return;
  }

  // 展开
  expandedSection.value = section;
  // 解决滚动冲突
  setTimeout(() => {
    const sectionElement = document.getElementById(`data-section-${section}`);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, 500)
};
</script>

<template>
  <div class="skill-page" id="skill">
    <div class="title">Skill Set</div>
    <div class="sub-title">Backend-Focused, Full-Stack Capable</div>
    <div class="content">
      <SkillSection v-for="(section, index) in skillSections" :key="index" :section="section"
        :is-expanded="expandedSection === section.title" :on-toggle="handleSectionClick" />
    </div>
  </div>
</template>

<style scoped>
.skill-page {
  display: flex;
  width: 90%;
  padding: 40px 20px;
  flex-direction: column;
}

.content {
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

/* 响应式设计 */
@media (max-width: 480px) {
  .skill-page {
    width: 100%;
    padding: 20px 10px;
  }

  .title {
    font-size: 35px;
  }

  .sub-title {
    font-size: 20px;
  }
}
</style>
