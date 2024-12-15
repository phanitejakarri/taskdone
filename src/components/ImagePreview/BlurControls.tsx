import React from 'react';
import type { BlurControlsProps } from '../../types';

export const BlurControls: React.FC<BlurControlsProps> = ({ value, onChange }) => {
  return (
    <div className="mt-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Blur Amount: {value}px
      </label>
      <input
        type="range"
        min="0"
        max="50"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
      />
    </div>
  );
};