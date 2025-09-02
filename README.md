# MyWebsite

## 开发进度
功能完善
1. 完善"关于"页面 - 当前AboutPage.vue内容为空，需要添加个人介绍、技能展示等内容。
2. 实现其他导航页面 - 导航栏中有Skill、Career、Portfolio、Contact等链接，但尚未实现对应页面和路由。
3. 移动端菜单 - NavigationBar.vue中为移动端预留了菜单按钮，但未实现展开功能。

性能优化
1. 图片优化 - 对header.jpg和orange.svg进行压缩，减少加载时间。
2. 代码分割 - 为不同页面组件启用路由级别的代码分割，提升首屏加载速度。

用户体验
1. 平滑滚动 - 为页面内锚点链接添加平滑滚动效果。
2. 加载状态 - 为页面切换添加加载动画或过渡效果。
3. SEO优化 - 为不同页面添加合适的meta标签和页面标题。

技术改进
1. 状态管理 - 引入Pinia或Vuex管理全局状态，如主题切换状态。
2. 组件复用 - 将标签墙等通用组件提取到更通用的位置，方便复用。
3. 类型定义 - 为组件属性和数据添加更完善的TypeScript类型定义。

内容扩展
1. 多语言支持 - 实现网站的多语言切换功能。
2. 博客功能 - 添加博客文章展示和详情页面。
3. 项目展示 - 完善Portfolio部分，展示更多项目详情。

这是一个使用 Vue 3、Vite 和 TypeScript 构建的个人网站项目。

## 项目结构

```
src/
├── App.vue                 # 根组件
├── main.ts                 # 应用入口文件
├── components/             # 组件目录
│   ├── layout/             # 布局组件
│   │   ├── FooterBar.vue   # 页脚组件
│   │   ├── NavigationBar.vue # 导航栏组件
│   │   ├── PageBox.vue     # 页面盒子组件
│   │   └── SideBar.vue     # 侧边栏组件
│   └── page/               # 页面组件
│       ├── AboutPage.vue   # 关于页面
│       ├── HomePage.vue    # 主页页面
│       └── ui/             # 页面UI组件
│           └── TagsWall.vue # 标签墙组件
├── router/                 # 路由配置
│   └── index.ts            # 路由入口文件
├── style/                  # 样式文件
│   ├── color.css           # 颜色变量定义
│   └── reset.css           # CSS重置样式
└── views/                  # 视图组件
    └── HomeView.vue        # 首页视图
```

## 功能特性

- 响应式设计，适配手机和平板
- 深色/浅色主题切换
- 标签墙动画效果
- 页面滚动动画

## 技术栈

- Vue 3 (Composition API)
- Vite
- TypeScript
- Vue Router
- CSS3 (动画和响应式设计)

## 开发规范

- 使用 Vue 单文件组件 (SFC)
- 使用 TypeScript 进行类型检查
- 使用 CSS 变量管理主题颜色
- 遵循组件化开发思想

## 快速开始

1. 安装依赖: `npm install`
2. 启动开发服务器: `npm run dev`
3. 构建生产版本: `npm run build`