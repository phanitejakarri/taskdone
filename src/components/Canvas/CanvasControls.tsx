import React from 'react';
import { Minus, Plus, Trash2, Download } from 'lucide-react';
import type { CanvasControlsProps } from '../../types';

export const CanvasControls: React.FC<CanvasControlsProps> = ({
  brushSize,
  setBrushSize,
  onClear,
  onExport,
}) => {
  const adjustBrushSize = (delta: number) => {
    setBrushSize((prev) => Math.max(1, Math.min(100, prev + delta)));
  };

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow">
        <button
          onClick={() => adjustBrushSize(-5)}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <Minus className="w-4 h-4" />
        </button>
        <span className="min-w-[3ch] text-center">{brushSize}</span>
        <button
          onClick={() => adjustBrushSize(5)}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <button
        onClick={onClear}
        className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow hover:bg-gray-50"
      >
        <Trash2 className="w-4 h-4" />
        Clear
      </button>

      <button
        onClick={onExport}
        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
      >
        <Download className="w-4 h-4" />
        Export Mask
      </button>
    </div>
  );
};