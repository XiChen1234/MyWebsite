<!-- 轮播图卡片组件 -->
<script setup lang="ts">
interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  imagePath: string;
  link?: string;
  tags: string[];
}

const props = defineProps<{
  item: PortfolioItem;
}>();

// 处理卡片点击事件
const handleCardClick = () => {
  if (props.item.link) {
    window.open(props.item.link, '_blank');
  }
};
</script>

<template>
  <div class="card">
    <div class="image-container">
      <img :src="item.imagePath" :alt="item.title" class="card-image" loading="lazy" />
      <!-- 悬停时显示的放大效果覆盖层 -->
      <div class="image-overlay" v-if="item.link" @click="handleCardClick">
        <span class="view-project">查看项目</span>
      </div>
    </div>

    <div class="info">
      <h3 class="name">{{ item.title }}</h3>
      <p class="description">{{ item.description }}</p>

      <div class="tags">
        <span class="tag" v-for="tag in item.tags" :key="tag">
          {{ tag }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  width: 100%;
  max-width: 800px;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1), 0 2px 6px rgba(0, 0, 0, 0.08);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  will-change: transform, box-shadow;
}

.image-container {
  position: relative;
  width: 100%;
  height: 280px;
  overflow: hidden;
  flex-shrink: 0;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.card:hover .card-image {
  transform: scale(1.05);
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--transparent-black);
  color: var(--neutral-50);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.4s ease;
  cursor: pointer;
}

.card:hover .image-overlay {
  opacity: 1;
}

.view-project {
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 12px 24px;
  border: 2px solid var(--border);
  border-radius: 10px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.view-project:hover {
  color: var(--text-main-focus);
  border-color: var(--text-main-focus);
}

.info {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex-grow: 1;
}

.name {
  color: var(--text-main);
}

.description {
  margin: 0;
  font-size: 16px;
  line-height: 1.6;
  color: var(--text-main);
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
}

.tag {
  background-color: var(--bg-tag-focus);
  color: var(--text-main-focus);
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
  transition: all 0.3s ease;
}
</style>
