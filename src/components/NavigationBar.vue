<!-- 顶部导航栏 -->
<script setup lang="ts">
import ThemeSwitch from '@/components/ThemeSwitch.vue';
</script>

<template>
  <div class="navigation">
    <a href="#" class="logo">
      <img src="/orange.svg" alt="">
      <h1>XiChen</h1>
    </a>
    <nav class="nav">
      <a href="#home">Home</a>
      <a href="#about">About</a>
      <a href="#skill">Skill</a>
      <a href="#career">Career</a>
      <a href="#portfolio">Portfolio</a>
      <a href="#contact">Contact</a>
      <ThemeSwitch class="iconfont"/>
      <i class="iconfont icon-translate"></i>
      <i class="iconfont icon-right" id="openBtn"></i>
    </nav>
  </div>
</template>

<style scoped>
.navigation {
  position: fixed;
  top: 0;
  width: 100%;
  height: 70px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  background-color: var(--page-bg);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.logo {
  display: flex;
  flex-direction: row;
  align-items: center;
  text-decoration: none;
  color: var(--text-main);
}
.logo img {
  width: 40px;
  height: 40px;
  margin-right: 10px;
}
.nav {
  width: 70%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-right: 50px;
  font-size: 20px;
}

.nav a {
  color: var(--text-main);
  text-decoration: none;
  transition: color 0.3s;
  padding: 3px 10px 5px 10px;
  border-radius: 10px;
}
.nav a:hover {
  color: var(--text-main-focus);
  background-color: var(--bg-focus);
}

.nav .iconfont {
  color: var(--text-main);
  font-size: 23px;
  padding: 8px;
  border-radius: 10px;
  cursor: pointer;
}

.nav .iconfont:hover {
  color: var(--text-main-focus);
  background-color: var(--bg-focus);
}
</style>
