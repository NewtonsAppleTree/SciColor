<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# SciColor: Scientific Color Synthesis Tool

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

## 🖥 Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   ```bash
   npm install
   ```
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   ```bash
   npm run dev`
   ```

> View your app in AI Studio: https://ai.studio/apps/7135d7df-3360-45f0-8e71-73b5587e49fe
