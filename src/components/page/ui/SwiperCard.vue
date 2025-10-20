<!-- 轮播图卡片组件 -->
<script setup lang="ts">
interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  category: string;
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
  <div class="card" :class="{ 'has-link': item.link }" @click="handleCardClick">
    <div class="image-container">
      <img
        :src="item.imagePath"
        :alt="item.title"
        loading="lazy"
        class="card-image"/>
      <!-- 悬停时显示的放大效果覆盖层 -->
      <div class="image-overlay" v-if="item.link">
        <span class="view-project">查看项目</span>
      </div>
    </div>

    <div class="info">
      <div class="category">{{ item.category }}</div>
      <h3 class="title">{{ item.title }}</h3>
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
  cursor: default;
  will-change: transform, box-shadow;
}

.card.has-link {
  cursor: pointer;
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
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.card:hover .image-overlay {
  opacity: 1;
}

.view-project {
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 12px 24px;
  border: 2px solid #fff;
  border-radius: 30px;
  transition: all 0.3s ease;
}

.view-project:hover {
  background-color: #fff;
  color: #333;
}

.info {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex-grow: 1;
}

.category {
  display: inline-block;
  background-color: #f0f4ff;
  color: #4a6cf7;
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  align-self: flex-start;
}

.title {
  margin: 0;
  font-size: 24px;
  font-weight: 700;
  color: #333;
  line-height: 1.3;
}

.description {
  margin: 0;
  font-size: 16px;
  line-height: 1.6;
  color: #666;
  flex-grow: 1;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
}

.tag {
  background-color: var(--bg-card);
  color: #666;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
  transition: all 0.3s ease;
}
</style>
