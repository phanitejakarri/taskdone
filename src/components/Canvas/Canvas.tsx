import React, { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';
import { CanvasControls } from './CanvasControls';
import { useCanvas } from '../../hooks/useCanvas';
import type { CanvasProps } from '../../types';

export const Canvas: React.FC<CanvasProps> = ({ originalImage, onMaskGenerated }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { canvas, brushSize, setBrushSize, handleClear, handleExport } = useCanvas({
    canvasRef,
    originalImage,
    onMaskGenerated,
  });

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="border border-gray-300 rounded-lg overflow-hidden">
        <canvas ref={canvasRef} />
      </div>
      
      <CanvasControls 
        brushSize={brushSize}
        setBrushSize={setBrushSize}
        onClear={handleClear}
        onExport={handleExport}
      />
    </div>
  );
};