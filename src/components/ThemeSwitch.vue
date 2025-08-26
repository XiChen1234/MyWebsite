<!-- 明暗切换按钮 -->
<script setup lang="ts">
const themeSwitch = () => {
  const html = document.documentElement;
  const switchBtn = document.getElementById('switchBtn');
  if (html.getAttribute('data-theme') === 'dark') {
    html.setAttribute('data-theme', 'light');
    switchBtn?.classList.remove('icon-sun');
    switchBtn?.classList.add('icon-moon');
  } else {
    html.setAttribute('data-theme', 'dark');
    switchBtn?.classList.remove('icon-moon');
    switchBtn?.classList.add('icon-sun');
  }
};
</script>

<template>
  <i class="iconfont icon-moon" @click="themeSwitch" id="switchBtn"></i>
</template>

<style scoped></style>
