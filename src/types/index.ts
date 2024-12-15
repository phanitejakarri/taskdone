import { RefObject } from 'react';
import { fabric } from 'fabric';

export interface CanvasProps {
  originalImage: string | null;
  onMaskGenerated: (maskDataUrl: string) => void;
}

export interface CanvasControlsProps {
  brushSize: number;
  setBrushSize: (value: number | ((prev: number) => number)) => void;
  onClear: () => void;
  onExport: () => void;
}

export interface ImagePreviewProps {
  originalImage: string | null;
  maskImage: string | null;
}

export interface BlurControlsProps {
  value: number;
  onChange: (value: number) => void;
}

export interface UseCanvasProps {
  canvasRef: RefObject<HTMLCanvasElement>;
  originalImage: string | null;
  onMaskGenerated: (maskDataUrl: string) => void;
}

export interface UseCanvasReturn {
  canvas: fabric.Canvas | null;
  brushSize: number;
  setBrushSize: (value: number | ((prev: number) => number)) => void;
  handleClear: () => void;
  handleExport: () => void;
}

export interface UseBlurEffectReturn {
  blurredImage: string | null;
  blurAmount: number;
  setBlurAmount: (value: number) => void;
}