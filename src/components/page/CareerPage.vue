<script setup lang="ts">
import { ref, computed } from 'vue';
import CSU from '@/assets/img/中南大学.jpg';
import studentUnion from '@/assets/img/团学会.jpg';
import innovationContest from '@/assets/img/大创.jpg';
import industryCooperation from '@/assets/img/校企合作.jpg';
import trafficContest from '@/assets/img/交科赛.jpg';
import virtualSim from '@/assets/img/虚拟仿真.jpg';
import csContest from '@/assets/img/计算机设计大赛.jpg';
import hengAn from '@/assets/img/恒安嘉新.png';
import meiTuan from '@/assets/img/美团实习.jpg';
import tencent from '@/assets/img/腾讯实习.png';
import miHoYo from '@/assets/img/米哈游实习.jpg';
import orange from '@/assets/img/orange.svg';
import pawsUp from '@/assets/img/paws_up.png';
import cattlePay from '@/assets/img/cattle_pay.png';


// 定义经历数据接口
interface ExperienceItem {
  id: string; // 唯一标识符
  type: 'Education' | 'Work' | 'Activity';
  title: string;
  organization: string;
  start: Date;
  end: Date | null; // null代表至今
  details?: string[];
  skills?: string[];
  imagePath?: string; // 图片路径
}

// 格式化日期为YYYY.MM格式
const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${year}.${month}`;
};

// 格式化时间段显示（处理至今）
const formatPeriod = (start: Date, end: Date | null): string => {
  const startStr = formatDate(start);
  const endStr = end ? formatDate(end) : '至今';
  return `${startStr} - ${endStr}`;
};

// 教育和工作经历合并在一个变量中
const experienceData: ExperienceItem[] = [
  {
    id: 'edu-0',
    type: 'Education',
    title: '软件工程 学士学位',
    organization: '中南大学',
    start: new Date('2021-09-01'),
    end: new Date('2025-06-18'),
    details: [
      '核心课程：数据结构与算法、操作系统、数据库原理、软件工程、计算机网络',
      '班级组宣委员，统筹班级活动，获“优秀学生干部”'
    ],
    skills: ['Java', 'C/C++/C#', 'MySQL', 'Vue.js', 'Git'],
    imagePath: CSU
  },
  {
    id: 'edu-1',
    type: 'Education',
    title: '团委学生会 宣传部',
    organization: '中南大学',
    start: new Date('2021-10-01'),
    end: new Date('2022-10-01'),
    details: [
      '统筹宣传部运营与宣传战略落地',
      '主导宣传物料设计制作与新媒体运营',
      '协同多部门保障活动推进'
    ],
    skills: ['Adobe Premiere', 'Adobe Photoshop', '专业摄影摄像', '策划案设计', '跨平台新媒体运营'],
    imagePath: studentUnion
  },
  {
    id: 'edu-2',
    type: 'Education',
    title: '大学生创新创业竞赛 省级优秀项目',
    organization: '湘雅三医院',
    start: new Date('2022-09-01'),
    end: new Date('2023-05-01'),
    details: [
      '负责“三高人群管理”创新创业项目的开发',
      '使用微信小程序、Spring和MyBatis-plus独立开发',
      '项目圆满完成。获省级优秀项目'
    ],
    skills: ['微信小程序', 'Spring', 'MyBatis-plus'],
    imagePath: innovationContest
  },
  {
    id: 'edu-3',
    type: 'Education',
    title: '校企合作项目',
    organization: '湖南三甲生命科学实验室有限公司',
    start: new Date('2022-09-01'),
    end: new Date('2023-05-01'),
    details: [
      '“大创”项目受湖南三甲生命科学实验室青睐并开展校企合作',
      '合作顺利推进，项目获省级优秀成绩'
    ],
    skills: ['微信小程序', 'Spring', 'MyBatis-plus'],
    imagePath: industryCooperation
  },
  {
    id: 'edu-4',
    type: 'Education',
    title: '中南大学第十六届交通运输科技大赛 二等奖',
    organization: '中南大学',
    start: new Date('2023-06-30'),
    end: new Date('2023-01-20'),
    details: [
      '基于多技术融合开发车辆-社群交互系统，引入高德地图SDK，使用Android Studio开发安卓APP，',
      '配合Spring + WebSocket搭建后端系统，实现多车主导航与社群实时聊天功能。',
      '项目顺利完成，获得中南大学第十六届交通运输科技大赛二等奖。'
    ],
    skills: ['Android Studio', 'Spring', 'WebSocket'],
    imagePath: trafficContest
  },
  {
    id: 'edu-5',
    type: 'Education',
    title: '湖南省第三届大学生化学化工虚拟仿真竞赛 三等奖',
    organization: '湖南省教育厅',
    start: new Date('2022-10-01'),
    end: new Date('2023-06-30'),
    details: [
      '开发 “3D打印科普” 虚拟仿真演示系统，借助 Python 和 OpenGL 库构建核心功能',
      '实现 3D 打印过程的实时渲染模块，支持材料特性的动态展示',
      '凭借该系统在竞赛中荣获三等奖'
    ],
    skills: ['Python', 'OpenGL'],
    imagePath: virtualSim
  },
  {
    id: 'edu-6',
    type: 'Education',
    title: '第十七届中国大学生计算机设计大赛 中南地区赛 二等奖',
    organization: '中国大学生计算机设计大赛组委会',
    start: new Date('2023-12-01'),
    end: new Date('2024-06-01'),
    details: [
      '项目：“慧选3C-AIGC数码导购”',
      '引入AIGC解决数码选购难题，提供个性化服务',
      '用Java、Spring Boot等技术，含用户、商品、推荐模块',
      '任技术负责人，提升体验、优化运营、推动创新',
      '含用户、订单、后台等模块'
    ],
    skills: ['Java', 'Spring Boot', 'MySQL', 'Vue.js', 'AIGC算法'],
    imagePath: csContest
  },
  {
    id: 'work-0',
    type: 'Work',
    title: 'SRE运维',
    organization: '恒安嘉新（北京）科技股份公司',
    start: new Date('2023-01-22'),
    end: new Date('2023-09-01'),
    details: [
      '寒假日常实习（长沙、广州）',
      '负责湖南地区恶意程序采集项目的搭建、部署与日常维护',
      '编写Ansible Playbook并部署、升级服务集群'
    ],
    skills: ['Linux', 'Ansible', 'Nginx', 'zookeeper', 'Portainer'],
    imagePath: hengAn
  },
  {
    id: 'work-1',
    type: 'Work',
    title: 'Java后端开发',
    organization: '美团-快小优 基础平台研发部 ',
    start: new Date('2024-06-28'),
    end: new Date('2024-09-20'),
    details: [
      '暑期转正实习（北京）',
      '独立负责团买买调整单运营工具开发',
      '用多线程和线程池优化大数据量导出流程',
      '接入审批、撤回系统，保障分布式事务一致性',
      '设计结算规则快照对比与回滚，保证数据一致'
    ],
    skills: ['Java', 'Spring', 'MyBatis', 'EasyExcel', '线程池', '分布式事务', 'Mafka'],
    imagePath: meiTuan
  },
  {
    id: 'work-2',
    type: 'Work',
    title: '后台开发',
    organization: '腾讯-TEG-云架构平台部',
    start: new Date('2024-04-15'),
    end: new Date('2024-06-20'),
    details: [
      '暑期转正实习（深圳）',
      '参与云平台核心服务的开发与维护',
      '负责设计并实现分布式缓存模块',
      '基于Go语言完善开发运维监控工具'
    ],
    skills: ['Go', 'Kubernetes', 'Redis', '微服务'],
    imagePath: tencent
  },
  {
    id: 'work-3',
    type: 'Work',
    title: 'QA游戏测试',
    organization: '米哈游-原神',
    start: new Date('2024-12-26'),
    end: new Date('2025-03-26'),
    details: [
      '《原神》纳塔5.3-5.6版本游戏测试',
      '负责测试游戏功能、性能、稳定性',
      '发现并报告游戏bug，与开发团队合作解决问题'
    ],
    skills: ['C++', 'Golang', 'Lua', 'Redis', 'Perforce'],
    imagePath: miHoYo
  },
  {
    id: 'work-4',
    type: 'Work',
    title: '央企程序猿',
    organization: '现任央企',
    start: new Date('2025-07-11'),
    end: null,
    details: [
      '负责生产安全培训工作，确保团队成员熟悉安全规范',
      '进行智能设备图像识别模块训练，提升识别准确率',
      '开发自动化办公工具，提高日常工作效率'
    ],
    skills: ['Python', 'YOLO'],
    imagePath: orange
  },
  {
    id: 'activity-1',
    type: 'Activity',
    title: '牛马时薪计算器',
    organization: 'Trae黑客松活动产出',
    start: new Date('2025-12-27'),
    end: new Date('2025-12-27'),
    details: [
      '参加Trae黑客松竞赛，开发的一款牛马时薪计算工具',
      '使用原生JavaScript和CSS构建响应式Web应用',
      '支持多种薪酬类型（时薪/日薪/月薪/年薪）和工作制度计算',
      '实现休息时间、摸鱼时间、通勤时间、生活成本等多维度参数',
      '设计成就系统和趣味对比功能，提升用户体验',
      '采用模块化开发，包含计算器、渲染器等独立模块'
    ],
    skills: ['JavaScript', 'CSS3', 'HTML5', '模块化开发'],
    imagePath: cattlePay
  },
  {
    id: 'activity-2',
    type: 'Activity',
    title: 'Paws Up! - 节奏音游',
    organization: 'That Game Jam',
    start: new Date('2025-12-20'),
    end: new Date('2026-01-05'),
    details: [
      '使用Godot引擎独立开发单音轨节奏音游',
      '实现猫猫拳和猫猫哈气两种打击方式，支持Space和Enter键操作',
      '设计五位性格迥异的NPC对应五首特别音乐，包含快速连打音符等特殊机制',
      '成功导出WebGL版本，支持浏览器直接游玩',
      '参加That Game Jam游戏开发竞赛'
    ],
    skills: ['Godot Engine', 'GDScript', 'WebGL', '游戏设计'],
    imagePath: pawsUp
  },
];

// 当前激活的tab
const activeTab = ref<'Education' | 'Work' | 'Activity' | 'All'>('All');

// 根据当前tab过滤数据并按时间排序（升序）
const filteredExperienceData = computed(() => {
  let filtered = [...experienceData]; // 创建副本以避免修改原数组

  // 如果不是All选项，则按类型过滤
  if (activeTab.value !== 'All') {
    filtered = filtered.filter(item => item.type === activeTab.value);
  }

  // 按start时间升序排序（最早的排在前面）
  // 使用Date对象直接比较，更高效且精确
  return filtered.sort((a, b) => a.start.getTime() - b.start.getTime());
});

/**
 * 切换tab的函数
 * @param tab 要切换的tab类型 'education' 或 'work' 或 'project' 或 'all'
 */
function switchTab(tab: 'Education' | 'Work' | 'Activity' | 'All') {
  activeTab.value = tab;
}
</script>

<template>
  <div class="career-page" id="career">
    <!-- 页面标题 -->
    <h1 class="title">Career</h1>
    <p class="sub-title">Education && Work && Activity</p>
    <div class="container">
      <!-- Tab切换栏 -->
      <div class="tab-container">
        <div :class="['tab-button button', { active: activeTab === 'All' }]" @click="switchTab('All')">
          📋All
        </div>
        <div :class="['tab-button button', { active: activeTab === 'Education' }]" @click="switchTab('Education')">
          🎓Education
        </div>
        <div :class="['tab-button button', { active: activeTab === 'Work' }]" @click="switchTab('Work')">
          💼Work
        </div>
        <div :class="['tab-button button', { active: activeTab === 'Activity' }]" @click="switchTab('Activity')">
          🎮Activity
        </div>
      </div>

      <!-- 内容区域 -->
      <div class="content-area">
        <!-- 时间线容器 - 添加key属性确保切换时重新渲染 -->
        <div class="timeline-container" :key="activeTab">
          <div v-for="item in filteredExperienceData" :key="item.id" class="timeline-item">

            <!-- 内容左侧部分 -->
            <div class="timeline-base">
              <h3 class="timeline-title">{{ item.title }}</h3>
              <p class="timeline-organization">{{ item.organization }}</p>
              <span class="timeline-period">{{ formatPeriod(item.start, item.end) }}</span>
              <!-- 图片区域 -->
              <div class="timeline-image-container" v-if="item.imagePath">
                <img :src="item.imagePath" :alt="item.title" class="timeline-image" />
              </div>
            </div>
            <!-- 内容右侧部分 -->
            <div class="timeline-desc">
              <!-- 详情列表 -->
              <ul class="timeline-details" v-if="item.details && item.details.length > 0">
                <li v-for="(detail, i) in item.details" :key="i">{{ detail }}</li>
              </ul>

              <!-- 技能标签 -->
              <div class="skills-container" v-if="item.skills && item.skills.length > 0">
                <span v-for="(skill, i) in item.skills" :key="i" class="skill-badge">{{ skill }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.career-page {
  width: 90%;
  padding: 40px 20px;
  flex-direction: column;
}

/* Tab容器 */
.tab-container {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin: 20px 0;
}

/* Tab按钮 */
.tab-button {
  width: 200px;
  padding: 10px 0;
  color: var(--text-main);
  background-color: var(--bg-tag);
  border-radius: 25px;
  font-size: 20px;
  font-weight: 500;
  transition: all 0.3s ease;
  text-align: center;
}

.tab-button:hover {
  color: var(--text-main-focus);
}

.tab-button.active {
  color: var(--button-text-white);
  background-color: var(--button-bg-orange);
}

/* 时间线 */
.timeline-item {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-around;
}

.timeline-item::after {
  content: '';
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: 100%;
  background-color: var(--orange-500);
}

.timeline-item::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-50%);
  width: 16px;
  height: 16px;
  background-color: var(--text-main-focus);
  border-radius: 100%;
  border: 4px solid var(--page-bg);
  transition: all 0.3s ease;
  z-index: 1;
}

.timeline-base,
.timeline-desc {
  flex: 1;
  max-width: 45%;
}

/* 标题 */
.timeline-title {
  font-size: 20px;
  color: var(--text-main);
  margin: 0;
  font-weight: 600;
}

/* 时间段 */
.timeline-period {
  color: var(--text-secondary);
  background-color: var(--bg-tag);
  padding: 2px 12px;
  border-radius: 20px;
  font-weight: 500;
}

/* 组织 */
.timeline-organization {
  color: var(--text-secondary);
  margin-bottom: 10px;
  font-weight: 500;
}


/* 图片容器 */
.timeline-image-container {
  width: 70%;
  max-height: 200px;
  overflow: hidden;
  padding: 10px;
}

/* 时间线图片样式 */
.timeline-image {
  width: 100%;
  object-fit: cover;
  /* 保持比例并裁剪显示 */
  border-radius: 8px;
  transition: transform 0.3s ease;
}

/* 时间线详情列表 */
.timeline-details {
  padding: 0;
  margin: 10px 0 0 0;
}

/* 基础样式重置 */
.timeline-details li {
  position: relative;
  color: var(--text-secondary);
  line-height: 1.6;
  padding-left: 1rem;
}

.timeline-details li::before {
  content: '';
  position: absolute;
  top: 0.8rem;
  transform: translateY(-50%);
  width: 6px;
  height: 6px;
  background-color: var(--text-main-focus);
  border-radius: 50%;
  left: 0;
}

/* 技能标签容器 */
.skills-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
}

/* 技能标签 */
.skill-badge {
  background-color: var(--bg-tag-focus);
  color: var(--text-main-focus);
  padding: 2px 10px;
  border-radius: 15px;
  font-size: 13px;
  font-weight: 500;
}

.timeline-image:hover {
  transform: scale(1.02);
}

.timeline-item:nth-child(even) {
  flex-direction: row-reverse;
}

.timeline-item:nth-child(odd) .timeline-base {
  text-align: right;
}

.timeline-item:nth-child(odd) .timeline-base .timeline-image-container {
  margin-left: auto;
}

.timeline-item:nth-child(even) .timeline-desc {
  text-align: right;
}

.timeline-item:nth-child(even) .timeline-desc .timeline-details li {
  padding-right: 1rem;
}

.timeline-item:nth-child(even) .timeline-desc .timeline-details li::before {
  left: auto;
  right: 0;
}

.timeline-item:nth-child(even) .timeline-desc .skills-container {
  justify-content: flex-end;
}

/* 动画效果 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 内容区域的容器，添加切换时的过渡效果 */
.timeline-container {
  transition: opacity 0.3s ease, transform 0.3s ease;
  min-height: 600px;
  width: 100%;
}

.timeline-item {
  animation: fadeIn 0.6s ease-out;
  animation-fill-mode: forwards;
  width: 100%;
}

/* tab切换时的过渡效果 */
.content-area {
  position: relative;
  min-height: 600px;
}

/* 确保切换内容时的平滑过渡 */
.timeline-container {
  position: relative;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .tab-container {
    flex-direction: column;
    gap: 10px;
  }

  .tab-button {
    width: 100%;
  }

  /* 响应式：单侧时间线布局 */
  .timeline-item {
    width: calc(100% - 1rem);
    flex-direction: column !important;
    align-items: flex-start;
    position: relative;
    padding-left: 1rem;
  }

  .timeline-item::after {
    left: 0;
    height: 100%;
  }

  .timeline-item::before {
    left: 0;
    top: 50%;
  }

  .timeline-base,
  .timeline-desc {
    max-width: 100%;
    text-align: left !important;
    margin: 0 0 10px 0 !important;
  }


  .skills-container {
    justify-content: flex-start !important;
  }

  /* 响应式图片样式 */
  .timeline-image-container {
    margin: auto;
    height: 150px;
  }

  .timeline-item .timeline-desc .timeline-details li::before {
    left: 0 !important;
    right: auto !important;
  }
}
</style>
