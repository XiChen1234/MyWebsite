<!-- 主页组件 -->
<script setup lang="ts">
import TagsWall from './ui/TagsWall.vue';

interface Tag {
  name: string;
  color?: string;
}
interface TagGroup {
  name: string;
  tags: Tag[];
}

const tagData: TagGroup[] = [
  {
    name: '基本信息',
    tags: [
      {
        name: '中南大学',
        color: '#0052A9'
      },
      {
        name: '软件工程',
      },
      {
        name: '程序猿',
      },
      {
        name: '中国石油',
        color: '#C4121D'
      },
      {
        name: 'Software Engineer',
      }
    ]
  },
  {
    name: '技术标签',
    tags: [
      {
        name: 'Spring Boot',
        color: '#6DB33F'
      },
      {
        name: 'MySQL',
      },
      {
        name: 'Docker',
        color: '#FCC624'
      },
      {
        name: '自动化脚本',
      },
      {
        name: 'Linux',
      },
      {
        name: 'Nginx',
        color: '#009639'
      }
    ]
  },
  {
    name: '兴趣爱好',
    tags: [
      {
        name: '⚽足球边锋',
        color: '#1E90FF'
      },
      {
        name: '🃏桌游爱好者',
        color: '#8A2BE2'
      },
      {
        name: '🎮单机游戏',
      },
      {
        name: '🧊魔方Sub20',
      },
      {
        name: '🐺单身贵族',
        color: '#FF69B4'
      }
    ]
  }
]
</script>

<template>
  <div class="home-page" id="home">
    <div class="header">
      <img src="/header.jpg" alt="">
    </div>
    <h1>
      Welcome to <br />
      XiChen's Website
    </h1>
    <TagsWall class="tags" :data="tagData"/>
    <div class="next">
      <a href="#about">
        <i class="iconfont icon-mouse"></i>
        <span>Scroll Down</span>
        <i class="iconfont icon-right"></i>
      </a>
    </div>
    <div class="contact">
      <a href="#contact" class="button">
        <i class="iconfont icon-send"></i>
        <span>Contact Me</span>
      </a>
    </div>
  </div>
</template>

<style scoped>
.home-page {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 20px;
  grid-template-areas:
    "welcome header"
    "tags header"
    "contact next";
  width: 90%;
  padding: 40px 20px;
}

.header {
  grid-area: header;
  display: flex;
  justify-content: center;
  align-items: center;
}

.header img {
  width: 300px;
  border-radius: 50%/35% 35% 65% 65%;
}

h1 {
  grid-area: welcome;
  font-size: 50px;
  font-weight: bold;
  align-self: center;
  display: flex;
  justify-content: center;
  text-align: left;
  height: 100%;
  color: var(--text-main);
}

.tags {
  grid-area: tags;
}

.next {
  grid-area: next;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.next a {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-main);
}

.next a .iconfont {
  margin: 0 10px;
  font-size: 30px;
  font-weight: bold;
  color: var(--text-main-focus);
}

.next a .iconfont.icon-mouse {
  animation: bounce 1s infinite;
}

@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }

  40% {
    transform: translateY(12px);
  }

  60% {
    transform: translateY(5px);
  }
}

.next a .iconfont.icon-right {
  transform: rotate(90deg);
}

.contact {
  grid-area: contact;
  display: flex;
  align-items: center;
  justify-content: center;
}

.contact a {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  background-color: var(--button-bg-orange);
  color: var(--button-text-white);
  padding: 10px 20px;
  border-radius: 30px;
  width: 50%;
}

.contact a .iconfont {
  margin-right: 10px;
  font-size: 30px;
}

/* 手机和平板响应式 */
@media (max-width: 1023px) {
  .home-page {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto auto auto;
    grid-template-areas:
      "welcome"
      "header"
      "contact"
      "tags"
      "next";
    padding: 20px 10px;
  }

  .header img {
    width: 200px;
  }

  h1 {
    font-size: 32px;
    text-align: center;
  }
}
</style>
