import { useState, useEffect } from 'react';
import { fabric } from 'fabric';
import type { UseCanvasProps, UseCanvasReturn } from '../types';

export const useCanvas = ({
  canvasRef,
  originalImage,
  onMaskGenerated,
}: UseCanvasProps): UseCanvasReturn => {
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [brushSize, setBrushSize] = useState(20);

  useEffect(() => {
    if (canvasRef.current) {
      const fabricCanvas = new fabric.Canvas(canvasRef.current, {
        isDrawingMode: true,
        width: 600,
        height: 400,
      });

      fabricCanvas.freeDrawingBrush = new fabric.PencilBrush(fabricCanvas);
      fabricCanvas.freeDrawingBrush.color = 'white';
      fabricCanvas.freeDrawingBrush.width = brushSize;
      fabricCanvas.backgroundColor = 'black';
      fabricCanvas.renderAll();

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
        canvas.backgroundColor = 'black';
        
        // Scale image to fit canvas while maintaining aspect ratio
        const scale = Math.min(
          canvas.width! / img.width!,
          canvas.height! / img.height!
        );
        
        img.scale(scale);
        
        // Center the image
        img.left = (canvas.width! - img.width! * scale) / 2;
        img.top = (canvas.height! - img.height! * scale) / 2;
        
        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
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
        canvas.backgroundColor = 'black';
        
        const scale = Math.min(
          canvas.width! / img.width!,
          canvas.height! / img.height!
        );
        
        img.scale(scale);
        img.left = (canvas.width! - img.width! * scale) / 2;
        img.top = (canvas.height! - img.height! * scale) / 2;
        
        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
      });
    }
  };

  const handleExport = () => {
    if (!canvas) return;

    // Create a new canvas for the mask
    const maskCanvas = document.createElement('canvas');
    const maskCtx = maskCanvas.getContext('2d')!;
    maskCanvas.width = canvas.width!;
    maskCanvas.height = canvas.height!;

    // Fill with black background
    maskCtx.fillStyle = 'black';
    maskCtx.fillRect(0, 0, maskCanvas.width, maskCanvas.height);

    // Set composite operation to draw only the white strokes
    maskCtx.globalCompositeOperation = 'source-over';
    maskCtx.fillStyle = 'white';

    // Draw all paths
    const paths = canvas.getObjects('path');
    paths.forEach(path => {
      const pathCanvas = document.createElement('canvas');
      const pathCtx = pathCanvas.getContext('2d')!;
      pathCanvas.width = canvas.width!;
      pathCanvas.height = canvas.height!;

      // Draw the path
      const fabricPath = new fabric.Path(path.path, {
        stroke: 'white',
        strokeWidth: path.strokeWidth,
        fill: undefined,
      });

      fabricPath.render(pathCtx);
      
      // Copy the path to the mask canvas
      maskCtx.drawImage(pathCanvas, 0, 0);
    });

    onMaskGenerated(maskCanvas.toDataURL('image/png'));
  };

  return {
    canvas,
    brushSize,
    setBrushSize,
    handleClear,
    handleExport,
  };
};