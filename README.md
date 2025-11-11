# 个人网站 - XiChen's Website

这是一个使用 Vue 3、Vite 和 TypeScript 构建的个人网站项目，用于展示个人信息、技能、经历和项目等内容。

体验地址：[晨光随笔 - 简历页](https://www.xichen8.top)

## 项目概述

本项目是一个现代化的个人网站，旨在提供一个专业、美观的平台来展示个人信息。网站采用响应式设计，适配各种屏幕尺寸，包括桌面、平板和移动设备。

主要功能模块包括：
- 个人主页（Home）-> 展示基本信息和标签墙
- 关于页面（About）-> 个人简介和经历概览
- 技能页面（Skill）-> 专业技能展示
- 职业页面（Career）-> 工作经历和实习经验
- 作品集（Portfolio）-> 项目展示
- 联系方式（Contact）-> 联系表单和社交媒体链接

## 技术栈

- **前端框架**: Vue 3 (Composition API)
- **构建工具**: Vite 7
- **类型系统**: TypeScript
- **路由管理**: Vue Router 4
- **样式处理**: CSS3
- **图标库**: iconfont

## 项目结构

```
src/
├── App.vue                 # 根组件
├── main.ts                 # 应用入口文件
├── assets/                 # 静态资源
│   ├── color/              # 彩色icon资源
│   ├── icons/              # 图标资源
│   └── img/                # 图片资源
├── components/             # 组件目录
│   ├── layout/             # 布局组件
│   │   ├── FooterBar.vue   # 页脚组件
│   │   ├── NavigationBar.vue # 导航栏组件
│   │   ├── PageBox.vue     # 页面盒子组件
│   │   └── SideBar.vue     # 侧边栏组件
│   └── page/               # 页面组件
│       ├── AboutPage.vue   # 关于页面
│       ├── CareerPage.vue  # 职业页面
│       ├── ContactPage.vue # 联系页面
│       ├── HomePage.vue    # 主页页面
│       ├── PortfolioPage.vue # 作品集页面
│       ├── SkillPage.vue   # 技能页面
│       └── ui/             # 页面UI组件
├── router/                 # 路由配置
│   └── index.ts            # 路由入口文件
├── style/                  # 样式文件
│   ├── color.css           # 颜色变量定义
│   ├── common.css          # 通用样式
│   └── reset.css           # CSS重置样式
└── views/                  # 视图组件
    └── HomeView.vue        # 首页视图
```

## 功能特性

- **响应式设计** - 适配不同屏幕尺寸的设备
- **标签墙动画** - 动态展示个人技能和兴趣标签
- **模块化结构** - 组件化设计，易于维护和扩展
- **深色/浅色主题** - 支持主题切换功能
- **页面滚动动画** - 增强用户体验的平滑滚动效果
- **作品集展示** - 可视化展示项目成果
- **简历下载** - 提供个人简历PDF下载功能

## 快速开始

### 环境要求

- Node.js
- npm 或 yarn

### 安装步骤

1. 克隆项目

```bash
git clone git@github.com:XiChen1234/MyWebsite.git
cd MyWebsite
```

2. 安装依赖

```bash
npm install
```

3. 启动开发服务器

```bash
npm run dev
```

4. 构建生产版本

```bash
npm run build
```

5. 预览生产版本

```bash
npm run preview
```

## 开发说明

### 开发规范

- 使用 Vue 单文件组件 (SFC)
- 使用 TypeScript 进行类型检查
- 使用 CSS 变量管理主题颜色
- 遵循组件化开发思想

### 命令说明

- `npm run dev`: 启动开发服务器
- `npm run build`: 构建生产版本
- `npm run preview`: 预览生产版本
- `npm run type-check`: TypeScript 类型检查
- `npm run lint`: ESLint 代码检查和修复

## 更新历史

- 2025.10.22 16:16: 项目正式部署在京东云15天试用服务器
- 2025.10.23 17:17: 修复了部分bug
- 2025.11.04 09:49: 项目正式上线阿里云
- 2025.11.04 10:00: 提交ICP备案表单
- 2025.11.05 10:30: ICP备案成功，更新网站页脚ICP信息
- 2025.11.07 16:58: 完成SSL配置和重定向，启用HTTPS访问
- 2025.11.11 08:45: 更新仓库链接和体验地址

## 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件

---

*© 2025 XiChen's Website. All rights reserved.*