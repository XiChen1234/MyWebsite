<template>
  <div class="container">
    <SideBar />
    <NavigationBar />
    <div class="page-list">
      <PageBox content="Home"/>
      <PageBox content="About"/>
      <PageBox content="Home"/>
      <PageBox content="Home"/>
      <FooterBar />
    </div>
  </div>
</template>

<script setup lang="ts">
import SideBar from '@/components/layout/SideBar.vue';
import NavigationBar from '@/components/layout/NavigationBar.vue';
import PageBox from '@/components/layout/PageBox.vue';
import FooterBar from '@/components/layout/FooterBar.vue';
</script>

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
  gap: 20px;
}
</style>
