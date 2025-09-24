<!-- 顶部导航栏 -->
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
  <div class="navigation">
    <a href="#" class="logo">
      <img src="/orange.svg" alt="">
      <h1>XiChen</h1>
    </a>
    <ul id="menu">
      <li><a href="#home">Home</a></li>
      <li><a href="#about">About</a></li>
      <li><a href="#skill">Skill</a></li>
      <li><a href="#career">Career</a></li>
      <li><a href="#portfolio">Portfolio</a></li>
      <li><a href="#contact">Contact</a></li>
      <i class="iconfont icon-moon" @click="themeSwitch" id="switchBtn"></i>
      <i class="iconfont icon-list" id="openBtn"></i>
    </ul>
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
  z-index: 1000;
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

#menu {
  width: 60%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-right: 50px;
  font-size: 20px;
}

#menu a {
  color: var(--text-main);
  text-decoration: none;
  transition: color 0.3s;
  padding: 3px 10px 5px 10px;
  border-radius: 10px;
}

#menu a:hover {
  color: var(--text-main-focus);
  background-color: var(--bg-focus);
}

#menu .iconfont {
  color: var(--text-main);
  font-size: 23px;
  padding: 8px;
  border-radius: 10px;
  cursor: pointer;
}

#menu .iconfont:hover {
  color: var(--text-main-focus);
  background-color: var(--bg-focus);
}

#menu #openBtn {
  display: none;
}

/* 小屏手机 */
@media (max-width: 480px) {
  #menu {
    width: 30%;
  }

  #menu li {
    display: none;
  }

  #menu #openBtn {
    display: block;
  }
}

/* 平板 */
@media (min-width: 481px) and (max-width: 1023px) {
  #menu {
    width: 30%;
  }

  #menu li {
    display: none;
  }

  #menu #openBtn {
    display: block;
  }
}
</style>
