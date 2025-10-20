<!-- 轮播图组件 -->
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import SwiperCard from './SwiperCard.vue';

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
  data: PortfolioItem[];
}>();

const swiperList = ref<HTMLDivElement>();
const indicators = ref<HTMLDivElement>();
const currentIndex = ref(0);
const length = props.data.length;

onMounted(() => {
  swiperList.value = document.getElementById('swiper-list') as HTMLDivElement;
  indicators.value = document.getElementById('indicators') as HTMLDivElement;
  indicators.value.children[0].classList.add('active');
});

/**
 * 移动到指定索引的轮播项
 * @param index 目标索引（对应实际数据数组的索引-1）
 */
const moveTo = (index: number) => {
  if (!swiperList.value) return;
  if (!indicators.value) return;
  // 动画处理
  // 若current是0、且index是length-1，直接无缝跳转到最后一项
  if (currentIndex.value === 0 && index === length - 1) {
    swiperList.value.style.transition = 'none';
    swiperList.value.style.transform = `translateX(${-(length + 1) * 100}%)`;
    // 强制重绘，确保样式更新
    console.log(swiperList.value.clientHeight);
    // 恢复过渡动画
    swiperList.value.style.transition = 'all 0.5s ease';
  } else if (currentIndex.value === length - 1 && index === 0) {
    swiperList.value.style.transition = 'none';
    swiperList.value.style.transform = `translateX(0)`;
    // 强制重绘，确保样式更新
    console.log(swiperList.value.clientHeight);
    // 恢复过渡动画
    swiperList.value.style.transition = 'all 0.5s ease';
  }

  swiperList.value.style.transform = `translateX(${-(index + 1) * 100}%)`;
  indicators.value.children[currentIndex.value].classList.remove('active');
  indicators.value.children[index].classList.add('active');
  currentIndex.value = index;
};

/**
 * 向左移动轮播项
 */
const toLeft = () => {
  if (currentIndex.value === 0) {
    moveTo(length - 1);
  } else {
    moveTo(currentIndex.value - 1);
  }
};

/**
 * 向右移动轮播项
 */
const toRight = () => {
  if (currentIndex.value === length - 1) {
    moveTo(0);
  } else {
    moveTo(currentIndex.value + 1);
  }
};



</script>

<template>
  <div class="swiper">
    <div class="list" id="swiper-list">
      <!-- 循环播放的前置项 -->
      <div class="item" v-if="length > 0">
        <SwiperCard :item="props.data[length - 1]" />
      </div>

      <!-- 实际数据项 -->
      <div class="item" v-for="item in props.data" :key="item.id">
        <SwiperCard :item="item" />
      </div>

      <!-- 循环播放的后置项 -->
      <div class="item" v-if="length > 0">
        <SwiperCard :item="props.data[0]" />
      </div>
    </div>

    <!-- 控制按钮 -->
    <button class="control-btn left-btn" @click="toLeft()">
      <i class="iconfont icon-right"></i>
    </button>
    <button class="control-btn right-btn" @click="toRight()">
      <i class="iconfont icon-right"></i>
    </button>
  </div>

  <!-- 指示器 -->
  <div class="indicators" id="indicators" v-if="length > 0">
    <button v-for="(item, index) in props.data" :key="item.id" @click="moveTo(index)" class="indicator">
      {{ index + 1 }}
    </button>
  </div>
</template>

<style scoped>
.swiper {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.list {
  display: flex;
  height: 100%;
  transform: translateX(-100%);
  transition: all 0.5s ease;
  will-change: transform;
}

.item {
  flex-shrink: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;
}

.control-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.8);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #333;
  transition: all 0.3s ease;
  z-index: 10;
}

.control-btn:hover {
  background-color: rgba(255, 255, 255, 1);
  transform: translateY(-50%) scale(1.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.left-btn {
  left: 20px;
}

.left-btn .iconfont {
  transform: rotate(180deg);
}

.right-btn {
  right: 20px;
}

.indicators {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
}

.indicator {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #333;
}

.indicator:hover {
  background-color: var(--text-secondary-focus);
  color: var(--text-main-focus);
  transform: scale(1.1);
}

.indicator.active {
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  font-weight: bold;
}
</style>
