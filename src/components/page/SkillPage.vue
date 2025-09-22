<!-- 技术栈页面组件 -->
<script setup lang="ts">
import { ref } from 'vue';
import SkillSection from './ui/SkillSection.vue';

// 定义技术技能数据
const skills = {
  languages: [
    { name: 'Java', level: 5, description: '熟练掌握面向对象编程，拥有使用Spring Boot生态进行后端开发的项目经验。' },
    { name: 'Python', level: 4, description: '可用于脚本编写、自动化任务及Flask轻量级Web应用开发。' },
    { name: 'JavaScript', level: 4, description: '掌握ES6+特性，能够实现前端交互及Vue.js项目开发。' },
    { name: 'Go / C / C++ / C#', level: 2, description: '具备语言基础，了解其特性和适用场景，具备快速上手的能力。' }
  ],
  backend: [
    { name: 'Spring Boot', level: 5, description: '能够使用Spring Boot构建RESTful API，了解Spring MVC、IOC等核心概念。' },
    { name: 'Flask', level: 4, description: '可用于快速搭建原型和轻量级后端服务。' },
    { name: 'MySQL', level: 4, description: '熟悉基本的CRUD操作、索引及事务概念。' },
    { name: 'Redis', level: 4, description: '了解其作为缓存数据库的基本应用，如缓存热点数据。' },
    { name: 'MongoDB', level: 2, description: '了解NoSQL数据库的基本概念和文档模型。' }
  ],
  frontend: [
    { name: 'HTML5 / CSS3', level: 4, description: '能够编写语义化的HTML和实现基础的响应式页面布局。' },
    { name: 'Vue', level: 4, description: '拥有Vue项目经验，了解组件化开发模式。' },
    { name: 'Vite', level: 2, description: '了解其作为现代前端构建工具的优势和基本使用。' }
  ],
  devops: [
    { name: 'Linux', level: 4, description: '熟悉常用命令，具备在Linux环境下进行开发部署的能力。' },
    { name: 'Docker', level: 4, description: '会使用Dockerfile构建镜像，了解容器化部署流程。' },
    { name: 'Nginx', level: 4, description: '可配置静态资源服务和简单的反向代理。' },
    { name: 'Ansible / Shell', level: 4, description: '了解自动化配置管理概念，能编写简单的Shell脚本完成自动化任务。' }
  ],
  tools: [
    { name: 'Git', level: 4, description: '熟练掌握Git工作流，用于日常的代码版本控制和团队协作。' },
    { name: 'Pandas', level: 2, description: '了解其用于数据处理和分析的基本操作。' }
  ]
};

// 定义技能分类标题映射
const sectionTitles = {
  languages: '编程语言',
  backend: '后端技术与框架',
  frontend: '前端技术',
  devops: '运维与部署',
  tools: '开发工具与其他'
};

// 当前展开的部分，null表示全部折叠
const expandedSection = ref<string | null>(null);

// 处理部分点击事件
const handleSectionClick = (section: string) => {
  // 如果点击的是当前展开的部分，则折叠它；否则展开点击的部分，其他部分折叠
  expandedSection.value = expandedSection.value === section ? null : section;
};
</script>

<template>
  <div class="skill-page" id="skill">
    <div class="title">Skill Set</div>
    <div class="sub-title">Backend-Focused, Full-Stack Capable</div>
    <div class="content">
      <SkillSection 
        v-for="(sectionSkills, sectionKey) in skills" 
        :key="sectionKey"
        :section="sectionKey"
        :title="sectionTitles[sectionKey as keyof typeof sectionTitles]"
        :skills="sectionSkills"
        :is-expanded="expandedSection === sectionKey"
        :on-toggle="handleSectionClick"
      />
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

@media (min-width: 481px) and (max-width: 1023px) {
  .skill-page {
    width: 95%;
  }
}
</style>
