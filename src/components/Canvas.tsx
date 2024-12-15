import React, { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';
import { Minus, Plus, Trash2, Download } from 'lucide-react';

interface CanvasProps {
  originalImage: string | null;
  onMaskGenerated: (maskDataUrl: string) => void;
}

export const Canvas: React.FC<CanvasProps> = ({ originalImage, onMaskGenerated }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [brushSize, setBrushSize] = useState(20);

  useEffect(() => {
    if (canvasRef.current) {
      const fabricCanvas = new fabric.Canvas(canvasRef.current, {
        isDrawingMode: true,
        width: 600,
        height: 400,
      });

      fabricCanvas.freeDrawingBrush.color = 'white';
      fabricCanvas.freeDrawingBrush.width = brushSize;
      setCanvas(fabricCanvas);

      return () => {
        fabricCanvas.dispose();
      };
    }
  }, []);

  useEffect(() => {
    if (canvas && originalImage) {
      fabric.Image.fromURL(originalImage, (img) => {
        canvas.clear();
        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
          scaleX: canvas.width! / img.width!,
          scaleY: canvas.height! / img.height!,
        });
      });
    }
  }, [canvas, originalImage]);

  useEffect(() => {
    if (canvas) {
      canvas.freeDrawingBrush.width = brushSize;
    }
  }, [brushSize, canvas]);

  const handleClear = () => {
    if (canvas && originalImage) {
      fabric.Image.fromURL(originalImage, (img) => {
        canvas.clear();
        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
          scaleX: canvas.width! / img.width!,
          scaleY: canvas.height! / img.height!,
        });
      });
    }
  };

  const handleExport = () => {
    if (canvas) {
      const dataUrl = canvas.toDataURL({
        format: 'png',
        multiplier: 1,
      });
      onMaskGenerated(dataUrl);
    }
  };

  const adjustBrushSize = (delta: number) => {
    setBrushSize((prev) => Math.max(1, Math.min(100, prev + delta)));
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="border border-gray-300 rounded-lg overflow-hidden">
        <canvas ref={canvasRef} />
      </div>
      
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
          onClick={handleClear}
          className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow hover:bg-gray-50"
        >
          <Trash2 className="w-4 h-4" />
          Clear
        </button>

        <button
          onClick={handleExport}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
        >
          <Download className="w-4 h-4" />
          Export Mask
        </button>
      </div>
    </div>
  );
};