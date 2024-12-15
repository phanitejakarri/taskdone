import React, { useCallback } from 'react';
import { Upload } from 'lucide-react';

interface ImageUploadProps {
  onImageUpload: (file: string) => void;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload }) => {
  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
          onImageUpload(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    },
    [onImageUpload]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          onImageUpload(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    },
    [onImageUpload]
  );

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors"
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
        id="image-upload"
      />
      <label
        htmlFor="image-upload"
        className="cursor-pointer flex flex-col items-center gap-4"
      >
        <Upload className="w-12 h-12 text-gray-400" />
        <div>
          <p className="text-lg font-medium text-gray-700">
            Drop an image here or click to upload
          </p>
          <p className="text-sm text-gray-500">Supports PNG, JPG</p>
        </div>
      </label>
    </div>
  );
};