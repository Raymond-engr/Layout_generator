// SizeAdjustButtons.tsx
import React from 'react';

interface SizeAdjustButtonProps {
  color: string;
  iconSize: string;
}

const SizeAdjustButton: React.FC<SizeAdjustButtonProps> = ({ color, iconSize }) => {
  return (
    <div className={`w-12 h-12 ${color} rounded-full flex items-center justify-center`}>
      <div className={`w-${iconSize} h-${iconSize} relative`}></div> {/* Placeholder for icon */}
    </div>
  );
};

const SizeAdjustButtons: React.FC = () => {
  return (
    <div className="flex gap-4">
      <SizeAdjustButton color="bg-[#ffe2b7]" iconSize="6" /> {/* Increase size button */}
      <SizeAdjustButton color="bg-[#fdebd0]" iconSize="6" /> {/* Decrease size button */}
    </div>
  );
};

export default SizeAdjustButtons;
