<div align="center">

**🌐 Language / 语言：** [English](./README.md) | [简体中文](./README.zh-CN.md)

<img src="https://github.com/user-attachments/assets/39eaf138-28d4-461d-9eaf-48222b6001fe" alt="SciColor Banner" width="100%"/>

<br/>

[![Website](https://img.shields.io/badge/🌐%20在线演示-newtonsappletree.github.io%2FSciColor-4A90D9?style=for-the-badge)](https://newtonsappletree.github.io/SciColor/)
[![GitHub stars](https://img.shields.io/github/stars/NewtonsAppleTree/SciColor?style=for-the-badge&logo=github&color=FFD700)](https://github.com/NewtonsAppleTree/SciColor/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/NewtonsAppleTree/SciColor?style=for-the-badge&logo=github&color=4CAF50)](https://github.com/NewtonsAppleTree/SciColor/network)
[![GitHub license](https://img.shields.io/github/license/NewtonsAppleTree/SciColor?style=for-the-badge)](https://github.com/NewtonsAppleTree/SciColor/blob/main/LICENSE)

[![Visitor Badge](https://visitor-badge.laobi.icu/badge?page_id=NewtonsAppleTree.SciColor&left_color=gray&right_color=4A90D9&left_text=Visitors)](https://github.com/NewtonsAppleTree/SciColor)

</div>

---

**SciColor** 是一款面向科学家与研究人员的高品质极简主义 Web 应用，用于策划、可视化和导出高保真科学数据配色方案。专为出版物级别的标准而优化，它在原始数据与科学传播的美学清晰度之间架起了桥梁。

---

## 🚀 核心功能

### 1. 精选科学配色库

- **期刊标准配色：** 收录来自高影响力期刊（如 Nature、Science、The Lancet）的经典配色方案。
- **顺序型与发散型：** 专为热图、密度图和渐变可视化优化的调色板。
- **模板功能：** 将自定义配色配置保存为本地模板，确保跨会话的一致性。

### 2. 实时专业可视化预览

- **场景预览：** 即时查看颜色在多种图表类型中的实际效果：
  - **柱状图**（分类对比）
  - **折线图**（重叠与可读性）
  - **散点图**（密度与分布）
  - **热图**（渐变过渡）
  - **饼图**（比例清晰度）

### 3. 精密调色板编辑器

- **交互式控制：** 动态调整调色板分辨率（从 2 到 20 个色槽）。
- **手动精修：** 直接编辑十六进制色码，或使用内置的**颜色供体池**从现有预设中替换颜色。
- **印刷安全意识：** 实时 CMYK 计算，并对高黑色浓度（K > 85%）自动发出警告，确保出版物打印安全。

### 4. 图像颜色提取引擎

- **色谱采样：** 上传任意科学图像，自动提取其主色调，帮助复刻或改编历史风格。

### 5. 多平台代码导出

为主流科学计算环境生成即用型代码：

- **Python：** Matplotlib `plt.cycler` 集成代码。
- **R：** ggplot2 的 `scale_fill_manual` 代码片段。
- **Matlab：** `defaultAxesColorOrder` 矩阵。
- **Web CSS：** 标准化 CSS 变量注入。

---

## 🛠 技术栈

| 层级 | 技术 |
|---|---|
| 前端框架 | [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) |
| 样式 | [Tailwind CSS v4](https://tailwindcss.com/) |
| UI 组件 | [shadcn/ui](https://ui.shadcn.com/)（基于 Radix UI） |
| 颜色逻辑 | [D3.js](https://d3js.org/)（插值与 RGB 转换） |
| 数据可视化 | [Recharts](https://recharts.org/) |
| 动画 | [Framer Motion](https://www.framer.com/motion/) |

---

## 🎨 设计理念：高级极简主义

SciColor 遵循以**功能清晰性**与"实验室仪器"美学为核心的设计哲学。

- **简洁几何：** 柔和圆角容器与一致的间距，减少认知负担。
- **字体体系：** 严格的层级结构，UI 使用 *Inter*，科学数据与代码使用 *JetBrains Mono*。
- **精致交互：** 微妙的微动效与非侵入式反馈（Toast 提示），模拟高端物理研究工具的使用体验。

---

## 🌐 在线使用

无需安装 — SciColor 已作为托管 Web 应用上线：

**👉 [https://newtonsappletree.github.io/SciColor/](https://newtonsappletree.github.io/SciColor/)**

直接在浏览器中打开链接，即可立即开始构建配色方案。

---

## 🖥 本地运行

> 本项目使用 [Google AI Studio](https://aistudio.google.com/) 开发。

### 前置条件

安装 [Node.js](https://nodejs.org/)（推荐 LTS 版本）。通过以下命令验证安装：

```bash
node -v
npm -v
```

两条命令均应输出版本号。

### 步骤

**1. 打开项目根目录**

导航到包含 `package.json` 的文件夹：

```bash
# Windows 示例
cd C:\Users\YourName\Desktop\SciColor

# macOS / Linux 示例
cd /Users/YourName/Desktop/SciColor
```

**2. 安装依赖**

下载所有必要库（将创建 `node_modules` 文件夹）：

```bash
npm install
```

等待命令执行完毕后再进行下一步。

**3. 启动开发服务器**

```bash
npm run dev
```

**4. 在浏览器中打开**

启动后，终端会显示本地地址 — 将其复制到浏览器中打开：

```
  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

---

## 📊 GitHub 统计

<div align="center">

### 🏆 GitHub 奖杯

<a href="https://github.com/ryo-ma/github-profile-trophy"><img src="https://github-profile-trophy.vercel.app/?username=NewtonsAppleTree&theme=darkhub" alt="trophy" /></a>

### 📈 仓库统计

![GitHub Stats](https://github-readme-stats.vercel.app/api?username=NewtonsAppleTree&show_icons=true&theme=default&hide_border=true&title_color=4A90D9&icon_color=4A90D9&text_color=333333&bg_color=ffffff)
![Top Languages](https://github-readme-stats.vercel.app/api/top-langs/?username=NewtonsAppleTree&layout=compact&theme=default&hide_border=true&title_color=4A90D9&text_color=333333&bg_color=ffffff)

</div>
