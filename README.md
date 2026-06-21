# Web 技术基础 — 课程学习平台

> 闽江大学 · 计算机与大数据学院 · 人工智能  
> 2025-2026 学年第二学期 Web 技术基础课程大作业  
> **作者：苏友灿** &nbsp;|&nbsp; **学号：3232707221**

---

## 📖 项目简介

本项目是《Web 技术基础》课程的综合性大作业，从零开始逐步构建一个功能完善的 **课程学习平台**。项目涵盖 HTML5 语义化标签、CSS3 布局与动画、JavaScript 交互开发、第三方图表库集成等 Web 前端核心技术。

平台以 iframe 多页架构组织，提供课程简介、课程表、教材展示、备忘录、数据图表、音乐播放器、记忆翻牌小游戏等功能模块。

---

## 📁 项目结构

```
web_project/
├── Websyc_V1.0/           # 实验一：HTML 基础页面搭建
│   ├── index.html         #   静态首页，展示课程图片
│   ├── favicon.ico
│   └── images/            #   课程相关图片资源
│
├── Websyc_V2.0/           # 实验二：CSS 样式与多页面
│   ├── index.html         #   首页（iframe 导航框架）
│   ├── introduce.html     #   课程简介页
│   ├── schedule.html      #   课程表页（HTML 表格）
│   ├── book.html          #   教材展示页
│   ├── css/               #   分离的 CSS 样式文件
│   │   ├── common.css     #   公共样式
│   │   ├── index.css
│   │   ├── introduce.css
│   │   ├── schedule.css
│   │   └── book.css
│   └── images/
│
├── Websyc_V3.0/           # 实验三：JavaScript 交互
│   ├── index.html
│   ├── memo.html          #   备忘录页面（新增）
│   ├── js/
│   │   └── utils.js       #   工具函数（日期处理等）
│   ├── css/
│   │   └── memo.css       #   备忘录样式（新增）
│   └── ...
│
├── Websyc_V4.0/           # 实验四：ECharts 数据可视化
│   ├── echart.html        #   数据图表页（新增）
│   │                      #   包含折线图、堆叠折线图、面积图、饼图
│   └── ...
│
└── Websyc_V5.0/           # 🏆 大作业（最终完整版）
    ├── pages/             #   所有页面模块
    │   ├── index.html     #     主框架页（导航 + iframe）
    │   ├── introduce.html #     课程简介（含轮播图）
    │   ├── schedule.html  #     课程表（交互式）
    │   ├── book.html      #     教材展示
    │   ├── memo.html      #     备忘录（sessionStorage）
    │   ├── echart.html    #     数据图表（ECharts）
    │   ├── audio.html     #     音乐播放器
    │   └── game.html      #     记忆翻牌小游戏
    ├── css/               #   样式文件（B站风格主题）
    │   ├── common.css     #     公共样式 + CSS 变量主题
    │   ├── index.css
    │   ├── auth.css       #     登录注册弹窗样式
    │   ├── carousel.css   #     轮播图样式
    │   ├── introduce.css
    │   ├── schedule.css
    │   ├── book.css
    │   ├── memo.css
    │   ├── music.css      #     音乐播放器样式
    │   └── game.css       #     翻牌游戏样式
    ├── js/                #   JavaScript 脚本
    │   ├── utils.js       #     工具函数
    │   ├── auth.js        #     登录/注册逻辑
    │   ├── carousel.js    #     轮播图自动播放
    │   ├── music.js       #     音乐播放器控制
    │   └── game.js        #     翻牌游戏逻辑
    └── assets/            #   静态资源
        ├── audio/         #     音频文件（.mp3 / .flac）
        │   ├── yeqiu.mp3
        │   ├── daoxiang.mp3
        │   └── qingtian.mp3
        └── images/        #     专辑封面
            ├── yeqiu.jpg
            ├── daoxiang.jpg
            └── qingtian.jpg
```

---

## 🚀 功能模块

### 🔑 登录 / 注册
- 弹窗式登录注册表单，Tab 切换
- 用户名格式校验（6-20 位字母开头）、密码强度校验（大小写+数字+特殊字符）
- 基于 `localStorage` 的用户数据持久化存储
- 登录状态显示与退出

### 📖 课程简介
- 4 张轮播图（自动播放 + 手动切换）
- 课程概述、学习目标、核心技术栈介绍
- 响应式卡片布局

### 📅 课程表
- 标准 HTML `<table>` 结构，含行合并（rowspan）
- 不同课程用不同背景色区分
- 点击课程单元格显示课程名称

### 📚 教材展示
- 5 门课程（计算机组成原理、Java、Web 技术基础、数据库、离散数学）的教材与参考书
- 网格布局展示书籍封面图片

### 📝 备忘录
- 基于 `sessionStorage` 的数据增删改查
- 添加日期、内容、重要性（重要/普通）、状态（已完成/未完成）
- 点击条目切换完成状态，列表实时刷新

### 📊 数据图表（ECharts）
- 基础折线图 — 月度销售额趋势
- 堆叠折线图 — 多产品线季度收入
- 区域面积图 — 近两年月均气温对比
- 饼图 — 品类销售占比
- 图表响应式自适应

### 🎵 音乐空间
- 3 首周杰伦歌曲（夜曲、稻香、晴天）
- 完整播放器 UI：封面、进度条、播放/暂停、上一首/下一首
- 播放列表点击切换
- 进度条拖拽控制

### 🎮 记忆翻牌大挑战
- 4×4 卡牌网格（8 对 emoji）
- 步数与计时统计
- 翻牌匹配逻辑、胜利判定
- 重新开始按钮

### 🎨 UI 设计
- B站（Bilibili）风格设计语言：粉蓝主色调、圆角、柔和阴影
- CSS 变量体系管理全局主题
- Flex / Grid 弹性布局
- 过渡动画与微交互

---

## 🛠 技术栈

| 技术 | 说明 |
|------|------|
| **HTML5** | 语义化标签、iframe、HTML5 Audio |
| **CSS3** | Flex/Grid 布局、CSS 变量、过渡动画、响应式 |
| **JavaScript (ES5/ES6)** | DOM 操作、事件处理、localStorage/sessionStorage |
| **ECharts 5.4** | 数据可视化图表（CDN 引入） |

---

## 📂 版本演进

| 版本 | 实验 | 核心内容 |
|------|------|----------|
| V1.0 | 实验一 | HTML 基础标签，图片插入，页面结构搭建 |
| V2.0 | 实验二 | CSS 样式分离，多页面设计，iframe 导航框架，表格 |
| V3.0 | 实验三 | JavaScript 入门，备忘录 CRUD，sessionStorage |
| V4.0 | 实验四 | ECharts 集成，4 种图表类型，CDN 外部库引入 |
| V5.0 | 🏆 大作业 | 功能整合 + 登录注册 + 音乐播放器 + 翻牌游戏 + B站主题 |

---

## 🔧 运行方式

直接用浏览器打开各版本目录下的 `index.html` 即可运行（无需构建工具或后端服务）。

```bash
# 例如运行最终版
start Websyc_V5.0/pages/index.html
# 或直接双击文件打开
```

> **注意**：数据图表（echart.html）和音乐播放器（audio.html）依赖 CDN 或本地资源文件，请保持网络畅通并确保 `assets/` 目录完整。

---

## 📝 开发记录

```
d279156  大作业（V5.0 最终版）
783a653  实验四
34813f0  实验五完整版
5a44b02  大作业-实验五
9d9dd10  实验四
ad12b7f  实验三
85d94fd  实验三
be34e62  实验二
d562f6a  实验二
93e93b3  实验一
```

---

© 闽江学院 · 计算机与大数据学院 &trade; 软件工程
