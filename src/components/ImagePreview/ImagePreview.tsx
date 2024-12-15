import React from 'react';
import { Download } from 'lucide-react';
import { BlurControls } from './BlurControls';
import { useBlurEffect } from '../../hooks/useBlurEffect';
import type { ImagePreviewProps } from '../../types';
import { downloadImage } from '../../utils/download';

export const ImagePreview: React.FC<ImagePreviewProps> = ({ originalImage, maskImage }) => {
  const { blurredImage, blurAmount, setBlurAmount } = useBlurEffect(originalImage, maskImage);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Generated Images</h2>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-700">Original Image</h3>
            <button
              onClick={() => downloadImage(originalImage, 'original.png')}
              className="p-1 hover:bg-gray-100 rounded-full"
              title="Download original image"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
          <img
            src={originalImage}
            alt="Original"
            className="w-full rounded border border-gray-200"
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-700">Mask Image</h3>
            <button
              onClick={() => downloadImage(maskImage, 'mask.png')}
              className="p-1 hover:bg-gray-100 rounded-full"
              title="Download mask image"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
          <img
            src={maskImage}
            alt="Mask"
            className="w-full rounded border border-gray-200"
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-700">Blurred Image</h3>
            <button
              onClick={() => downloadImage(blurredImage, 'blurred.png')}
              className="p-1 hover:bg-gray-100 rounded-full"
              title="Download blurred image"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
          <img
            src={blurredImage}
            alt="Blurred"
            className="w-full rounded border border-gray-200"
          />
          <BlurControls value={blurAmount} onChange={setBlurAmount} />
        </div>
      </div>
    </div>
  );
};