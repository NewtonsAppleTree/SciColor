export interface Palette {
  id: string;
  name: string;
  colors: string[];
  category: 'Journal' | 'Sequential' | 'Diverging' | 'Qualitative';
  description?: string;
}

export const PRESET_PALETTES: Palette[] = [
  {
    id: 'google-material',
    name: 'Google Material',
    colors: ['#4285F4', '#F54927', '#FBBC05', '#34A853'],
    category: 'Journal',
    description: 'Google brand core colors (Material Design)'
  },
  {
    id: 'nature',
    name: 'Nature Publishing Group',
    category: 'Journal',
    description: 'Classic NPG palette used in Nature journals.',
    colors: ['#E64B35', '#4DBBD5', '#00A087', '#3C5488', '#F39B7F', '#8491B4', '#91D1C2', '#DC0000', '#7E6148', '#B09C85']
  },
  {
    id: 'science',
    name: 'Science / AAAS',
    category: 'Journal',
    description: 'Standard palette for Science magazine.',
    colors: ['#BC3C29', '#0072B5', '#E18727', '#20854E', '#7876B1', '#6F99AD', '#FFDC91', '#EE4C97']
  },
  {
    id: 'cell',
    name: 'Cell Press',
    category: 'Journal',
    description: 'Vibrant palette often seen in Cell Press journals.',
    colors: ['#34495E', '#E74C3C', '#2ECC71', '#3498DB', '#F1C40F', '#9B59B6', '#1ABC9C', '#E67E22']
  },
  {
    id: 'lancet',
    name: 'The Lancet',
    category: 'Journal',
    description: 'Professional medical journal palette.',
    colors: ['#00468B', '#ED0000', '#42B540', '#0099B4', '#925E9F', '#FDAF91', '#AD002A', '#ADB6B6']
  },
  {
    id: 'jco',
    name: 'JCO',
    category: 'Journal',
    description: 'Journal of Clinical Oncology palette.',
    colors: ['#000000', '#E64B35', '#4DBBD5', '#00A087', '#3C5488', '#F39B7F', '#8491B4', '#91D1C2']
  },
  {
    id: 'jama',
    name: 'JAMA',
    category: 'Journal',
    description: 'Journal of the American Medical Association.',
    colors: ['#374E55', '#DF8F44', '#00A1D5', '#B24745', '#79AF97', '#6A6599', '#80796B']
  },
  {
    id: 'nejm',
    name: 'NEJM',
    category: 'Journal',
    description: 'New England Journal of Medicine.',
    colors: ['#BC3C29', '#0072B5', '#E18727', '#20854E', '#7876B1', '#6F99AD', '#FFDC91', '#EE4C97']
  },
  {
    id: 'bmj',
    name: 'BMJ',
    category: 'Journal',
    description: 'British Medical Journal palette.',
    colors: ['#00468B', '#ED0000', '#42B540', '#0099B4', '#925E9F', '#FDAF91', '#AD002A', '#ADB6B6']
  },
  {
    id: 'nature-reviews',
    name: 'Nature Reviews',
    category: 'Journal',
    description: 'Palette optimized for review articles.',
    colors: ['#E64B35', '#4DBBD5', '#00A087', '#3C5488', '#F39B7F', '#8491B4', '#91D1C2', '#DC0000', '#7E6148', '#B09C85']
  },
  {
    id: 'viridis',
    name: 'Viridis',
    category: 'Sequential',
    description: 'Perceptually uniform color map.',
    colors: ['#440154', '#482878', '#3E4A89', '#31688E', '#26828E', '#1F9E89', '#6DCD59', '#B4DE2C', '#FDE725']
  },
  {
    id: 'magma',
    name: 'Magma',
    category: 'Sequential',
    description: 'Perceptually uniform sequential color map.',
    colors: ['#000004', '#140E36', '#3B0F70', '#641A80', '#8C2981', '#B73779', '#DE4968', '#F57D15', '#FEAF77', '#FCFDBF']
  },
  {
    id: 'spectral',
    name: 'Spectral',
    category: 'Diverging',
    description: 'Diverging color scheme from ColorBrewer.',
    colors: ['#D53E4F', '#F46D43', '#FDAE61', '#FEE08B', '#FFFFBF', '#E6F598', '#ABDDA4', '#66C2A5', '#3288BD']
  },
  {
    id: 'set1',
    name: 'Set1',
    category: 'Qualitative',
    description: 'Qualitative palette for categorical data.',
    colors: ['#E41A1C', '#377EB8', '#4DAF4A', '#984EA3', '#FF7F00', '#FFFF33', '#A65628', '#F781BF', '#999999']
  },
  {
    id: 'custom',
    name: 'My Custom Palette',
    category: 'Qualitative',
    description: 'A placeholder for your custom creations.',
    colors: ['#2563EB', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6']
  }
];
