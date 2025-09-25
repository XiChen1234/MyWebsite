<!-- 技能分类组件 -->
<script setup lang="ts">
// 定义技能项接口
interface Skill {
  name: string;
  level: number;
  description: string;
}

// 定义组件props
interface Props {
  section: string;
  title: string;
  skills: Skill[];
  isExpanded: boolean;
  onToggle: (section: string) => void;
}

const props = defineProps<Props>();

// 生成星级显示
const generateStars = (level: number) => {
  return '⭐'.repeat(level) + '🎈'.repeat(5 - level);
};

// 获取等级文本描述
const getLevelText = (level: number) => {
  const levelTexts = {
    5: '核心主力 (专家)',
    4: '熟练使用',
    3: '掌握基础',
    2: '了解概念',
    1: '初步接触'
  };
  return levelTexts[level as keyof typeof levelTexts] || '';
};

// 处理标题点击事件
const handleTitleClick = () => {
  props.onToggle(props.section);
};
</script>

<template>
  <div class="skill-section">
    <h3 class="section-title" @click="handleTitleClick">
      {{ title }}
      <i class="iconfont icon-right" :class="{ 'expanded': isExpanded }"></i>
    </h3>
    <transition name="skill-expand">
      <div v-if="isExpanded" class="skill-list">
        <div v-for="skill in skills" :key="skill.name" class="skill-item">
          <div class="skill-header">
            <div class="skill-name">
              <i :class="`iconfont icon-${skill.name}`"></i>
              {{ skill.name }}
            </div>
            <div class="skill-level" :title="getLevelText(skill.level)">
              {{ generateStars(skill.level) }}
            </div>
          </div>
          <div class="skill-description">{{ skill.description }}</div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.skill-section {
  background-color: var(--bg-focus);
  border-radius: 10px;
  padding: 20px;
  transition: transform 0.3s, box-shadow 0.3s;
}

.section-title {
  font-size: 24px;
  font-weight: bold;
  color: var(--text-main);
  margin-bottom: 20px;
  border-bottom: 2px solid var(--border-color-focus);
  padding-bottom: 10px;
  cursor: pointer;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.section-title:hover {
  color: var(--text-main-focus);
}

.iconfont {
  transition: transform 0.3s ease;
  font-size: 20px;
  color: var(--text-secondary);
  transform: rotate(-90deg);
}

.iconfont.expanded {
  transform: rotate(90deg);
  color: var(--text-main-focus);
}

.skill-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.skill-item {
  background-color: var(--page-bg);
  border-radius: 8px;
  padding: 15px;
  transition: all 0.2s ease;
}

.skill-item:hover {
  border-left: 4px solid var(--border-color-focus);
}

.skill-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.skill-name {
  font-size: 18px;
  font-weight: bold;
  color: var(--text-main);
}

.skill-level {
  font-size: 16px;
  cursor: help;
}

.skill-description {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.5;
}

/* 展开/折叠动画 */
.skill-expand-enter-active,
.skill-expand-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 1;
  max-height: 1000px;
  overflow: hidden;
}

.skill-expand-enter-from,
.skill-expand-leave-to {
  opacity: 0;
  max-height: 0;
  overflow: hidden;
}

/* 优化子项的进入动画，实现级联效果 */
.skill-expand-enter-active .skill-item {
  transition: transform 0.3s ease-out, opacity 0.3s ease-out;
}

.skill-expand-enter-from .skill-item {
  transform: translateY(-10px);
  opacity: 0;
}

/* 为每个技能项添加微小的延迟，实现级联效果 */
.skill-expand-enter-active .skill-item:nth-child(1) { transition-delay: 0ms; }
.skill-expand-enter-active .skill-item:nth-child(2) { transition-delay: 50ms; }
.skill-expand-enter-active .skill-item:nth-child(3) { transition-delay: 100ms; }
.skill-expand-enter-active .skill-item:nth-child(4) { transition-delay: 150ms; }
.skill-expand-enter-active .skill-item:nth-child(5) { transition-delay: 200ms; }

/* 响应式设计 */
@media (max-width: 480px) {
  .section-title {
    font-size: 20px;
  }

  .toggle-icon {
    font-size: 14px;
  }

  .skill-name {
    font-size: 16px;
  }

  .skill-level {
    font-size: 12px;
  }

  .skill-description {
    font-size: 12px;
  }
}
</style>
