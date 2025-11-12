<script setup lang="ts">
import SideBar from '@/components/layout/SideBar.vue';
import NavigationBar from '@/components/layout/NavigationBar.vue';
import PageBox from '@/components/layout/PageBox.vue';
import FooterBar from '@/components/layout/FooterBar.vue';

// 定义页面内容类型
const pageList: ('Home' | 'About' | 'Skill' | 'Career' | 'Portfolio' | 'Contact')[] = ['Home', 'About', 'Skill', 'Career', 'Portfolio', 'Contact'];
</script>

<template>
  <div class="container">
    <SideBar />
    <NavigationBar />
    <div class="page-list">
      <div class="page-item" v-for="item in pageList" :key="item">
        <PageBox :content="item" />
      </div>
    </div>
    <FooterBar />
  </div>
</template>

<style scoped>
.container {
  min-width: 260px;
  background-color: var(--common-bg);
}

.page-list {
  margin-top: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
}

.page-item {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
