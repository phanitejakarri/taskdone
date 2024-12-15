import React, { useState } from 'react';
import { ImageUpload } from './components/ImageUpload';
import { Canvas } from './components/Canvas/Canvas';
import { ImagePreview } from './components/ImagePreview/ImagePreview';
import { Brush } from 'lucide-react';

function App() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [maskImage, setMaskImage] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 text-3xl font-bold text-gray-800 mb-2">
            <Brush className="w-8 h-8" />
            Image Inpainting Widget
          </div>
          <p className="text-gray-600">
            Upload an image and draw on it to create a mask
          </p>
        </div>

        {!originalImage ? (
          <ImageUpload onImageUpload={setOriginalImage} />
        ) : (
          <Canvas
            originalImage={originalImage}
            onMaskGenerated={setMaskImage}
          />
        )}

        {maskImage && (
          <ImagePreview
            originalImage={originalImage}
            maskImage={maskImage}
          />
        )}
      </div>
    </div>
  );
}

export default App;