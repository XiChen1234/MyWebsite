<!-- 顶部导航栏 -->
<script setup lang="ts">
import { ref, onMounted } from 'vue';

const switchBtn = ref<HTMLElement | null>(null);
const openBtn = ref<HTMLElement | null>(null);
const menu = ref<HTMLElement | null>(null);
const overlay = ref<HTMLElement | null>(null);
const isMenuOpen = ref(false);

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

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
  document.body.style.overflow = isMenuOpen.value ? 'hidden' : 'auto';
};

const closeMenu = () => {
  isMenuOpen.value = false;
  document.body.style.overflow = 'auto';
};

const handleNavLinkClick = () => {
  closeMenu();
};

onMounted(() => {
  switchBtn.value = document.getElementById('switchBtn');
  openBtn.value = document.getElementById('openBtn');
  menu.value = document.getElementById('menu');
  overlay.value = document.getElementById('menu-overlay');
});
</script>

<template>
  <div class="navigation">
    <a href="#" class="logo">
      <img src="/orange.svg" alt="">
      <h1>XiChen</h1>
    </a>
    <ul id="menu" class="desktop-menu">
      <li><a href="#home" @click="handleNavLinkClick">Home</a></li>
      <li><a href="#about" @click="handleNavLinkClick">About</a></li>
      <li><a href="#skill" @click="handleNavLinkClick">Skill</a></li>
      <li><a href="#career" @click="handleNavLinkClick">Career</a></li>
      <li><a href="#portfolio" @click="handleNavLinkClick">Portfolio</a></li>
      <li><a href="#contact" @click="handleNavLinkClick">Contact</a></li>
      <i class="iconfont icon-moon" @click="themeSwitch" id="switchBtn"></i>
      <i class="iconfont icon-list" @click="toggleMenu" id="openBtn"></i>
    </ul>
  </div>

  <!-- 移动端下拉菜单 -->
  <div class="mobile-menu" :class="{ 'open': isMenuOpen }">
    <ul>
      <li><a href="#home" @click="handleNavLinkClick">Home</a></li>
      <li><a href="#about" @click="handleNavLinkClick">About</a></li>
      <li><a href="#skill" @click="handleNavLinkClick">Skill</a></li>
      <li><a href="#career" @click="handleNavLinkClick">Career</a></li>
      <li><a href="#portfolio" @click="handleNavLinkClick">Portfolio</a></li>
      <li><a href="#contact" @click="handleNavLinkClick">Contact</a></li>
    </ul>
  </div>

  <!-- 页面遮罩层 -->
  <div id="menu-overlay" class="menu-overlay" :class="{ 'active': isMenuOpen }" @click="closeMenu"></div>
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
  z-index: 1000;
}

.logo {
  display: flex;
  flex-direction: row;
  align-items: center;
  text-decoration: none;
  color: var(--text-main);
}

.logo:hover {
  color: var(--text-main-focus);
}

.logo img {
  width: 40px;
  height: 40px;
  margin-right: 10px;
}

/* 桌面端菜单 */
.desktop-menu {
  width: 60%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-right: 50px;
  font-size: 20px;
}

.desktop-menu a {
  color: var(--text-main);
  text-decoration: none;
  transition: color 0.3s;
  padding: 3px 10px 5px 10px;
  border-radius: 10px;
}

.desktop-menu a:hover {
  color: var(--text-main-focus);
  background-color: var(--bg-focus);
}

.desktop-menu .iconfont {
  color: var(--text-main);
  font-size: 23px;
  padding: 8px;
  border-radius: 10px;
  cursor: pointer;
}

.desktop-menu .iconfont:hover {
  color: var(--text-main-focus);
  background-color: var(--bg-focus);
}

.desktop-menu #openBtn {
  display: none;
}

/* 移动端下拉菜单 */
.mobile-menu {
  position: fixed;
  top: -100%;
  left: 0;
  width: 100%;
  background-color: var(--page-bg);
  z-index: 999;
  transition: top 0.3s ease-in-out;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.mobile-menu.open {
  top: 70px;
}

.mobile-menu ul {
  display: flex;
  flex-direction: column;
  padding: 20px;
  margin: 0;
  list-style: none;
}

.mobile-menu li {
  margin-bottom: 20px;
  font-size: 20px;
}

.mobile-menu a {
  color: var(--text-main);
  text-decoration: none;
  display: block;
  padding: 10px 15px;
  border-radius: 10px;
  transition: all 0.3s;
}

.mobile-menu a:hover {
  color: var(--text-main-focus);
  background-color: var(--bg-focus);
}

.mobile-menu .iconfont {
  color: var(--text-main);
  font-size: 23px;
  padding: 10px 15px;
  border-radius: 10px;
  cursor: pointer;
  align-self: flex-start;
}

.mobile-menu .iconfont:hover {
  color: var(--text-main-focus);
  background-color: var(--bg-focus);
}

/* 页面遮罩层 */
.menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--transparent);
  backdrop-filter: blur(4px);
  z-index: 998;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
}

.menu-overlay.active {
  opacity: 1;
  visibility: visible;
}

/* 小屏手机 */
@media (max-width: 480px) {
  .desktop-menu {
    width: 30%;
  }

  .desktop-menu li {
    display: none;
  }

  .desktop-menu #openBtn {
    display: block;
  }
}

/* 平板 */
@media (min-width: 481px) and (max-width: 1023px) {
  .desktop-menu {
    width: 30%;
  }

  .desktop-menu li {
    display: none;
  }

  .desktop-menu #openBtn {
    display: block;
  }
}

/* 大屏显示 */
@media (min-width: 1024px) {
  .mobile-menu {
    display: none;
  }

  .menu-overlay {
    display: none;
  }
}
</style>
