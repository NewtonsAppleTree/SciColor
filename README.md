<div align="center">

<img src="https://github.com/user-attachments/assets/39eaf138-28d4-461d-9eaf-48222b6001fe" alt="SciColor Banner" width="100%"/>

<br/>

[![Website](https://img.shields.io/badge/🌐%20Live%20Demo-newtonsappletree.github.io%2FSciColor-4A90D9?style=for-the-badge)](https://newtonsappletree.github.io/SciColor/)
[![GitHub stars](https://img.shields.io/github/stars/NewtonsAppleTree/SciColor?style=for-the-badge&logo=github&color=FFD700)](https://github.com/NewtonsAppleTree/SciColor/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/NewtonsAppleTree/SciColor?style=for-the-badge&logo=github&color=4CAF50)](https://github.com/NewtonsAppleTree/SciColor/network)
[![GitHub license](https://img.shields.io/github/license/NewtonsAppleTree/SciColor?style=for-the-badge)](https://github.com/NewtonsAppleTree/SciColor/blob/main/LICENSE)

[![Visitor Badge](https://visitor-badge.laobi.icu/badge?page_id=NewtonsAppleTree.SciColor&left_color=gray&right_color=4A90D9&left_text=Visitors)](https://github.com/NewtonsAppleTree/SciColor)

</div>

---

**SciColor** is a premium, minimalist web application designed for scientists and researchers to curate, visualize, and export high-fidelity color palettes for quantitative data. Optimized for publication standards, it bridges the gap between raw data and aesthetic clarity in scientific communication.

---

## 🚀 Key Features

### 1. Curated Scientific Library

- **Journal Standards:** Access established color schemes from high-impact journals (e.g., Nature, Science, The Lancet).
- **Sequential & Diverging:** Optimized palettes for heatmaps, density plots, and gradient-based visualizations.
- **Templates:** Save your custom color configurations as localized templates for consistent cross-session usage.

### 2. Live Professional Visualizer

- **Contextual Previews:** Instantly see how your colors perform across multiple chart types:
  - **Bar Plots** (Categorical contrast)
  - **Line Graphs** (Overlap & legibility)
  - **Scatter Plots** (Density & distribution)
  - **Heatmaps** (Gradient transition)
  - **Pie Charts** (Proportional clarity)

### 3. Precision Palette Editor

- **Interactive Controls:** Adjust palette resolution dynamically (from 2 up to 20 slots).
- **Manual Refinement:** Manually edit Hex codes or use the integrated **Color Donor Pool** to swap colors from existing presets.
- **Print Safety Awareness:** Real-time CMYK calculation with automatic density warnings for high-black concentrations (K > 85%) to ensure publication safety.

### 4. Image Extraction Engine

- **Chromatographic Sampling:** Upload any scientific figure or image to automatically extract its primary color signature, allowing you to replicate or adapt historical styles.

### 5. Multi-Platform Export

Production-ready code generation for major scientific environments:

- **Python:** Matplotlib `plt.cycler` integration.
- **R:** `scale_fill_manual` snippets for ggplot2.
- **Matlab:** `defaultAxesColorOrder` matrix.
- **Web CSS:** Standardized CSS variable injection.

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) |
| UI Components | [shadcn/ui](https://ui.shadcn.com/) (Radix UI) |
| Color Logic | [D3.js](https://d3js.org/) (Interpolation & RGB Conversion) |
| Visualization | [Recharts](https://recharts.org/) |
| Animations | [Framer Motion](https://www.framer.com/motion/) |

---

## 🎨 Design Philosophy: Premium Minimalism

SciColor follows an **intentional design philosophy** centered on functional clarity and "Laboratory instrument" aesthetics.

- **Clean Geometry:** Soft-rounded containers and consistent spacing to reduce cognitive load.
- **Typography:** A rigorous hierarchy using *Inter* for UI and *JetBrains Mono* for scientific data/code.
- **Sophisticated Interaction:** Subtle micro-animations and non-intrusive feedback (toasts) simulate the experience of a high-end physical research tool.

---

## 🌐 Try It Online

No installation needed — SciColor is available as a hosted web app:

**👉 [https://newtonsappletree.github.io/SciColor/](https://newtonsappletree.github.io/SciColor/)**

Simply open the link in your browser and start building palettes instantly.

---

## 🖥 Run Locally

> This project was developed with [Google AI Studio](https://aistudio.google.com/).

### Prerequisites

Install [Node.js](https://nodejs.org/) (LTS version recommended). To verify the installation, run:

```bash
node -v
npm -v
```

Both commands should print a version number.

### Steps

**1. Open the project root directory**

Navigate to the folder containing `package.json`:

```bash
# Windows example
cd C:\Users\YourName\Desktop\SciColor

# macOS / Linux example
cd /Users/YourName/Desktop/SciColor
```

**2. Install dependencies**

Download all required libraries (creates the `node_modules` folder):

```bash
npm install
```

Wait for the command to finish before proceeding.

**3. Start the development server**

```bash
npm run dev
```

**4. Open in your browser**

After startup, the terminal will display a local address — copy it into your browser:

```
  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

---

## 📊 GitHub Stats

<div align="center">

### 🏆 GitHub Trophies

[![trophy](https://github-profile-trophy.vercel.app/?username=ryo-ma&theme=algolia)](https://github.com/ryo-ma/github-profile-trophy)

### 📈 Repository Stats

![GitHub Stats](https://github-readme-stats.vercel.app/api?username=NewtonsAppleTree&show_icons=true&theme=default&hide_border=true&title_color=4A90D9&icon_color=4A90D9&text_color=333333&bg_color=ffffff)
![Top Languages](https://github-readme-stats.vercel.app/api/top-langs/?username=NewtonsAppleTree&layout=compact&theme=default&hide_border=true&title_color=4A90D9&text_color=333333&bg_color=ffffff)

</div>
