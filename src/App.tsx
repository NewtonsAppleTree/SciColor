/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import * as d3 from 'd3';
import { 
  Palette as PaletteIcon, 
  Download, 
  Copy, 
  Plus, 
  Trash2, 
  ChevronRight, 
  BarChart3, 
  ScatterChart as ScatterIcon, 
  Grid3X3,
  RefreshCw,
  Save,
  ExternalLink,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  ZAxis,
  Cell as RechartsCell,
  PieChart,
  Pie,
  LineChart,
  Line
} from 'recharts';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';

import { PRESET_PALETTES, Palette } from './palettes';
import { cn } from '@/lib/utils';

// --- Mock Data for Visualizations ---
const generateBarData = (count: number) => 
  Array.from({ length: count }, (_, i) => ({
    name: `Group ${i + 1}`,
    value: Math.floor(Math.random() * 80) + 20,
  }));

const generateScatterData = (count: number) => 
  Array.from({ length: 30 }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    z: Math.random() * 100,
    group: Math.floor(Math.random() * count),
  }));

const generatePieData = (count: number) =>
  Array.from({ length: count }, (_, i) => ({
    name: `Category ${i + 1}`,
    value: Math.floor(Math.random() * 50) + 10,
  }));

const generateLineData = (count: number) =>
  Array.from({ length: 10 }, (_, i) => {
    const obj: any = { name: `T${i + 1}` };
    for (let j = 0; j < count; j++) {
      obj[`v${j}`] = Math.floor(Math.random() * 100);
    }
    return obj;
  });

// --- Components ---

const ScientificLogo = () => (
  <div className="flex gap-1">
    <div className="w-1.5 h-6 bg-[#4285F4] rounded-full shadow-sm" />
    <div className="w-1.5 h-6 bg-[#F54927] rounded-full shadow-sm" />
    <div className="w-1.5 h-6 bg-[#FBBC05] rounded-full shadow-sm" />
    <div className="w-1.5 h-6 bg-[#34A853] rounded-full shadow-sm" />
  </div>
);

interface ColorChipProps {
  key?: React.Key;
  color: string;
  label?: string;
  onClick?: () => void;
}

const ColorChip = ({ color, label, onClick }: ColorChipProps) => (
  <div 
    className="group relative flex flex-col items-center gap-1 cursor-pointer"
    onClick={onClick}
  >
    <div 
      className="h-12 w-full rounded-md shadow-sm border border-black/5 transition-transform group-hover:scale-105"
      style={{ backgroundColor: color }}
    />
    {label && <span className="text-[10px] font-mono text-muted-foreground uppercase">{label}</span>}
    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
      <div className="bg-black/80 text-white text-[10px] px-2 py-1 rounded font-mono">
        {color}
      </div>
    </div>
  </div>
);

export default function App() {
  const [colorCount, setColorCount] = useState(6);
  const [selectedPalette, setSelectedPalette] = useState<Palette>(PRESET_PALETTES[0]);
  const [customColors, setCustomColors] = useState<string[]>(PRESET_PALETTES[0].colors.slice(0, 6));
  const [activeTab, setActiveTab] = useState('Journal');
  const [vizType, setVizType] = useState<'bar' | 'scatter' | 'pie' | 'heatmap' | 'line'>('bar');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [exportFormat, setExportFormat] = useState('python');
  const [userTemplate, setUserTemplate] = useState<Palette | null>(null);

  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  // Helper to get exactly N colors from a palette
  const getSampledColors = (palette: Palette, count: number) => {
    const colors = palette.colors;
    const M = colors.length;
    if (palette.category === 'Journal' || palette.category === 'Qualitative') {
      // If we want more than what exists, cycle
      if (count > M) {
        return Array.from({ length: count }, (_, i) => colors[i % M]);
      }
      // If exact or subset, pick distributedly to maximize contrast
      // For qualitative, often the first few are the "best" but users want variety
      // We'll use a linear distribution to pick from the available set
      return Array.from({ length: count }, (_, i) => {
        if (count === 1) return colors[0];
        const index = Math.min(Math.round((i * (M - 1)) / (count - 1)), M - 1);
        return colors[index];
      });
    } else {
      // For sequential/diverging, use interpolation
      const interpolator = d3.interpolateRgbBasis(colors);
      return Array.from({ length: count }, (_, i) => 
        count === 1 ? colors[0] : interpolator(i / (count - 1))
      );
    }
  };

  // Sync custom colors when palette changes
  const handlePaletteSelect = (palette: Palette) => {
    setSelectedPalette(palette);
    setCustomColors(getSampledColors(palette, colorCount));
  };

  // Update count and re-sample current palette
  const handleCountChange = (newCount: number) => {
    setColorCount(newCount);
    setCustomColors(getSampledColors(selectedPalette, newCount));
  };

  const handleColorChange = (index: number, value: string) => {
    const newColors = [...customColors];
    newColors[index] = value;
    setCustomColors(newColors);
  };

  const addColor = () => {
    const newCount = Math.min(colorCount + 1, 20);
    handleCountChange(newCount);
  };

  const removeColor = (index: number) => {
    if (colorCount <= 2) return;
    const newCount = colorCount - 1;
    handleCountChange(newCount);
  };

  const copyToClipboard = (text: string, message: string) => {
    navigator.clipboard.writeText(text);
    toast.success(message);
  };

  const saveAsTemplate = () => {
    const newTemplate: Palette = {
      id: `custom-${Date.now()}`,
      name: 'User Template',
      colors: [...customColors],
      category: 'Qualitative',
      description: 'Saved custom color sequence'
    };
    setUserTemplate(newTemplate);
    toast.success("Saved as custom template");
  };

  const extractColorsFromImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Resize canvas to a small size for performance and naturally cluster colors
        canvas.width = 100;
        canvas.height = 100;
        ctx.drawImage(img, 0, 0, 100, 100);

        const imageData = ctx.getImageData(0, 0, 100, 100).data;
        const colorCounts: { [key: string]: number } = {};

        for (let i = 0; i < imageData.length; i += 4) {
          const r = imageData[i];
          const g = imageData[i+1];
          const b = imageData[i+2];
          const hex = d3.rgb(r, g, b).formatHex();
          colorCounts[hex] = (colorCounts[hex] || 0) + 1;
        }

        // Sort by frequency and filter out too similar colors (simplified)
        const sortedColors = Object.entries(colorCounts)
          .sort((a, b) => b[1] - a[1])
          .map(entry => entry[0]);

        // Pick top N unique-ish colors
        const extracted: string[] = [];
        for (const hex of sortedColors) {
          if (extracted.length >= colorCount) break;
          const isTooSimilar = extracted.some(existing => {
            const c1 = d3.rgb(existing);
            const c2 = d3.rgb(hex);
            const dist = Math.sqrt((c1.r-c2.r)**2 + (c1.g-c2.g)**2 + (c1.b-c2.b)**2);
            return dist < 30; // Threshold for similarity
          });
          if (!isTooSimilar) extracted.push(hex);
        }

        setCustomColors(extracted);
        toast.success(`Extracted ${extracted.length} colors from image!`);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const barData = useMemo(() => generateBarData(customColors.length), [customColors.length]);
  const scatterData = useMemo(() => generateScatterData(customColors.length), [customColors.length]);
  const pieData = useMemo(() => generatePieData(customColors.length), [customColors.length]);
  const lineData = useMemo(() => generateLineData(customColors.length), [customColors.length]);

  const exportCode = {
    python: `import matplotlib.pyplot as plt\n\n# Scientific Palette\ncolors = [${customColors.map(c => `'${c}'`).join(', ')}]\nplt.rcParams['axes.prop_cycle'] = plt.cycler(color=colors)`,
    r: `# Scientific Palette for ggplot2\ncolors <- c(${customColors.map(c => `'${c}'`).join(', ')})\n\n# Usage:\n# library(ggplot2)\n# ggplot(df, aes(x=x, y=y, fill=group)) + \n#   scale_fill_manual(values = colors)`,
    matlab: `%% Scientific Palette\ncolors = [${customColors.map(c => {
      const rgb = d3.rgb(c);
      return `[${(rgb.r / 255).toFixed(3)} ${(rgb.g / 255).toFixed(3)} ${(rgb.b / 255).toFixed(3)}]`;
    }).join('; ') + '];'}\n\n% Usage:\n% set(groot, 'defaultAxesColorOrder', colors)`,
    css: `/* Scientific Palette Variables */\n:root {\n${customColors.map((c, i) => `  --color-${i + 1}: ${c};`).join('\n')}\n}`
  };

  const getCMYK = (hex: string) => {
    const rgb = d3.rgb(hex);
    let r = rgb.r / 255;
    let g = rgb.g / 255;
    let b = rgb.b / 255;

    let k = Math.min(1 - r, 1 - g, 1 - b);
    if (k === 1) return { c: 0, m: 0, y: 0, k: 100 };
    
    let c = Math.round(((1 - r - k) / (1 - k)) * 100);
    let m = Math.round(((1 - g - k) / (1 - k)) * 100);
    let y = Math.round(((1 - b - k) / (1 - k)) * 100);
    let kPerc = Math.round(k * 100);

    return { c, m, y, k: kPerc };
  };

  return (
    <TooltipProvider>
      <div className="flex min-h-screen bg-[#fcfcfc] text-[#1a1a1a] font-sans selection:bg-primary/20">
        <Toaster position="top-center" />
        
        {/* Sidebar */}
        <aside className="w-[280px] bg-white border-r border-[#e8e8e8] flex flex-col shrink-0">
          <div className="p-6 border-b border-[#e8e8e8] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ScientificLogo />
              <div className="flex flex-col">
                <span className="text-[16px] font-extrabold tracking-tighter leading-none text-[#1a1a1a]">SciColor</span>
                <span className="text-[9px] font-mono text-[#888888] uppercase mt-1 tracking-widest font-bold">Scientific Instrument v2.0</span>
              </div>
            </div>
          </div>

          <ScrollArea className="flex-1">
            <div className="p-4 space-y-6">
              <div className="space-y-3">
                <div className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                      <span>Resolution</span>
                      <span className="font-mono text-primary">{colorCount}</span>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-1">
                      {[2, 4, 6, 8, 10, 12, 16, 20].map((n) => (
                        <button
                          key={n}
                          className={cn(
                            "h-6 rounded-md text-[10px] font-mono border-2 transition-all",
                            colorCount === n 
                              ? "bg-primary text-white border-primary shadow-md shadow-primary/20" 
                              : "bg-white text-muted-foreground border-[#eee] hover:border-primary/20"
                          )}
                          onClick={() => handleCountChange(n)}
                        >
                          {n}
                        </button>
                      ))}
                    </div>

                    <div className="py-2">
                      <input 
                        type="range"
                        min={2}
                        max={20}
                        step={1}
                        value={colorCount}
                        onChange={(e) => handleCountChange(parseInt(e.target.value))}
                        className="w-full h-1 bg-[#eee] rounded-full appearance-none cursor-pointer accent-primary outline-hidden"
                        style={{ WebkitAppearance: 'none' }}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-0.5">
                    {[
                      { id: 'bar', label: 'Bar Plot', icon: BarChart3 },
                      { id: 'line', label: 'Line Graph', icon: RefreshCw },
                      { id: 'scatter', label: 'Scatter 2D', icon: ScatterIcon },
                      { id: 'pie', label: 'Pie Chart', icon: Grid3X3 },
                      { id: 'heatmap', label: 'Matrix Map', icon: Info }
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setVizType(item.id as any)}
                        className={cn(
                          "w-full flex items-center gap-2 px-2 py-1.5 rounded text-[10px] font-medium transition-all group",
                          vizType === item.id 
                            ? "bg-primary/5 text-primary" 
                            : "hover:bg-muted/50 text-[#666]"
                        )}
                      >
                        <item.icon className={cn("w-3 h-3", vizType === item.id ? "text-primary" : "text-[#999]")} />
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-[#f8f8f8]">
                <Button 
                  variant="outline" 
                  className="w-full text-[10px] h-7 border-[#eee] font-medium hover:bg-muted transition-all rounded"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <PaletteIcon className="w-3 h-3 mr-2" />
                  Extract from image
                </Button>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/*" 
                  onChange={extractColorsFromImage} 
                />
              </div>

              <div className="space-y-2 pt-4 border-t border-[#f8f8f8]">
                <div className="space-y-1">
                  <select 
                    className="w-full h-7 px-2 rounded border border-[#eee] bg-white text-[10px] font-medium focus:outline-none focus:ring-1 focus:ring-primary"
                    value={exportFormat}
                    onChange={(e) => setExportFormat(e.target.value)}
                  >
                    <option value="python">Python</option>
                    <option value="r">R</option>
                    <option value="matlab">Matlab</option>
                    <option value="css">CSS</option>
                  </select>
                  <Button 
                    className="w-full bg-[#1a1a1a] hover:bg-black text-white text-[10px] font-medium h-7 rounded"
                    onClick={() => copyToClipboard(exportCode[exportFormat as keyof typeof exportCode], 'Copied')}
                  >
                    <Copy className="w-2.5 h-2.5 mr-2" />
                    Copy Code
                  </Button>
                </div>
              </div>
            </div>
          </ScrollArea>

          <footer className="p-6 border-t border-[#e8e8e8] bg-[#fcfcfc]">
            <p className="text-[10px] text-[#888888] leading-relaxed font-medium uppercase tracking-tighter">
              Ref_Standards / Nature / Science / PNAS
            </p>
          </footer>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-[#fcfcfc] scrollbar-hide">
          <div className="max-w-[1100px] mx-auto p-8 space-y-8">
            
            {/* Presets Grid */}
            <section className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#f0f0f0]">
                <Tabs defaultValue="Journal" className="h-8" value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="bg-transparent p-0 h-8 gap-5">
                    <TabsTrigger value="Journal" className="text-[11px] h-8 px-0 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent rounded-none font-bold tracking-tight transition-all">Journals</TabsTrigger>
                    <TabsTrigger value="Sequential" className="text-[11px] h-8 px-0 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent rounded-none font-bold tracking-tight transition-all">Sequential</TabsTrigger>
                    <TabsTrigger value="User" className="text-[11px] h-8 px-0 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent rounded-none font-bold tracking-tight transition-all">Templates</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {activeTab === 'User' ? (
                  userTemplate ? (
                    <button
                      onClick={() => handlePaletteSelect(userTemplate)}
                      className={cn(
                        "group text-left p-4 rounded-xl border bg-white transition-all hover:shadow-xl hover:shadow-black/5 flex flex-col gap-3 relative overflow-hidden",
                        selectedPalette.id === userTemplate.id ? "border-primary ring-1 ring-primary/20" : "border-[#e8e8e8]"
                      )}
                    >
                      <div className="flex h-6 w-full rounded-md overflow-hidden ring-1 ring-black/10">
                        {userTemplate.colors.map((c, i) => (
                          <div key={i} className="flex-1" style={{ backgroundColor: c }} />
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[12px] font-extrabold text-[#1a1a1a] tracking-tight">{userTemplate.name}</span>
                        <ChevronRight className="w-4 h-4 text-primary" />
                      </div>
                    </button>
                  ) : (
                    <div className="col-span-4 py-12 flex flex-col items-center justify-center border-2 border-dashed border-[#eee] rounded-2xl bg-white/50 text-muted-foreground">
                      <p className="text-[11px] font-medium">No custom templates yet.</p>
                      <p className="text-[10px]">Use the Workspace below to save your current selection.</p>
                    </div>
                  )
                ) : (
                  PRESET_PALETTES.filter(p => p.category === activeTab || (activeTab === 'Sequential' && (p.category === 'Sequential' || p.category === 'Diverging'))).slice(0, 8).map((palette) => (
                    <button
                      key={palette.id}
                      onClick={() => handlePaletteSelect(palette)}
                      className={cn(
                        "group text-left p-4 rounded-xl border bg-white transition-all hover:shadow-xl hover:shadow-black/5 flex flex-col gap-3 relative overflow-hidden",
                        selectedPalette.id === palette.id ? "border-primary ring-1 ring-primary/20" : "border-[#e8e8e8]"
                      )}
                    >
                      <div className="flex h-6 w-full rounded-md overflow-hidden ring-1 ring-black/10 transition-transform group-hover:scale-[1.02]">
                        {palette.colors.slice(0, 10).map((c, i) => (
                          <div key={i} className="flex-1" style={{ backgroundColor: c }} />
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[12px] font-extrabold text-[#1a1a1a] tracking-tight">{palette.name}</span>
                        <ChevronRight className={cn("w-4 h-4 transition-transform", selectedPalette.id === palette.id ? "text-primary translate-x-0" : "text-[#ccc] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5")} />
                      </div>
                    </button>
                  ))
                )}
              </div>
            </section>

            {/* Main Stage */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Visualizer */}
              <div className="xl:col-span-8 space-y-6">
                <section className="bg-white border border-[#e8e8e8] rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] overflow-hidden">
                  <div className="px-6 py-4 border-b border-[#f0f0f0] bg-white flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <h3 className="text-[11px] font-bold text-[#1a1a1a] uppercase tracking-widest">Workspace / Stage</h3>
                    </div>
                    <div className="flex gap-4 items-center">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-[10px] font-bold text-primary h-7 px-3 hover:bg-primary/5 rounded-lg border border-transparent hover:border-primary/20"
                        onClick={saveAsTemplate}
                      >
                        <Save className="w-3.5 h-3.5 mr-2" />
                        Save to Templates
                      </Button>
                    </div>
                  </div>
                  
                  <div className="p-8 space-y-8">
                    {/* Active Palette Display */}
                    <div className="flex h-20 rounded-xl overflow-hidden ring-1 ring-black/5 group shadow-lg">
                      {customColors.map((color, index) => (
                        <div 
                          key={index} 
                          className="flex-1 group relative cursor-pointer"
                          style={{ backgroundColor: color }}
                          onClick={() => setEditingIndex(index)}
                        >
                          <div className={cn(
                            "absolute inset-0 border-2 border-white/40 mix-blend-overlay transition-opacity",
                            editingIndex === index ? "opacity-100" : "opacity-0"
                          )} />
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/10">
                            <span className="text-[10px] font-mono text-white font-bold drop-shadow-md">{color}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Visualization Area */}
                    <div className="h-[380px] border border-[#f5f5f5] rounded-xl p-8 bg-[#fafafa] relative overflow-hidden shadow-inner">
                      <div className="absolute top-5 right-6 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#34A853] animate-pulse" />
                        <span className="font-mono text-[9px] text-[#ccc] uppercase tracking-widest font-bold">Projection_Live</span>
                      </div>
                      
                      <AnimatePresence mode="wait">
                        <motion.div 
                          key={vizType}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="w-full h-full"
                        >
                          {vizType === 'bar' ? (
                            <ResponsiveContainer width="100%" height="100%">
                              <BarChart data={barData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#aaa' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#aaa' }} />
                                <RechartsTooltip 
                                  contentStyle={{ borderRadius: '8px', border: '1px solid #eee', fontSize: '10px' }}
                                />
                                <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={24}>
                                  {barData.map((_, index) => (
                                    <RechartsCell key={`cell-${index}`} fill={customColors[index % customColors.length]} />
                                  ))}
                                </Bar>
                              </BarChart>
                            </ResponsiveContainer>
                          ) : vizType === 'scatter' ? (
                            <ResponsiveContainer width="100%" height="100%">
                              <ScatterChart margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                                <XAxis type="number" dataKey="x" axisLine={false} tick={{ fontSize: 9, fill: '#aaa' }} />
                                <YAxis type="number" dataKey="y" axisLine={false} tick={{ fontSize: 9, fill: '#aaa' }} />
                                <ZAxis type="number" dataKey="z" range={[50, 200]} />
                                {customColors.map((color, index) => (
                                  <Scatter 
                                    key={index} 
                                    data={scatterData.filter(d => d.group === index)} 
                                    fill={color}
                                    fillOpacity={0.6}
                                  />
                                ))}
                              </ScatterChart>
                            </ResponsiveContainer>
                          ) : vizType === 'pie' ? (
                            <ResponsiveContainer width="100%" height="100%">
                              <PieChart>
                                <Pie
                                  data={pieData}
                                  cx="50%"
                                  cy="50%"
                                  innerRadius={60}
                                  outerRadius={90}
                                  paddingAngle={2}
                                  dataKey="value"
                                >
                                  {pieData.map((_, index) => (
                                    <RechartsCell key={`cell-${index}`} fill={customColors[index % customColors.length]} />
                                  ))}
                                </Pie>
                                <RechartsTooltip />
                              </PieChart>
                            </ResponsiveContainer>
                          ) : vizType === 'heatmap' ? (
                            <div className="w-full h-full flex flex-col items-center justify-center">
                              <div className="grid grid-cols-8 gap-1 w-full max-w-[400px]">
                                {Array.from({ length: 32 }).map((_, i) => (
                                  <div 
                                    key={i} 
                                    className="aspect-square rounded-sm"
                                    style={{ backgroundColor: customColors[i % customColors.length], opacity: 0.3 + Math.random() * 0.7 }}
                                  />
                                ))}
                              </div>
                            </div>
                          ) : (
                            <ResponsiveContainer width="100%" height="100%">
                              <LineChart data={lineData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#aaa' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#aaa' }} />
                                <RechartsTooltip />
                                {customColors.slice(0, 4).map((color, i) => (
                                  <Line 
                                    key={i}
                                    type="monotone" 
                                    dataKey={`v${i}`} 
                                    stroke={color} 
                                    strokeWidth={2} 
                                    dot={false}
                                  />
                                ))}
                              </LineChart>
                            </ResponsiveContainer>
                          )}
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>
                </section>
              </div>

              {/* Right Column: Editor & Code */}
              <div className="xl:col-span-4 space-y-6">
                
                    {/* Palette Editor Card */}
                    <Card className="border-[#e8e8e8] shadow-[0_4px_12px_rgba(0,0,0,0.03)] rounded-2xl overflow-hidden">
                      <header className="px-6 py-4 bg-[#fcfcfc] border-b border-[#e8e8e8]">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Grid3X3 className="w-4 h-4 text-primary" />
                            <h4 className="text-[11px] font-bold uppercase tracking-widest text-[#1a1a1a]">Palette Editor</h4>
                          </div>
                          <Button 
                            variant="default" 
                            size="sm" 
                            className="h-7 text-[10px] font-bold bg-[#1a1a1a] hover:bg-black text-white transition-all rounded-lg shadow-sm active:scale-95" 
                            onClick={addColor}
                          >
                            <Plus className="w-3.5 h-3.5 mr-1" /> Add Slot
                          </Button>
                        </div>
                      </header>
                  <CardContent className="p-0">
                    <ScrollArea className="h-[360px]">
                      <div className="divide-y divide-[#f5f5f5]">
                        {customColors.map((color, index) => (
                          <div 
                            key={index} 
                            className={cn(
                              "flex items-center gap-5 p-5 transition-all group cursor-pointer relative",
                              editingIndex === index ? "bg-primary/5 shadow-[inset_4px_0_0_#2563eb]" : "hover:bg-[#fafafa]"
                            )}
                            onClick={() => setEditingIndex(index)}
                          >
                            <div className="relative shrink-0">
                              <div className="w-12 h-12 rounded-xl shadow-md ring-1 ring-black/10 transition-transform active:scale-95" style={{ backgroundColor: color }} />
                            </div>
                            
                            <div className="flex-1 min-w-0 space-y-1.5">
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] font-bold text-[#bbb] font-mono tracking-tighter">SLOT_{index.toString().padStart(2, '0')}</span>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 text-[#ccc] hover:text-destructive transition-opacity"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    removeColor(index);
                                  }}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                              <Input 
                                value={color} 
                                onChange={(e) => handleColorChange(index, e.target.value)}
                                className="h-7 text-[13px] font-bold font-mono border-none p-0 focus-visible:ring-0 bg-transparent h-auto leading-none text-[#333]"
                              />
                              <div className="flex items-center gap-4 border-t border-[#f0f0f0] pt-1.5 mt-1.5">
                                <div className="text-[9px] text-[#999] font-mono flex gap-2.5 font-medium">
                                  <span>C{getCMYK(color).c}%</span>
                                  <span>M{getCMYK(color).m}%</span>
                                  <span>Y{getCMYK(color).y}%</span>
                                  <span>K{getCMYK(color).k}%</span>
                                </div>
                                {getCMYK(color).k > 85 && (
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <div className="text-amber-500 cursor-help"><Info className="w-3 h-3" /></div>
                                    </TooltipTrigger>
                                    <TooltipContent side="top" className="text-[10px] bg-amber-50 text-amber-900 border-amber-200 shadow-xl">
                                      High black density detected. Print risk.
                                    </TooltipContent>
                                  </Tooltip>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                    
                    {/* Preset Color Pool - Restore Feature */}
                    <div className="p-6 bg-[#fcfcfc] border-t border-[#e8e8e8]">
                      <div className="flex items-center justify-between mb-4">
                        <Label className="text-[10px] font-bold uppercase tracking-widest text-[#888]">Preset Color Pool</Label>
                        <span className="text-[9px] font-mono text-[#ccc] font-medium">{selectedPalette.name.toUpperCase()}</span>
                      </div>
                      <div className="flex flex-wrap gap-2.5">
                        {selectedPalette.colors.map((color, i) => (
                          <div key={`pool-${i}`}>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <button
                                  className="w-7 h-7 rounded-lg border border-black/5 hover:scale-110 shadow-sm transition-all hover:shadow-md active:scale-95"
                                  style={{ backgroundColor: color }}
                                  onClick={() => editingIndex !== null ? handleColorChange(editingIndex, color) : toast.info("Select a slot in the editor first")}
                                />
                              </TooltipTrigger>
                              <TooltipContent className="font-mono text-[11px] bg-white text-black border-black/10 shadow-2xl">{color}</TooltipContent>
                            </Tooltip>
                          </div>
                        ))}
                      </div>
                      <p className="mt-4 text-[9px] text-muted-foreground font-medium italic">
                        * Click a slot above then select a color from this pool to replace it.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Export Card */}
                <Card className="border-[#e8e8e8] shadow-[0_4px_12px_rgba(0,0,0,0.03)] rounded-2xl overflow-hidden text-white">
                  <header className="px-6 py-4 bg-[#111] border-b border-white/5 flex items-center justify-between">
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-white/50">Production Export</h4>
                    <div className="px-2.5 py-1 rounded bg-white/5 text-[8px] font-mono text-white/40 tracking-widest">STABLE</div>
                  </header>
                  <CardContent className="p-0">
                    <Tabs value={exportFormat} onValueChange={setExportFormat} className="w-full">
                      <TabsList className="w-full h-10 bg-[#1a1a1a] rounded-none p-1 border-b border-white/5 gap-1">
                        {['python', 'r', 'matlab', 'css'].map(f => (
                          <TabsTrigger 
                            key={f} 
                            value={f} 
                            className="flex-1 text-[9px] font-bold uppercase tracking-widest text-white/40 data-[state=active]:text-white data-[state=active]:bg-white/10 rounded transition-all"
                          >
                            {f}
                          </TabsTrigger>
                        ))}
                      </TabsList>
                      <div className="relative bg-[#111] p-6">
                        <pre className="text-[10px] font-mono text-white/60 leading-relaxed overflow-x-auto h-[120px] scrollbar-hide">
                          {exportCode[exportFormat as keyof typeof exportCode]}
                        </pre>
                        <Button 
                          size="sm" 
                          className="w-full mt-6 h-9 bg-white/10 hover:bg-white text-white hover:text-black text-[10px] font-bold uppercase tracking-widest transition-all active:scale-95 shadow-xl"
                          onClick={() => copyToClipboard(exportCode[exportFormat as keyof typeof exportCode], 'Script copied to clipboard!')}
                        >
                          <Copy className="w-3.5 h-3.5 mr-2" /> Copy Script
                        </Button>
                      </div>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </TooltipProvider>
  );
}
