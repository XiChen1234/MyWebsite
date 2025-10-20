<!-- 分页展示内容 -->
<script setup lang="ts">
import Home from '../page/HomePage.vue';
import About from '../page/AboutPage.vue';
import Skill from '../page/SkillPage.vue';
import Career from '../page/CareerPage.vue';

const props = defineProps<{
  content: 'Home' | 'About' | 'Skill' | 'Career';
}>();

const pages = {
  Home,
  About,
  Skill,
  Career,
};
</script>

<template>
  <div class="page">
    <component :is="pages[props.content]" />
  </div>
</template>

<style scoped>
.page {
  width: 90%;
  min-height: 300px;
  margin-top: 20px;
  background-color: var(--page-bg);
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 小屏手机 */
@media (max-width: 480px) {
  .page {
    width: 100%;
  }
}

/* 平板 */
@media (min-width: 481px) and (max-width: 1023px) {}
</style>
