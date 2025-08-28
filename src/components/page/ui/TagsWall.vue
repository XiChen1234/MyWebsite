<!-- 标签墙组件 -->
<script setup lang="ts">

const tags = [
  [
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
  ],
  [
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
  ],
  [
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
]

const t = [
  20, 10, 15
];
</script>

<template>
  <div class="tags-wall">
    <div class="tag-row" v-for="(tagsRow, rowIndex) in tags" :key="rowIndex" :style="{ '--t': t[rowIndex] + 's' }">
      <div>
        <span class="tag" v-for="(tag, index) in tagsRow" :key="index" :style="{ backgroundColor: tag.color }">{{
          tag.name }}</span>
      </div>
      <div>
        <span class="tag" v-for="(tag, index) in tagsRow" :key="index" :style="{ backgroundColor: tag.color }">{{
          tag.name }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tags-wall {
  width: 100%;
  overflow: hidden;
  border-radius: 20px;
}

.tag-row {
  display: flex;
}

.tag-row div {
  display: flex;
  white-space: nowrap;
  animation: scroll var(--t) linear infinite;
}

.tag-row div:nth-child(2) {
  animation: scroll-reverse var(--t) linear infinite;
  animation-delay: calc(var(--t) / -2);
}


@keyframes scroll {
  from {
    transform: translate(100%);
  }

  to {
    transform: translate(-100%);
  }
}

@keyframes scroll-reverse {
  from {
    transform: translate(0%);
  }

  to {
    transform: translate(-200%);
  }
}

.tag {
  display: inline-flex;
  margin: 10px;
  letter-spacing: .2em;
  background-color: var(--bg-card);
  color: var(--text-card);
  padding: 5px 10px;
  border-radius: 5px;
}
</style>
