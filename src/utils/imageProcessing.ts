export const applyBlurEffect = async (
  originalImage: string,
  maskImage: string,
  blurAmount: number
): Promise<string> => {
  return new Promise((resolve) => {
    const img = new Image();
    const maskImg = new Image();

    img.onload = () => {
      // Create main canvas
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      canvas.width = img.width;
      canvas.height = img.height;

      // Create blur canvas
      const blurCanvas = document.createElement('canvas');
      const blurCtx = blurCanvas.getContext('2d')!;
      blurCanvas.width = img.width;
      blurCanvas.height = img.height;

      // Draw and blur the image
      blurCtx.filter = `blur(${blurAmount}px)`;
      blurCtx.drawImage(img, 0, 0);

      // Draw original image on main canvas
      ctx.drawImage(img, 0, 0);

      maskImg.onload = () => {
        // Create mask canvas
        const maskCanvas = document.createElement('canvas');
        const maskCtx = maskCanvas.getContext('2d')!;
        maskCanvas.width = img.width;
        maskCanvas.height = img.height;

        // Draw and process mask
        maskCtx.drawImage(maskImg, 0, 0);
        const maskData = maskCtx.getImageData(0, 0, maskCanvas.width, maskCanvas.height);
        const blurredData = blurCtx.getImageData(0, 0, blurCanvas.width, blurCanvas.height);
        const originalData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        // Apply blur effect based on mask
        for (let i = 0; i < maskData.data.length; i += 4) {
          const maskValue = maskData.data[i]; // Use red channel for mask
          if (maskValue > 128) { // Threshold for mask
            originalData.data[i] = blurredData.data[i];
            originalData.data[i + 1] = blurredData.data[i + 1];
            originalData.data[i + 2] = blurredData.data[i + 2];
          }
        }

        ctx.putImageData(originalData, 0, 0);
        resolve(canvas.toDataURL('image/png'));
      };
      maskImg.src = maskImage;
    };
    img.src = originalImage;
  });
};