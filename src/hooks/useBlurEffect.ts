import { useState, useEffect } from 'react';
import type { UseBlurEffectReturn } from '../types';
import { applyBlurEffect } from '../utils/imageProcessing';

export const useBlurEffect = (
  originalImage: string | null,
  maskImage: string | null
): UseBlurEffectReturn => {
  const [blurAmount, setBlurAmount] = useState(10);
  const [blurredImage, setBlurredImage] = useState<string | null>(null);

  useEffect(() => {
    if (originalImage && maskImage) {
      applyBlurEffect(originalImage, maskImage, blurAmount).then(setBlurredImage);
    }
  }, [originalImage, maskImage, blurAmount]);

  return {
    blurredImage,
    blurAmount,
    setBlurAmount,
  };
};